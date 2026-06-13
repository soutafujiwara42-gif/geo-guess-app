// ====== GeoGuess フロントエンド ======
const TOTAL_ROUNDS = 5;
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// ゲーム状態
const state = {
  region: "area",   // "area" | "pref" | "japan" | "country" | "world"
  area: "kanto",
  pref: "tokyo",
  country: "jp",
  timeLimit: 0,
  round: 0,
  total: 0,
  results: [],      // { dist, points, actual, guess }
  current: null,    // 現在のラウンドのお題 { lat, lon, scale, ... }
  guess: null,      // { lat, lng }
  scale: 2000,
  timerId: null,
  timeLeft: 0,
  photos: [],       // このラウンドの写真URL一覧
  photoIdx: 0,
};

let guessMap = null;
let resultMap = null;
let guessMarker = null;

// ---- DOM ----
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

// ====== 初期化：地方・都道府県・国リストを取得 ======
const REGION_TABS = [
  { id: "area",    label: "地方" },
  { id: "pref",    label: "都道府県" },
  { id: "japan",   label: "日本全国" },
  { id: "country", label: "国別" },
  { id: "world",   label: "世界中" },
];

async function init() {
  buildRegionButtons();
  try {
    const meta = await fetch("/api/meta").then((r) => r.json());
    buildSelect("area-select", meta.areas, "area");
    buildSelect("pref-select", meta.prefectures, "pref");
    buildSelect("country-select", meta.countries, "country");
    if (!meta.hasToken) $("token-warning").style.display = "block";
    updateSubFields();
    startPrefetch(); // 初期エリアの1問目を先読み
  } catch (e) {
    $("token-warning").textContent = "サーバーに接続できませんでした。再読み込みしてください。";
    $("token-warning").style.display = "block";
  }
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
  (items || []).forEach((c) => {
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

function fetchRoundData() {
  const q = new URLSearchParams({ region: state.region });
  const sub = subFor();
  if (sub) q.set("sub", sub);
  return fetch("/api/round?" + q.toString())
    .then((r) => r.json())
    .then((data) => {
      if (data.error) throw new Error(data.error);
      return data;
    });
}

function preloadImages(urls) {
  urls.forEach((u) => { const im = new Image(); im.src = u; });
}

function startPrefetch() {
  const key = roundKey();
  prefetched = {
    key,
    promise: fetchRoundData()
      .then((d) => { preloadImages(d.imageUrls || [d.imageUrl]); return d; })
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
  const d = await fetchRoundData();
  preloadImages(d.imageUrls || [d.imageUrl]);
  return d;
}

// 制限時間ボタン
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

  // パネルがホバーで拡大したとき地図を再描画
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
  if (guessMarker) { guessMarker.remove(); }
  guessMarker = null;
  $("guess-btn").disabled = true;
  $("round-now").textContent = state.round;
  $("total-score").textContent = state.total;
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

    setupPhotos(data.imageUrls || [data.imageUrl]);
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
      submitGuess(true); // 時間切れ
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

  // 時間切れで未選択ならスコア0
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
  state.results.push({ dist, points, actual, guess, regionLabel: state.current.regionLabel });
  showResult(actual, guess, dist, points);
}

// ハバーサイン距離 (km)
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

// 距離→スコア（GeoGuessr風：5000 * e^(-d/scale)）
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

  // 結果マップを構築（毎回作り直す）
  if (resultMap) { resultMap.remove(); resultMap = null; }
  resultMap = new maplibregl.Map({
    container: "result-map",
    style: MAP_STYLE,
    center: [actual.lng, actual.lat],
    zoom: 3,
  });

  resultMap.on("load", () => {
    // 正解マーカー
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

      // 結ぶ線
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

      // 両点が収まるようフィット
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
