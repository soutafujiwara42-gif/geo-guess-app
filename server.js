import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Protobuf from "pbf";
import vt from "@mapbox/vector-tile";
import { resolveRegion, REGIONS, COUNTRIES } from "./regions.js";

const { VectorTile } = vt;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ローカル実行用：.env があれば読み込む（Render では環境変数を直接設定するので不要）
(function loadDotenv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith("#")) continue;
    const key = m[1];
    let val = m[2].replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
})();
const app = express();
const PORT = process.env.PORT || 3000;

// Mapillary のアクセストークン（クライアントトークン MLY|... でOK）
const MAPILLARY_TOKEN = process.env.MAPILLARY_TOKEN || "";

app.use(express.static(path.join(__dirname, "public")));

// 利用可能な地域・国の一覧をフロントに渡す
app.get("/api/meta", (req, res) => {
  const regions = Object.entries(REGIONS).map(([id, r]) => ({ id, label: r.label }));
  const countries = Object.entries(COUNTRIES).map(([id, c]) => ({ id, label: c.label }));
  res.json({ regions, countries, hasToken: Boolean(MAPILLARY_TOKEN) });
});

// 乱数ユーティリティ
const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ===== Mapillary ベクタータイルで画像を検索 =====
// Graph API の bbox 検索は不安定なため、公式ベクタータイル（z14 の image レイヤー）
// から画像IDと座標を取得し、画像URLは ID 指定の Graph API で取る。

const TILE_Z = 14;

// 経度緯度 → タイル座標
function lonLatToTile(lon, lat, z) {
  const n = 2 ** z;
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y };
}

// タイルのキャッシュ（タイル1枚が数MBになるため上限を設ける）
const tileCache = new Map(); // key -> { images: [...], at: timestamp }
const TILE_CACHE_MAX = 40;
const TILE_CACHE_TTL = 30 * 60 * 1000; // 30分

async function fetchTileImages(x, y) {
  const key = `${TILE_Z}/${x}/${y}`;
  const hit = tileCache.get(key);
  if (hit && Date.now() - hit.at < TILE_CACHE_TTL) return hit.images;

  const url = `https://tiles.mapillary.com/maps/vtp/mly1_public/2/${TILE_Z}/${x}/${y}?access_token=${encodeURIComponent(MAPILLARY_TOKEN)}`;
  const resp = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!resp.ok) throw new Error(`Mapillary tiles ${resp.status}`);
  const buf = Buffer.from(await resp.arrayBuffer());

  const tile = new VectorTile(new Protobuf(buf));
  const layer = tile.layers.image;
  const images = [];
  if (layer) {
    for (let i = 0; i < layer.length; i++) {
      const f = layer.feature(i);
      const geo = f.toGeoJSON(x, y, TILE_Z);
      if (geo.geometry?.type === "Point" && f.properties?.id) {
        images.push({
          id: String(f.properties.id),
          lon: geo.geometry.coordinates[0],
          lat: geo.geometry.coordinates[1],
          isPano: Boolean(f.properties.is_pano),
        });
      }
    }
  }

  if (tileCache.size >= TILE_CACHE_MAX) {
    // 一番古いエントリを削除
    const oldest = [...tileCache.entries()].sort((a, b) => a[1].at - b[1].at)[0];
    if (oldest) tileCache.delete(oldest[0]);
  }
  tileCache.set(key, { images, at: Date.now() });
  return images;
}

// 画像IDから画像URLを取得（こちらの Graph API は安定して動作する）
async function fetchImageUrl(imageId) {
  const url = `https://graph.mapillary.com/${imageId}?access_token=${encodeURIComponent(MAPILLARY_TOKEN)}&fields=id,thumb_1024_url,captured_at,is_pano`;
  const resp = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!resp.ok) throw new Error(`Mapillary graph ${resp.status}`);
  return resp.json();
}

// 2点間の距離(km)
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 1ラウンド分のランダムな街並み画像を返す
app.get("/api/round", async (req, res) => {
  if (!MAPILLARY_TOKEN) {
    return res.status(500).json({
      error: "MAPILLARY_TOKEN が設定されていません。Render の環境変数に追加してください。",
    });
  }

  const region = String(req.query.region || "world");
  const country = req.query.country ? String(req.query.country) : null;
  const cfg = resolveRegion(region, country);

  const maxTries = 6;
  let lastError = null;
  for (let i = 0; i < maxTries; i++) {
    try {
      const seed = pick(cfg.seeds);
      // シード周辺をランダムに散らした地点のタイルを引く
      const cLat = seed.lat + rand(-seed.spread, seed.spread);
      const cLon = seed.lon + rand(-seed.spread, seed.spread);
      const { x, y } = lonLatToTile(cLon, cLat, TILE_Z);

      const images = await fetchTileImages(x, y);
      if (images.length === 0) continue;

      // メイン1枚＋同じ場所(250m以内)の別写真を最大4枚追加
      const candidate = pick(images);
      const nearby = images
        .filter(
          (im) =>
            im.id !== candidate.id &&
            distanceKm(candidate.lat, candidate.lon, im.lat, im.lon) < 0.25
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      const ids = [candidate.id, ...nearby.map((n) => n.id)];
      const details = await Promise.all(
        ids.map((id) => fetchImageUrl(id).catch(() => null))
      );
      const imageUrls = details
        .filter((d) => d && d.thumb_1024_url)
        .map((d) => d.thumb_1024_url);
      if (imageUrls.length === 0) continue;

      return res.json({
        imageId: candidate.id,
        imageUrl: imageUrls[0],
        imageUrls,
        // 正解座標（クライアントでスコア計算に使用）
        lat: candidate.lat,
        lon: candidate.lon,
        scale: cfg.scale,
        regionLabel: cfg.label,
        mapView: cfg.mapView || { center: [0, 20], zoom: 1 },
      });
    } catch (err) {
      lastError = err;
    }
  }
  return res.status(502).json({
    error: `画像が見つかりませんでした。もう一度お試しください。${lastError ? `(${lastError.message})` : ""}`,
  });
});

app.get("/healthz", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`🌍 GeoGuess server running on http://localhost:${PORT}`);
  if (!MAPILLARY_TOKEN) {
    console.warn("⚠️  MAPILLARY_TOKEN が未設定です。/api/round は失敗します。");
  }
});
