import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { resolveRegion, REGIONS, COUNTRIES } from "./regions.js";

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

// Mapillary Graph API で bbox 内の画像を取得
async function fetchImagesInBbox(west, south, east, north, limit = 40) {
  const url = new URL("https://graph.mapillary.com/images");
  url.searchParams.set("access_token", MAPILLARY_TOKEN);
  url.searchParams.set("fields", "id,computed_geometry,thumb_1024_url,captured_at,is_pano");
  url.searchParams.set("bbox", `${west},${south},${east},${north}`);
  url.searchParams.set("limit", String(limit));

  const resp = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Mapillary ${resp.status}: ${text.slice(0, 200)}`);
  }
  const data = await resp.json();
  return Array.isArray(data.data) ? data.data : [];
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

  const maxTries = 10;
  for (let i = 0; i < maxTries; i++) {
    try {
      const seed = pick(cfg.seeds);
      // シード周辺をランダムに散らして中心を決める
      const cLat = seed.lat + rand(-seed.spread, seed.spread);
      const cLon = seed.lon + rand(-seed.spread, seed.spread);
      // 試行回数が増えるほど検索範囲を広げる
      const half = 0.02 + i * 0.006;
      const images = await fetchImagesInBbox(
        cLon - half, cLat - half, cLon + half, cLat + half, 50
      );
      const usable = images.filter(
        (im) => im.thumb_1024_url && im.computed_geometry?.coordinates
      );
      if (usable.length === 0) continue;

      const img = pick(usable);
      const [lon, lat] = img.computed_geometry.coordinates;
      return res.json({
        imageId: img.id,
        imageUrl: img.thumb_1024_url,
        isPano: Boolean(img.is_pano),
        capturedAt: img.captured_at || null,
        // 正解座標（クライアントでスコア計算に使用）
        lat,
        lon,
        scale: cfg.scale,
        regionLabel: cfg.label,
      });
    } catch (err) {
      // 最後の試行で失敗したらエラーを返す
      if (i === maxTries - 1) {
        return res.status(502).json({ error: `画像取得に失敗しました: ${err.message}` });
      }
    }
  }
  return res.status(404).json({
    error: "画像が見つかりませんでした。もう一度お試しください。",
  });
});

app.get("/healthz", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`🌍 GeoGuess server running on http://localhost:${PORT}`);
  if (!MAPILLARY_TOKEN) {
    console.warn("⚠️  MAPILLARY_TOKEN が未設定です。/api/round は失敗します。");
  }
});
