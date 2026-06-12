// ====== GeoGuess フロントエンド ======
const TOTAL_ROUNDS = 5;
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// ゲーム状態
const state = {
  region: "world",
  country: null,
  timeLimit: 0,
  round: 0,
  total: 0,
  results: [],      // { dist, points, actual, guess }
  current: null,    // 現在のラウンドのお題 { lat, lon, scale, ... }
  guess: null,      // { lat, lng }
  scale: 2000,
  timerId: null,
  timeLeft: 0,
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

// ====== 初期化：エリア・国リストを取得 ======
async function init() {
  try {
    const meta = await fetch("/api/meta").then((r) => r.json());
    buildRegionButtons(meta.regions);
    buildCountrySelect(meta.countries);
    if (!meta.hasToken) $("token-warning").style.display = "block";
  } catch (e) {
    // フォールバック（API失敗時）
    buildRegionButtons([
      { id: "kanto", label: "関東" },
      { id: "japan", label: "日本" },
      { id: "country", label: "国別" },
      { id: "world", label: "世界中" },
    ]);
  }
}

function buildRegionButtons(regions) {
  const container = $("region-buttons");
  container.innerHTML = "";
  // 関東/日本/国別/世界 の順に整える
  const list = [...regions];
  if (!list.find((r) => r.id === "country")) {
    list.splice(list.length - 1, 0, { id: "country", label: "国別" });
  }
  list.forEach((r, i) => {
    const b = document.createElement("button");
    b.className = "opt-btn" + (i === 0 ? " active" : "");
    b.textContent = r.label;
    b.dataset.region = r.id;
    b.onclick = () => {
      container.querySelectorAll(".opt-btn").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      state.region = r.id;
      $("country-field").style.display = r.id === "country" ? "block" : "none";
    };
    container.appendChild(b);
  });
  state.region = list[0]?.id || "world";
}

function buildCountrySelect(countries) {
  const sel = $("country-select");
  sel.innerHTML = "";
  countries.forEach((c) => {
    const o = document.createElement("option");
    o.value = c.id;
    o.textContent = c.label;
    sel.appendChild(o);
  });
  state.country = countries[0]?.id || null;
  sel.onchange = () => (state.country = sel.value);
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

  // 推測マップを初期表示に戻す
  if (guessMap) guessMap.jumpTo({ center: [0, 20], zoom: 1 });

  try {
    const q = new URLSearchParams({ region: state.region });
    if (state.region === "country" && state.country) q.set("country", state.country);
    const data = await fetch("/api/round?" + q.toString()).then((r) => r.json());
    if (data.error) throw new Error(data.error);

    state.current = data;
    state.scale = data.scale;

    const img = $("pano-img");
    img.onload = () => {
      $("loading").style.display = "none";
      img.style.visibility = "visible";
    };
    img.onerror = () => { $("loading").textContent = "画像の読み込みに失敗。次へ進めます。"; };
    img.src = data.imageUrl;

    startTimer();
  } catch (e) {
    $("loading").textContent = "エラー: " + e.message;
  }
}

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

init();
