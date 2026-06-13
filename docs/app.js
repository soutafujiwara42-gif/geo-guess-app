// ====== GeoGuess（静的版：サーバー不要、すべてブラウザで完結） ======
import Pbf from "https://esm.sh/pbf@3.2.1";
import { VectorTile } from "https://esm.sh/@mapbox/vector-tile@1.3.1";
import { REGIONS, COUNTRIES, JP_AREAS, PREFECTURES, resolveRegion } from "./regions.js";

// Mapillary Client Token（クライアント埋め込み前提のトークン）
const MAPILLARY_TOKEN = "MLY|36126941630253864|1df0cb9428ee2709434da1933908fb89";

const TOTAL_ROUNDS = 5;
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// ===== Mapillary ベクタータイルから出題画像を探す =====
const TILE_Z = 14;
const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function lonLatToTile(lon, lat, z) {
  const n = 2 ** z;
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y };
}

const tileCache = new Map(); // "z/x/y" -> images[]

async function fetchTileImages(x, y) {
  const key = `${TILE_Z}/${x}/${y}`;
  if (tileCache.has(key)) return tileCache.get(key);

  const url = `https://tiles.mapillary.com/maps/vtp/mly1_public/2/${TILE_Z}/${x}/${y}?access_token=${encodeURIComponent(MAPILLARY_TOKEN)}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Mapillary tiles ${resp.status}`);
  const buf = await resp.arrayBuffer();

  const tile = new VectorTile(new Pbf(buf));
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
        });
      }
    }
  }
  if (tileCache.size > 30) tileCache.delete(tileCache.keys().next().value);
  tileCache.set(key, images);
  return images;
}

async function fetchImageUrl(imageId) {
  const url = `https://graph.mapillary.com/${imageId}?access_token=${encodeURIComponent(MAPILLARY_TOKEN)}&fields=id,thumb_1024_url,captured_at,is_pano`;
  const resp = await fetch(url);
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

// 出題範囲・分かりやすさの調整パラメータ
const SPREAD_SCALE = 4;      // シード周辺を広く散らして出題エリアの偏りを減らす
const MIN_TILE_IMAGES = 12;  // 画像が密なタイル＝市街地で分かりやすい。少ないタイル(郊外)は避ける

// タイル内から「近くに別写真がある地点」を優先して候補を選ぶ
// → 複数写真で手がかりが増え、撮影が多い＝見覚えのある場所になりやすい
function pickCandidateWithNearby(images) {
  let candidate = pick(images);
  let nearby = [];
  for (let t = 0; t < 6; t++) {
    const c = pick(images);
    const nb = images.filter(
      (im) => im.id !== c.id && distanceKm(c.lat, c.lon, im.lat, im.lon) < 0.25
    );
    if (nb.length > nearby.length) { candidate = c; nearby = nb; }
    if (nearby.length >= 4) break;
  }
  return { candidate, nearby: nearby.sort(() => Math.random() - 0.5).slice(0, 4) };
}

// タイルの画像群から1ラウンド分のお題（メイン＋近接写真）を組み立てる
async function buildRound(images, cfg) {
  const { candidate, nearby } = pickCandidateWithNearby(images);
  const ids = [candidate.id, ...nearby.map((n) => n.id)];
  const details = await Promise.all(
    ids.map((id) => fetchImageUrl(id).catch(() => null))
  );
  const imageUrls = details
    .filter((d) => d && d.thumb_1024_url)
    .map((d) => d.thumb_1024_url);
  if (imageUrls.length === 0) return null;
  return {
    imageId: candidate.id,
    imageUrls,
    lat: candidate.lat,
    lon: candidate.lon,
    scale: cfg.scale,
    regionLabel: cfg.label,
    mapView: cfg.mapView || { center: [0, 20], zoom: 1 },
  };
}

// 1ラウンド分のお題を取得（旧 /api/round 相当）
async function getRound(region, country) {
  const cfg = resolveRegion(region, country);
  const maxTries = 10;
  let lastError = null;
  let best = null; // 最も画像が多かったタイル（密なタイルが見つからない時のフォールバック）
  for (let i = 0; i < maxTries; i++) {
    try {
      const seed = pick(cfg.seeds);
      // シード周辺を広めに散らす（出題エリアを広げて偏りを減らす）
      const spread = seed.spread * SPREAD_SCALE;
      const cLat = seed.lat + rand(-spread, spread);
      const cLon = seed.lon + rand(-spread, spread);
      const { x, y } = lonLatToTile(cLon, cLat, TILE_Z);

      const images = await fetchTileImages(x, y);
      if (images.length === 0) continue;
      if (!best || images.length > best.length) best = images;
      // 画像が少ない（＝郊外で分かりにくい）タイルは避け、密な市街地を探す
      if (images.length < MIN_TILE_IMAGES) continue;

      const round = await buildRound(images, cfg);
      if (round) return round;
    } catch (err) {
      lastError = err;
    }
  }
  // 密なタイルが見つからなくても、拾えた中で最も画像が多いタイルを使う
  if (best) {
    const round = await buildRound(best, cfg);
    if (round) return round;
  }
  throw new Error(
    `画像が見つかりませんでした。もう一度お試しください。${lastError ? `(${lastError.message})` : ""}`
  );
}

// ===== 先読み（次のラウンドを裏で取得して表示を高速化） =====
let prefetched = null; // { key, promise }

// 現在の選択モードに対応するサブコード（地方/都道府県/国）
function subFor() {
  if (state.region === "area") return state.area;
  if (state.region === "pref") return state.pref;
  if (state.region === "country") return state.country;
  return null;
}

function roundKey() {
  return state.region + ":" + (subFor() || "");
}

function preloadImages(urls) {
  urls.forEach((u) => { const im = new Image(); im.src = u; });
}

function startPrefetch() {
  const key = roundKey();
  prefetched = {
    key,
    promise: getRound(state.region, subFor())
      .then((d) => { preloadImages(d.imageUrls); return d; })
      .catch(() => null),
  };
}

async function obtainRound() {
  if (prefetched && prefetched.key === roundKey()) {
    const d = await prefetched.promise;
    prefetched = null;
    if (d) return d;
  }
  prefetched = null;
  const d = await getRound(state.region, subFor());
  preloadImages(d.imageUrls);
  return d;
}

// ===== ゲーム状態・UI（Render版 public/app.js と同等） =====
const state = {
  region: "area",   // "area" | "pref" | "japan" | "country" | "world"
  area: "kanto",
  pref: "tokyo",
  country: "jp",
  timeLimit: 0,
  round: 0,
  total: 0,
  results: [],
  current: null,
  guess: null,
  scale: 2000,
  timerId: null,
  timeLeft: 0,
  photos: [],
  photoIdx: 0,
};

let guessMap = null;
let resultMap = null;
let guessMarker = null;

const $ = (id) => document.getElementById(id);
const screens = {
  start: $("start-screen"),
  game: $("game-screen"),
  result: $("result-screen"),
  final: $("final-screen"),
};
function show(name) {
  Object.entries(screens).forEach(([k, el]) => {
    el.style.display = k === name ? (k === "start" || k === "final" ? "flex" : "block") : "none";
  });
}

// ====== 初期化（静的版：regions.js から直接構築） ======
const REGION_TABS = [
  { id: "area",    label: "地方" },
  { id: "pref",    label: "都道府県" },
  { id: "japan",   label: "日本全国" },
  { id: "country", label: "国別" },
  { id: "world",   label: "世界中" },
];

function init() {
  buildRegionButtons();
  buildSelect("area-select", Object.entries(JP_AREAS).map(([id, a]) => ({ id, label: a.label })), "area");
  buildSelect("pref-select", Object.entries(PREFECTURES).map(([id, p]) => ({ id, label: p.label })), "pref");
  buildSelect("country-select", Object.entries(COUNTRIES).map(([id, c]) => ({ id, label: c.label })), "country");
  updateSubFields();
  startPrefetch(); // 初期エリアの1問目を先読み
}

function updateSubFields() {
  $("area-field").style.display = state.region === "area" ? "block" : "none";
  $("pref-field").style.display = state.region === "pref" ? "block" : "none";
  $("country-field").style.display = state.region === "country" ? "block" : "none";
}

function buildRegionButtons() {
  const container = $("region-buttons");
  container.innerHTML = "";
  REGION_TABS.forEach((r) => {
    const b = document.createElement("button");
    b.className = "opt-btn" + (r.id === state.region ? " active" : "");
    b.textContent = r.label;
    b.dataset.region = r.id;
    b.onclick = () => {
      container.querySelectorAll(".opt-btn").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      state.region = r.id;
      updateSubFields();
      startPrefetch(); // エリア選択した時点で1問目を先読み
    };
    container.appendChild(b);
  });
}

// 地方・都道府県・国の選択リストを共通の作りで構築
function buildSelect(selectId, items, stateKey) {
  const sel = $(selectId);
  sel.innerHTML = "";
  items.forEach((c) => {
    const o = document.createElement("option");
    o.value = c.id;
    o.textContent = c.label;
    sel.appendChild(o);
  });
  sel.value = state[stateKey];
  sel.onchange = () => {
    state[stateKey] = sel.value;
    startPrefetch();
  };
}

$("time-buttons").querySelectorAll(".opt-btn").forEach((b) => {
  b.onclick = () => {
    $("time-buttons").querySelectorAll(".opt-btn").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    state.timeLimit = Number(b.dataset.time);
  };
});

// ====== ゲーム開始 ======
$("start-btn").onclick = () => {
  state.round = 0;
  state.total = 0;
  state.results = [];
  show("game");
  ensureGuessMap();
  nextRound();
};

function ensureGuessMap() {
  if (guessMap) return;
  guessMap = new maplibregl.Map({
    container: "guess-map",
    style: MAP_STYLE,
    center: [0, 20],
    zoom: 1,
    attributionControl: true,
  });
  guessMap.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
  guessMap.on("click", (e) => placeGuess(e.lngLat));

  const ro = new ResizeObserver(() => guessMap.resize());
  ro.observe(document.getElementById("guess-map"));
}

function placeGuess(lngLat) {
  state.guess = { lat: lngLat.lat, lng: lngLat.lng };
  if (!guessMarker) {
    const el = document.createElement("div");
    el.className = "guess-marker";
    el.textContent = "📍";
    guessMarker = new maplibregl.Marker({ element: el, anchor: "bottom" });
  }
  guessMarker.setLngLat(lngLat).addTo(guessMap);
  $("guess-btn").disabled = false;
}

// ====== 次のラウンド ======
async function nextRound() {
  state.round++;
  state.guess = null;
  if (guessMarker) guessMarker.remove();
  guessMarker = null;
  $("guess-btn").disabled = true;
  $("round-now").textContent = state.round;
  $("total-score").textContent = state.total;
  $("loading").textContent = "画像を読み込み中…";
  $("loading").style.display = "block";
  $("pano-img").style.visibility = "hidden";

  try {
    const data = await obtainRound();
    // 次のラウンドを今のうちに先読みしておく
    if (state.round < TOTAL_ROUNDS) startPrefetch();
    state.current = data;
    state.scale = data.scale;

    // 推測マップを選択エリアの初期表示にする（関東なら関東全体など）
    if (guessMap && data.mapView) {
      guessMap.jumpTo({ center: data.mapView.center, zoom: data.mapView.zoom });
    }

    setupPhotos(data.imageUrls);
    startTimer();
  } catch (e) {
    $("loading").textContent = "エラー: " + e.message;
  }
}

// ====== 写真の切り替え ======
function setupPhotos(urls) {
  state.photos = urls;
  state.photoIdx = 0;
  const multi = urls.length > 1;
  $("photo-prev").style.display = multi ? "block" : "none";
  $("photo-next").style.display = multi ? "block" : "none";
  $("photo-count").style.display = multi ? "block" : "none";
  showPhoto(0);
}

function showPhoto(idx) {
  const n = state.photos.length;
  state.photoIdx = ((idx % n) + n) % n;
  const img = $("pano-img");
  $("loading").textContent = "画像を読み込み中…";
  $("loading").style.display = "block";
  img.onload = () => {
    $("loading").style.display = "none";
    img.style.visibility = "visible";
  };
  img.onerror = () => { $("loading").textContent = "画像の読み込みに失敗しました。"; };
  img.src = state.photos[state.photoIdx];
  $("photo-count").textContent = `${state.photoIdx + 1}/${n}`;
}

$("photo-prev").onclick = () => showPhoto(state.photoIdx - 1);
$("photo-next").onclick = () => showPhoto(state.photoIdx + 1);

// ====== タイマー ======
function startTimer() {
  stopTimer();
  if (state.timeLimit <= 0) {
    $("timer-box").style.display = "none";
    return;
  }
  state.timeLeft = state.timeLimit;
  $("timer-box").style.display = "block";
  $("timer").textContent = state.timeLeft;
  state.timerId = setInterval(() => {
    state.timeLeft--;
    $("timer").textContent = state.timeLeft;
    if (state.timeLeft <= 0) {
      stopTimer();
      submitGuess(true);
    }
  }, 1000);
}
function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

// ====== 推測を確定 ======
$("guess-btn").onclick = () => submitGuess(false);

function submitGuess(timedOut) {
  stopTimer();
  const actual = { lat: state.current.lat, lng: state.current.lon };
  let guess = state.guess;

  let dist, points;
  if (!guess) {
    guess = null;
    dist = null;
    points = 0;
  } else {
    dist = haversine(actual.lat, actual.lng, guess.lat, guess.lng);
    points = scoreFromDistance(dist, state.scale);
  }

  state.total += points;
  state.results.push({ dist, points, actual, guess });
  showResult(actual, guess, dist, points);
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function scoreFromDistance(distKm, scale) {
  const s = Math.round(5000 * Math.exp(-distKm / scale));
  return Math.max(0, Math.min(5000, s));
}

// ====== 結果表示 ======
function showResult(actual, guess, dist, points) {
  show("result");
  $("result-points").textContent = points;
  $("result-dist").textContent =
    dist == null ? "未選択（時間切れ）" : dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`;

  if (resultMap) { resultMap.remove(); resultMap = null; }
  resultMap = new maplibregl.Map({
    container: "result-map",
    style: MAP_STYLE,
    center: [actual.lng, actual.lat],
    zoom: 3,
  });

  resultMap.on("load", () => {
    const aEl = document.createElement("div");
    aEl.className = "actual-marker";
    aEl.textContent = "🎯";
    new maplibregl.Marker({ element: aEl, anchor: "bottom" })
      .setLngLat([actual.lng, actual.lat])
      .setPopup(new maplibregl.Popup().setText("正解地点"))
      .addTo(resultMap);

    if (guess) {
      const gEl = document.createElement("div");
      gEl.className = "guess-marker";
      gEl.textContent = "📍";
      new maplibregl.Marker({ element: gEl, anchor: "bottom" })
        .setLngLat([guess.lng, guess.lat])
        .addTo(resultMap);

      resultMap.addSource("line", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: [[guess.lng, guess.lat], [actual.lng, actual.lat]] },
        },
      });
      resultMap.addLayer({
        id: "line",
        type: "line",
        source: "line",
        paint: { "line-color": "#22c55e", "line-width": 3, "line-dasharray": [2, 2] },
      });

      const b = new maplibregl.LngLatBounds(
        [Math.min(guess.lng, actual.lng), Math.min(guess.lat, actual.lat)],
        [Math.max(guess.lng, actual.lng), Math.max(guess.lat, actual.lat)]
      );
      resultMap.fitBounds(b, { padding: 80, maxZoom: 14, duration: 0 });
    } else {
      resultMap.jumpTo({ center: [actual.lng, actual.lat], zoom: 8 });
    }
  });
}

// ====== 次へ / 最終結果 ======
$("next-btn").onclick = () => {
  if (state.round >= TOTAL_ROUNDS) {
    showFinal();
  } else {
    show("game");
    nextRound();
  }
};

function showFinal() {
  show("final");
  $("final-total").textContent = state.total;
  const bd = $("final-breakdown");
  bd.innerHTML = "";
  state.results.forEach((r, i) => {
    const distStr = r.dist == null ? "未選択" : r.dist < 1 ? `${Math.round(r.dist * 1000)}m` : `${r.dist.toFixed(0)}km`;
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<span>R${i + 1}　${distStr}</span><b>${r.points} 点</b>`;
    bd.appendChild(row);
  });
  $("final-rank").textContent = rankComment(state.total);
}

function rankComment(total) {
  const pct = total / (TOTAL_ROUNDS * 5000);
  if (pct >= 0.9) return "🏆 神レベル！地理マスター";
  if (pct >= 0.7) return "🥇 すばらしい！かなりの地理通";
  if (pct >= 0.5) return "🥈 good！その調子";
  if (pct >= 0.3) return "🥉 まずまず。次は世界を広げよう";
  return "🌱 これから上手くなる！";
}

$("replay-btn").onclick = () => {
  if (resultMap) { resultMap.remove(); resultMap = null; }
  show("start");
};

// ====== メインメニューに戻る ======
function goToMenu() {
  stopTimer();
  if (resultMap) { resultMap.remove(); resultMap = null; }
  state.current = null;
  state.guess = null;
  show("start");
  startPrefetch(); // メニューの選択に合わせて1問目を先読みし直す
}
$("menu-btn").onclick = goToMenu;

init();
