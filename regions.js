// 出題エリアの定義
// 各シード地点は Mapillary の画像カバレッジが期待できる都市の中心付近。
// spread: シード周辺でランダムに散らす範囲（度）。scale: スコア計算の距離スケール(km)。

export const REGIONS = {
  kanto: {
    label: "関東",
    scale: 80, // 近距離勝負
    seeds: [
      { name: "東京駅",     lat: 35.6812, lon: 139.7671, spread: 0.06 },
      { name: "新宿",       lat: 35.6896, lon: 139.7006, spread: 0.05 },
      { name: "渋谷",       lat: 35.6580, lon: 139.7016, spread: 0.04 },
      { name: "横浜",       lat: 35.4660, lon: 139.6225, spread: 0.06 },
      { name: "川崎",       lat: 35.5308, lon: 139.7029, spread: 0.04 },
      { name: "さいたま",   lat: 35.8617, lon: 139.6455, spread: 0.06 },
      { name: "千葉",       lat: 35.6073, lon: 140.1063, spread: 0.05 },
      { name: "鎌倉",       lat: 35.3192, lon: 139.5468, spread: 0.03 },
      { name: "立川",       lat: 35.6985, lon: 139.4137, spread: 0.04 },
      { name: "宇都宮",     lat: 36.5551, lon: 139.8828, spread: 0.05 },
      { name: "水戸",       lat: 36.3659, lon: 140.4714, spread: 0.04 },
      { name: "前橋",       lat: 36.3895, lon: 139.0634, spread: 0.04 },
    ],
  },

  japan: {
    label: "日本",
    scale: 500,
    seeds: [
      { name: "札幌",   lat: 43.0618, lon: 141.3545, spread: 0.08 },
      { name: "函館",   lat: 41.7687, lon: 140.7288, spread: 0.04 },
      { name: "仙台",   lat: 38.2682, lon: 140.8694, spread: 0.06 },
      { name: "新潟",   lat: 37.9161, lon: 139.0364, spread: 0.05 },
      { name: "東京",   lat: 35.6812, lon: 139.7671, spread: 0.08 },
      { name: "横浜",   lat: 35.4660, lon: 139.6225, spread: 0.06 },
      { name: "名古屋", lat: 35.1815, lon: 136.9066, spread: 0.07 },
      { name: "金沢",   lat: 36.5613, lon: 136.6562, spread: 0.04 },
      { name: "京都",   lat: 35.0116, lon: 135.7681, spread: 0.05 },
      { name: "大阪",   lat: 34.6937, lon: 135.5023, spread: 0.07 },
      { name: "神戸",   lat: 34.6901, lon: 135.1955, spread: 0.05 },
      { name: "広島",   lat: 34.3853, lon: 132.4553, spread: 0.06 },
      { name: "高松",   lat: 34.3401, lon: 134.0434, spread: 0.04 },
      { name: "松山",   lat: 33.8416, lon: 132.7657, spread: 0.04 },
      { name: "福岡",   lat: 33.5904, lon: 130.4017, spread: 0.06 },
      { name: "鹿児島", lat: 31.5966, lon: 130.5571, spread: 0.05 },
      { name: "那覇",   lat: 26.2124, lon: 127.6809, spread: 0.05 },
    ],
  },

  world: {
    label: "世界中",
    scale: 2000,
    seeds: [
      // アジア
      { name: "東京",         lat: 35.6812, lon: 139.7671, spread: 0.08 },
      { name: "ソウル",       lat: 37.5665, lon: 126.9780, spread: 0.08 },
      { name: "バンコク",     lat: 13.7563, lon: 100.5018, spread: 0.08 },
      { name: "シンガポール", lat: 1.3521,  lon: 103.8198, spread: 0.06 },
      { name: "ムンバイ",     lat: 19.0760, lon: 72.8777,  spread: 0.06 },
      // ヨーロッパ
      { name: "ロンドン",     lat: 51.5074, lon: -0.1278,  spread: 0.08 },
      { name: "パリ",         lat: 48.8566, lon: 2.3522,   spread: 0.07 },
      { name: "ベルリン",     lat: 52.5200, lon: 13.4050,  spread: 0.08 },
      { name: "アムステルダム", lat: 52.3676, lon: 4.9041, spread: 0.06 },
      { name: "ローマ",       lat: 41.9028, lon: 12.4964,  spread: 0.06 },
      { name: "マドリード",   lat: 40.4168, lon: -3.7038,  spread: 0.07 },
      { name: "ストックホルム", lat: 59.3293, lon: 18.0686, spread: 0.07 },
      // 北米
      { name: "ニューヨーク", lat: 40.7128, lon: -74.0060, spread: 0.08 },
      { name: "サンフランシスコ", lat: 37.7749, lon: -122.4194, spread: 0.06 },
      { name: "ロサンゼルス", lat: 34.0522, lon: -118.2437, spread: 0.10 },
      { name: "トロント",     lat: 43.6532, lon: -79.3832,  spread: 0.08 },
      { name: "メキシコシティ", lat: 19.4326, lon: -99.1332, spread: 0.08 },
      // 南米
      { name: "サンパウロ",   lat: -23.5505, lon: -46.6333, spread: 0.08 },
      { name: "ブエノスアイレス", lat: -34.6037, lon: -58.3816, spread: 0.08 },
      // オセアニア
      { name: "シドニー",     lat: -33.8688, lon: 151.2093, spread: 0.10 },
      { name: "メルボルン",   lat: -37.8136, lon: 144.9631, spread: 0.08 },
      // アフリカ
      { name: "ケープタウン", lat: -33.9249, lon: 18.4241,  spread: 0.07 },
      { name: "ナイロビ",     lat: -1.2921,  lon: 36.8219,  spread: 0.06 },
    ],
  },
};

// 国別モード：国コード -> シード都市
export const COUNTRIES = {
  jp: {
    label: "日本", scale: 500,
    seeds: REGIONS.japan ? null : null, // 下で差し替え
  },
  us: {
    label: "アメリカ", scale: 1500,
    seeds: [
      { name: "New York",     lat: 40.7128, lon: -74.0060, spread: 0.08 },
      { name: "San Francisco", lat: 37.7749, lon: -122.4194, spread: 0.06 },
      { name: "Los Angeles",  lat: 34.0522, lon: -118.2437, spread: 0.10 },
      { name: "Chicago",      lat: 41.8781, lon: -87.6298, spread: 0.08 },
      { name: "Seattle",      lat: 47.6062, lon: -122.3321, spread: 0.06 },
      { name: "Austin",       lat: 30.2672, lon: -97.7431, spread: 0.06 },
      { name: "Miami",        lat: 25.7617, lon: -80.1918, spread: 0.06 },
      { name: "Denver",       lat: 39.7392, lon: -104.9903, spread: 0.06 },
    ],
  },
  gb: {
    label: "イギリス", scale: 300,
    seeds: [
      { name: "London",     lat: 51.5074, lon: -0.1278, spread: 0.08 },
      { name: "Manchester", lat: 53.4808, lon: -2.2426, spread: 0.05 },
      { name: "Birmingham", lat: 52.4862, lon: -1.8904, spread: 0.05 },
      { name: "Edinburgh",  lat: 55.9533, lon: -3.1883, spread: 0.05 },
      { name: "Bristol",    lat: 51.4545, lon: -2.5879, spread: 0.04 },
      { name: "Liverpool",  lat: 53.4084, lon: -2.9916, spread: 0.04 },
    ],
  },
  fr: {
    label: "フランス", scale: 400,
    seeds: [
      { name: "Paris",     lat: 48.8566, lon: 2.3522,  spread: 0.07 },
      { name: "Lyon",      lat: 45.7640, lon: 4.8357,  spread: 0.05 },
      { name: "Marseille", lat: 43.2965, lon: 5.3698,  spread: 0.05 },
      { name: "Bordeaux",  lat: 44.8378, lon: -0.5792, spread: 0.04 },
      { name: "Nice",      lat: 43.7102, lon: 7.2620,  spread: 0.04 },
      { name: "Toulouse",  lat: 43.6047, lon: 1.4442,  spread: 0.05 },
    ],
  },
  de: {
    label: "ドイツ", scale: 400,
    seeds: [
      { name: "Berlin",    lat: 52.5200, lon: 13.4050, spread: 0.08 },
      { name: "Munich",    lat: 48.1351, lon: 11.5820, spread: 0.06 },
      { name: "Hamburg",   lat: 53.5511, lon: 9.9937,  spread: 0.06 },
      { name: "Cologne",   lat: 50.9375, lon: 6.9603,  spread: 0.05 },
      { name: "Frankfurt", lat: 50.1109, lon: 8.6821,  spread: 0.05 },
    ],
  },
  it: {
    label: "イタリア", scale: 400,
    seeds: [
      { name: "Rome",     lat: 41.9028, lon: 12.4964, spread: 0.06 },
      { name: "Milan",    lat: 45.4642, lon: 9.1900,  spread: 0.05 },
      { name: "Florence", lat: 43.7696, lon: 11.2558, spread: 0.04 },
      { name: "Naples",   lat: 40.8518, lon: 14.2681, spread: 0.05 },
      { name: "Venice",   lat: 45.4408, lon: 12.3155, spread: 0.03 },
    ],
  },
  es: {
    label: "スペイン", scale: 400,
    seeds: [
      { name: "Madrid",    lat: 40.4168, lon: -3.7038, spread: 0.06 },
      { name: "Barcelona", lat: 41.3851, lon: 2.1734,  spread: 0.05 },
      { name: "Valencia",  lat: 39.4699, lon: -0.3763, spread: 0.05 },
      { name: "Seville",   lat: 37.3891, lon: -5.9845, spread: 0.05 },
    ],
  },
  au: {
    label: "オーストラリア", scale: 1500,
    seeds: [
      { name: "Sydney",    lat: -33.8688, lon: 151.2093, spread: 0.10 },
      { name: "Melbourne", lat: -37.8136, lon: 144.9631, spread: 0.08 },
      { name: "Brisbane",  lat: -27.4698, lon: 153.0251, spread: 0.06 },
      { name: "Perth",     lat: -31.9505, lon: 115.8605, spread: 0.06 },
    ],
  },
};

// 日本の国別シードは japan モードを流用
COUNTRIES.jp.seeds = REGIONS.japan.seeds;

// region 指定からシード配列・スケールを取得
export function resolveRegion(region, country) {
  if (region === "country" && country && COUNTRIES[country]) {
    return COUNTRIES[country];
  }
  if (REGIONS[region]) return REGIONS[region];
  return REGIONS.world;
}
