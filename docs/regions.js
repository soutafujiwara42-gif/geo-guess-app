// 出題エリアの定義（メジャースポット版）
// 各シードは有名ランドマーク周辺。spread を小さくして「見覚えのある風景」が出やすくしている。
// scale: スコア計算の距離スケール(km)。mapView: 推測マップの初期表示。

export const REGIONS = {
  kanto: {
    label: "関東",
    scale: 80,
    mapView: { center: [139.65, 35.75], zoom: 7.5 },
    seeds: [
      { name: "東京駅・丸の内",       lat: 35.6812, lon: 139.7671, spread: 0.010 },
      { name: "渋谷スクランブル交差点", lat: 35.6595, lon: 139.7005, spread: 0.008 },
      { name: "新宿駅東口",           lat: 35.6909, lon: 139.7004, spread: 0.008 },
      { name: "浅草・雷門",           lat: 35.7114, lon: 139.7966, spread: 0.008 },
      { name: "上野公園",             lat: 35.7148, lon: 139.7745, spread: 0.008 },
      { name: "秋葉原",               lat: 35.6984, lon: 139.7731, spread: 0.006 },
      { name: "銀座",                 lat: 35.6717, lon: 139.7650, spread: 0.006 },
      { name: "東京タワー",           lat: 35.6586, lon: 139.7454, spread: 0.008 },
      { name: "お台場",               lat: 35.6300, lon: 139.7754, spread: 0.010 },
      { name: "横浜みなとみらい",     lat: 35.4571, lon: 139.6332, spread: 0.010 },
      { name: "横浜中華街",           lat: 35.4429, lon: 139.6453, spread: 0.006 },
      { name: "鎌倉・鶴岡八幡宮",     lat: 35.3258, lon: 139.5561, spread: 0.008 },
      { name: "江の島",               lat: 35.3032, lon: 139.4803, spread: 0.008 },
      { name: "川越・小江戸",         lat: 35.9251, lon: 139.4859, spread: 0.008 },
      { name: "秩父",                 lat: 35.9919, lon: 139.0848, spread: 0.010 },
      { name: "日光・東照宮周辺",     lat: 36.7581, lon: 139.5994, spread: 0.012 },
    ],
  },

  japan: {
    label: "日本",
    scale: 500,
    mapView: { center: [137.2, 38.0], zoom: 4.3 },
    seeds: [
      { name: "札幌・大通公園",   lat: 43.0595, lon: 141.3470, spread: 0.010 },
      { name: "小樽運河",         lat: 43.1985, lon: 141.0019, spread: 0.008 },
      { name: "仙台駅前",         lat: 38.2601, lon: 140.8821, spread: 0.010 },
      { name: "金沢・近江町市場", lat: 36.5719, lon: 136.6560, spread: 0.010 },
      { name: "東京・浅草",       lat: 35.7114, lon: 139.7966, spread: 0.008 },
      { name: "東京・渋谷",       lat: 35.6595, lon: 139.7005, spread: 0.008 },
      { name: "横浜みなとみらい", lat: 35.4571, lon: 139.6332, spread: 0.010 },
      { name: "名古屋・栄",       lat: 35.1681, lon: 136.9080, spread: 0.010 },
      { name: "京都・祇園",       lat: 35.0037, lon: 135.7780, spread: 0.008 },
      { name: "京都・嵐山",       lat: 35.0094, lon: 135.6722, spread: 0.008 },
      { name: "大阪・道頓堀",     lat: 34.6687, lon: 135.5013, spread: 0.008 },
      { name: "神戸・三宮",       lat: 34.6913, lon: 135.1955, spread: 0.010 },
      { name: "奈良公園",         lat: 34.6851, lon: 135.8430, spread: 0.010 },
      { name: "広島・原爆ドーム", lat: 34.3955, lon: 132.4536, spread: 0.008 },
      { name: "福岡・天神",       lat: 33.5914, lon: 130.3989, spread: 0.010 },
      { name: "長崎・グラバー園", lat: 32.7341, lon: 129.8699, spread: 0.010 },
      { name: "那覇・国際通り",   lat: 26.2146, lon: 127.6869, spread: 0.008 },
    ],
  },

  world: {
    label: "世界中",
    scale: 2000,
    mapView: { center: [10, 25], zoom: 1.3 },
    seeds: [
      // アジア
      { name: "東京・渋谷",           lat: 35.6595, lon: 139.7005, spread: 0.008 },
      { name: "ソウル・明洞",         lat: 37.5636, lon: 126.9838, spread: 0.010 },
      { name: "バンコク・王宮周辺",   lat: 13.7516, lon: 100.4927, spread: 0.012 },
      { name: "シンガポール・マリーナベイ", lat: 1.2838, lon: 103.8591, spread: 0.012 },
      // ヨーロッパ
      { name: "ロンドン・ウェストミンスター", lat: 51.5007, lon: -0.1246, spread: 0.010 },
      { name: "パリ・エッフェル塔",   lat: 48.8584, lon: 2.2945,  spread: 0.010 },
      { name: "パリ・シャンゼリゼ",   lat: 48.8698, lon: 2.3075,  spread: 0.008 },
      { name: "ベルリン・ブランデンブルク門", lat: 52.5163, lon: 13.3777, spread: 0.010 },
      { name: "アムステルダム・ダム広場", lat: 52.3731, lon: 4.8926, spread: 0.008 },
      { name: "ローマ・コロッセオ",   lat: 41.8902, lon: 12.4922, spread: 0.010 },
      { name: "バルセロナ・サグラダファミリア", lat: 41.4036, lon: 2.1744, spread: 0.010 },
      { name: "マドリード・ソル広場", lat: 40.4169, lon: -3.7035, spread: 0.008 },
      { name: "ストックホルム旧市街", lat: 59.3251, lon: 18.0711, spread: 0.008 },
      // 北米
      { name: "ニューヨーク・タイムズスクエア", lat: 40.7580, lon: -73.9855, spread: 0.010 },
      { name: "サンフランシスコ・ユニオンスクエア", lat: 37.7880, lon: -122.4075, spread: 0.010 },
      { name: "ロサンゼルス・ハリウッド", lat: 34.1016, lon: -118.3267, spread: 0.012 },
      { name: "トロント・CNタワー周辺", lat: 43.6426, lon: -79.3871, spread: 0.010 },
      { name: "メキシコシティ・ソカロ", lat: 19.4326, lon: -99.1332, spread: 0.010 },
      // 南米
      { name: "サンパウロ・パウリスタ通り", lat: -23.5614, lon: -46.6559, spread: 0.010 },
      { name: "ブエノスアイレス・オベリスコ", lat: -34.6037, lon: -58.3816, spread: 0.010 },
      // オセアニア
      { name: "シドニー・オペラハウス", lat: -33.8568, lon: 151.2153, spread: 0.012 },
      { name: "メルボルン・フリンダース駅", lat: -37.8183, lon: 144.9671, spread: 0.010 },
      // アフリカ
      { name: "ケープタウン・ウォーターフロント", lat: -33.9036, lon: 18.4196, spread: 0.012 },
    ],
  },
};

// 国別モード：国コード -> シード都市（各国のメジャースポット）
export const COUNTRIES = {
  jp: {
    label: "日本", scale: 500,
    mapView: { center: [137.2, 38.0], zoom: 4.3 },
    seeds: null, // 下で japan を流用
  },
  us: {
    label: "アメリカ", scale: 1500,
    mapView: { center: [-98, 39], zoom: 3.2 },
    seeds: [
      { name: "NY タイムズスクエア",  lat: 40.7580, lon: -73.9855, spread: 0.010 },
      { name: "SF ユニオンスクエア",  lat: 37.7880, lon: -122.4075, spread: 0.010 },
      { name: "LA ハリウッド",        lat: 34.1016, lon: -118.3267, spread: 0.012 },
      { name: "シカゴ・ループ",       lat: 41.8819, lon: -87.6278, spread: 0.010 },
      { name: "シアトル・パイクプレイス", lat: 47.6097, lon: -122.3422, spread: 0.008 },
      { name: "ラスベガス・ストリップ", lat: 36.1147, lon: -115.1728, spread: 0.012 },
      { name: "マイアミビーチ",       lat: 25.7907, lon: -80.1300, spread: 0.010 },
      { name: "ワシントンDC・モール", lat: 38.8895, lon: -77.0353, spread: 0.012 },
    ],
  },
  gb: {
    label: "イギリス", scale: 300,
    mapView: { center: [-2.5, 54.0], zoom: 4.6 },
    seeds: [
      { name: "ロンドン・ウェストミンスター", lat: 51.5007, lon: -0.1246, spread: 0.010 },
      { name: "ロンドン・タワーブリッジ", lat: 51.5055, lon: -0.0754, spread: 0.008 },
      { name: "マンチェスター中心部", lat: 53.4794, lon: -2.2453, spread: 0.008 },
      { name: "エディンバラ旧市街",   lat: 55.9486, lon: -3.1999, spread: 0.008 },
      { name: "リバプール・アルバートドック", lat: 53.4002, lon: -2.9926, spread: 0.008 },
      { name: "オックスフォード",     lat: 51.7548, lon: -1.2544, spread: 0.008 },
    ],
  },
  fr: {
    label: "フランス", scale: 400,
    mapView: { center: [2.5, 46.8], zoom: 4.7 },
    seeds: [
      { name: "パリ・エッフェル塔",   lat: 48.8584, lon: 2.2945, spread: 0.010 },
      { name: "パリ・ノートルダム",   lat: 48.8530, lon: 2.3499, spread: 0.008 },
      { name: "リヨン旧市街",         lat: 45.7621, lon: 4.8273, spread: 0.008 },
      { name: "マルセイユ旧港",       lat: 43.2951, lon: 5.3741, spread: 0.008 },
      { name: "ニース・プロムナード", lat: 43.6952, lon: 7.2656, spread: 0.010 },
      { name: "ボルドー中心部",       lat: 44.8412, lon: -0.5800, spread: 0.008 },
    ],
  },
  de: {
    label: "ドイツ", scale: 400,
    mapView: { center: [10.3, 51.2], zoom: 4.7 },
    seeds: [
      { name: "ベルリン・ブランデンブルク門", lat: 52.5163, lon: 13.3777, spread: 0.010 },
      { name: "ミュンヘン・マリエン広場", lat: 48.1374, lon: 11.5755, spread: 0.008 },
      { name: "ハンブルク港",         lat: 53.5438, lon: 9.9796, spread: 0.010 },
      { name: "ケルン大聖堂周辺",     lat: 50.9413, lon: 6.9583, spread: 0.008 },
      { name: "フランクフルト・レーマー", lat: 50.1106, lon: 8.6820, spread: 0.008 },
    ],
  },
  it: {
    label: "イタリア", scale: 400,
    mapView: { center: [12.5, 42.5], zoom: 4.6 },
    seeds: [
      { name: "ローマ・コロッセオ",   lat: 41.8902, lon: 12.4922, spread: 0.010 },
      { name: "ローマ・トレビの泉",   lat: 41.9009, lon: 12.4833, spread: 0.006 },
      { name: "ミラノ・ドゥオーモ",   lat: 45.4642, lon: 9.1900, spread: 0.008 },
      { name: "フィレンツェ大聖堂",   lat: 43.7731, lon: 11.2560, spread: 0.008 },
      { name: "ベネチア・サンマルコ広場", lat: 45.4341, lon: 12.3388, spread: 0.006 },
      { name: "ナポリ中心部",         lat: 40.8467, lon: 14.2526, spread: 0.010 },
    ],
  },
  es: {
    label: "スペイン", scale: 400,
    mapView: { center: [-3.7, 40.2], zoom: 4.7 },
    seeds: [
      { name: "マドリード・ソル広場", lat: 40.4169, lon: -3.7035, spread: 0.008 },
      { name: "バルセロナ・サグラダファミリア", lat: 41.4036, lon: 2.1744, spread: 0.010 },
      { name: "バルセロナ・ランブラス通り", lat: 41.3809, lon: 2.1735, spread: 0.008 },
      { name: "セビリア大聖堂周辺",   lat: 37.3858, lon: -5.9933, spread: 0.008 },
      { name: "バレンシア旧市街",     lat: 39.4754, lon: -0.3766, spread: 0.008 },
    ],
  },
  au: {
    label: "オーストラリア", scale: 1500,
    mapView: { center: [134, -26], zoom: 3.2 },
    seeds: [
      { name: "シドニー・オペラハウス", lat: -33.8568, lon: 151.2153, spread: 0.012 },
      { name: "シドニー・ハーバーブリッジ", lat: -33.8523, lon: 151.2108, spread: 0.010 },
      { name: "メルボルン・フリンダース駅", lat: -37.8183, lon: 144.9671, spread: 0.010 },
      { name: "ブリスベン・サウスバンク", lat: -27.4748, lon: 153.0235, spread: 0.010 },
      { name: "パース中心部",          lat: -31.9523, lon: 115.8613, spread: 0.010 },
    ],
  },
};

// 日本の国別シードは japan モードを流用
COUNTRIES.jp.seeds = REGIONS.japan.seeds;

// region 指定からシード配列・スケール・初期表示を取得
export function resolveRegion(region, country) {
  if (region === "country" && country && COUNTRIES[country]) {
    return COUNTRIES[country];
  }
  if (REGIONS[region]) return REGIONS[region];
  return REGIONS.world;
}
