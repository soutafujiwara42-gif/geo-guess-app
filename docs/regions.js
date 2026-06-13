// 出題エリアの定義
// 各シードは有名ランドマーク・観光地・市街地周辺。spread を小さくして「見覚えのある風景」が出やすくしている。
// scale: スコア計算の距離スケール(km)。mapView: 推測マップの初期表示。

// ===== 47都道府県（県庁所在地の中心街＋観光名所） =====
export const PREFECTURES = {
  hokkaido: {
    label: "北海道", scale: 150, mapView: { center: [142.5, 43.4], zoom: 5.6 },
    seeds: [
      { name: "札幌・大通公園", lat: 43.0595, lon: 141.3470, spread: 0.010 },
      { name: "札幌駅前",       lat: 43.0686, lon: 141.3508, spread: 0.008 },
      { name: "小樽運河",       lat: 43.1985, lon: 141.0019, spread: 0.008 },
      { name: "函館・ベイエリア", lat: 41.7687, lon: 140.7170, spread: 0.010 },
      { name: "旭川駅前",       lat: 43.7628, lon: 142.3650, spread: 0.010 },
    ],
  },
  aomori: {
    label: "青森県", scale: 60, mapView: { center: [140.7, 40.8], zoom: 7.2 },
    seeds: [
      { name: "青森駅前",   lat: 40.8246, lon: 140.7406, spread: 0.010 },
      { name: "弘前",       lat: 40.6031, lon: 140.4640, spread: 0.010 },
      { name: "八戸",       lat: 40.5123, lon: 141.4884, spread: 0.010 },
    ],
  },
  iwate: {
    label: "岩手県", scale: 60, mapView: { center: [141.2, 39.6], zoom: 7.0 },
    seeds: [
      { name: "盛岡駅前",   lat: 39.7019, lon: 141.1365, spread: 0.010 },
      { name: "盛岡・大通", lat: 39.7036, lon: 141.1527, spread: 0.008 },
      { name: "一関",       lat: 38.9347, lon: 141.1266, spread: 0.010 },
    ],
  },
  miyagi: {
    label: "宮城県", scale: 50, mapView: { center: [140.9, 38.4], zoom: 7.6 },
    seeds: [
      { name: "仙台駅前",     lat: 38.2601, lon: 140.8821, spread: 0.010 },
      { name: "仙台・国分町", lat: 38.2620, lon: 140.8719, spread: 0.008 },
      { name: "松島",         lat: 38.3680, lon: 141.0586, spread: 0.010 },
    ],
  },
  akita: {
    label: "秋田県", scale: 60, mapView: { center: [140.4, 39.7], zoom: 7.0 },
    seeds: [
      { name: "秋田駅前",     lat: 39.7168, lon: 140.1320, spread: 0.010 },
      { name: "秋田市中心部", lat: 39.7200, lon: 140.1233, spread: 0.008 },
      { name: "横手",         lat: 39.3103, lon: 140.5667, spread: 0.010 },
    ],
  },
  yamagata: {
    label: "山形県", scale: 50, mapView: { center: [140.1, 38.4], zoom: 7.4 },
    seeds: [
      { name: "山形駅前",     lat: 38.2484, lon: 140.3278, spread: 0.010 },
      { name: "山形市中心部", lat: 38.2554, lon: 140.3396, spread: 0.008 },
      { name: "米沢",         lat: 37.9222, lon: 140.1168, spread: 0.010 },
    ],
  },
  fukushima: {
    label: "福島県", scale: 60, mapView: { center: [140.2, 37.5], zoom: 7.2 },
    seeds: [
      { name: "福島駅前",   lat: 37.7543, lon: 140.4589, spread: 0.010 },
      { name: "郡山駅前",   lat: 37.3986, lon: 140.3877, spread: 0.010 },
      { name: "会津若松",   lat: 37.4948, lon: 139.9298, spread: 0.010 },
    ],
  },
  ibaraki: {
    label: "茨城県", scale: 50, mapView: { center: [140.3, 36.3], zoom: 7.8 },
    seeds: [
      { name: "水戸駅前",   lat: 36.3706, lon: 140.4764, spread: 0.010 },
      { name: "水戸・偕楽園", lat: 36.3742, lon: 140.4544, spread: 0.010 },
      { name: "つくば",     lat: 36.0835, lon: 140.0764, spread: 0.010 },
    ],
  },
  tochigi: {
    label: "栃木県", scale: 50, mapView: { center: [139.8, 36.6], zoom: 7.8 },
    seeds: [
      { name: "宇都宮",     lat: 36.5551, lon: 139.8828, spread: 0.010 },
      { name: "日光・東照宮周辺", lat: 36.7581, lon: 139.5994, spread: 0.012 },
      { name: "那須塩原",   lat: 36.9618, lon: 140.0460, spread: 0.012 },
    ],
  },
  gunma: {
    label: "群馬県", scale: 50, mapView: { center: [138.9, 36.4], zoom: 7.8 },
    seeds: [
      { name: "前橋",       lat: 36.3895, lon: 139.0634, spread: 0.010 },
      { name: "高崎",       lat: 36.3228, lon: 139.0128, spread: 0.010 },
      { name: "草津温泉",   lat: 36.6204, lon: 138.5963, spread: 0.010 },
    ],
  },
  saitama: {
    label: "埼玉県", scale: 40, mapView: { center: [139.4, 36.0], zoom: 8.2 },
    seeds: [
      { name: "大宮駅前",   lat: 35.9063, lon: 139.6236, spread: 0.008 },
      { name: "川越・小江戸", lat: 35.9251, lon: 139.4859, spread: 0.008 },
      { name: "秩父",       lat: 35.9919, lon: 139.0848, spread: 0.010 },
    ],
  },
  chiba: {
    label: "千葉県", scale: 50, mapView: { center: [140.2, 35.5], zoom: 7.8 },
    seeds: [
      { name: "千葉駅前",       lat: 35.6133, lon: 140.1133, spread: 0.010 },
      { name: "成田山新勝寺",   lat: 35.7860, lon: 140.3181, spread: 0.008 },
      { name: "舞浜",           lat: 35.6329, lon: 139.8804, spread: 0.010 },
      { name: "船橋駅前",       lat: 35.7016, lon: 139.9851, spread: 0.010 },
      { name: "市川駅前",       lat: 35.7307, lon: 139.9069, spread: 0.010 },
      { name: "松戸駅前",       lat: 35.7878, lon: 139.9008, spread: 0.010 },
      { name: "柏駅前",         lat: 35.8623, lon: 139.9707, spread: 0.010 },
      { name: "流山おおたかの森", lat: 35.8703, lon: 139.9255, spread: 0.010 },
      { name: "我孫子駅前",     lat: 35.8649, lon: 140.0280, spread: 0.010 },
      { name: "津田沼駅前",     lat: 35.6915, lon: 140.0203, spread: 0.010 },
      { name: "八千代台",       lat: 35.7256, lon: 140.0986, spread: 0.010 },
      { name: "佐倉・城下町",   lat: 35.7186, lon: 140.2236, spread: 0.010 },
      { name: "市原・五井",     lat: 35.5169, lon: 140.0894, spread: 0.010 },
      { name: "木更津駅前",     lat: 35.3817, lon: 139.9163, spread: 0.010 },
      { name: "君津駅前",       lat: 35.3306, lon: 139.9028, spread: 0.010 },
      { name: "茂原駅前",       lat: 35.4286, lon: 140.2876, spread: 0.010 },
      { name: "東金",           lat: 35.5597, lon: 140.3661, spread: 0.010 },
      { name: "館山駅前",       lat: 34.9967, lon: 139.8700, spread: 0.012 },
      { name: "安房鴨川駅前",   lat: 35.1131, lon: 140.0986, spread: 0.012 },
      { name: "勝浦",           lat: 35.1525, lon: 140.3206, spread: 0.012 },
      { name: "銚子駅前",       lat: 35.7347, lon: 140.8264, spread: 0.012 },
    ],
  },
  tokyo: {
    label: "東京都", scale: 25, mapView: { center: [139.72, 35.68], zoom: 9.5 },
    seeds: [
      { name: "東京駅・丸の内",       lat: 35.6812, lon: 139.7671, spread: 0.010 },
      { name: "銀座",                 lat: 35.6717, lon: 139.7650, spread: 0.006 },
      { name: "浅草・雷門",           lat: 35.7114, lon: 139.7966, spread: 0.008 },
      { name: "東京スカイツリー",     lat: 35.7101, lon: 139.8107, spread: 0.008 },
      { name: "上野公園",             lat: 35.7148, lon: 139.7745, spread: 0.008 },
      { name: "秋葉原",               lat: 35.6984, lon: 139.7731, spread: 0.006 },
      { name: "新宿駅東口",           lat: 35.6909, lon: 139.7004, spread: 0.008 },
      { name: "渋谷スクランブル交差点", lat: 35.6595, lon: 139.7005, spread: 0.008 },
      { name: "原宿・表参道",         lat: 35.6702, lon: 139.7026, spread: 0.008 },
      { name: "六本木",               lat: 35.6627, lon: 139.7314, spread: 0.008 },
      { name: "東京タワー",           lat: 35.6586, lon: 139.7454, spread: 0.008 },
      { name: "お台場",               lat: 35.6300, lon: 139.7754, spread: 0.010 },
      { name: "池袋",                 lat: 35.7295, lon: 139.7109, spread: 0.008 },
      { name: "品川駅",               lat: 35.6285, lon: 139.7387, spread: 0.008 },
      { name: "吉祥寺",               lat: 35.7032, lon: 139.5798, spread: 0.008 },
    ],
  },
  kanagawa: {
    label: "神奈川県", scale: 35, mapView: { center: [139.4, 35.4], zoom: 8.6 },
    seeds: [
      { name: "横浜みなとみらい", lat: 35.4571, lon: 139.6332, spread: 0.010 },
      { name: "横浜中華街",       lat: 35.4429, lon: 139.6453, spread: 0.006 },
      { name: "鎌倉・鶴岡八幡宮", lat: 35.3258, lon: 139.5561, spread: 0.008 },
      { name: "江の島",           lat: 35.3032, lon: 139.4803, spread: 0.008 },
      { name: "箱根湯本",         lat: 35.2329, lon: 139.1058, spread: 0.010 },
    ],
  },
  niigata: {
    label: "新潟県", scale: 70, mapView: { center: [138.9, 37.6], zoom: 6.8 },
    seeds: [
      { name: "新潟駅前",   lat: 37.9122, lon: 139.0619, spread: 0.010 },
      { name: "新潟・古町", lat: 37.9221, lon: 139.0455, spread: 0.008 },
      { name: "長岡",       lat: 37.4462, lon: 138.8513, spread: 0.010 },
    ],
  },
  toyama: {
    label: "富山県", scale: 40, mapView: { center: [137.2, 36.6], zoom: 8.0 },
    seeds: [
      { name: "富山駅前",   lat: 36.7012, lon: 137.2137, spread: 0.010 },
      { name: "富山城址公園周辺", lat: 36.6959, lon: 137.2114, spread: 0.008 },
      { name: "高岡",       lat: 36.7541, lon: 137.0257, spread: 0.010 },
    ],
  },
  ishikawa: {
    label: "石川県", scale: 50, mapView: { center: [136.7, 36.7], zoom: 7.6 },
    seeds: [
      { name: "金沢・近江町市場",   lat: 36.5719, lon: 136.6560, spread: 0.008 },
      { name: "金沢・ひがし茶屋街", lat: 36.5727, lon: 136.6669, spread: 0.006 },
      { name: "金沢・兼六園周辺",   lat: 36.5621, lon: 136.6624, spread: 0.008 },
      { name: "金沢駅前",           lat: 36.5780, lon: 136.6486, spread: 0.008 },
    ],
  },
  fukui: {
    label: "福井県", scale: 50, mapView: { center: [136.2, 35.9], zoom: 7.8 },
    seeds: [
      { name: "福井駅前",   lat: 36.0621, lon: 136.2233, spread: 0.010 },
      { name: "敦賀",       lat: 35.6452, lon: 136.0555, spread: 0.010 },
    ],
  },
  yamanashi: {
    label: "山梨県", scale: 40, mapView: { center: [138.6, 35.6], zoom: 8.0 },
    seeds: [
      { name: "甲府駅前",   lat: 35.6669, lon: 138.5687, spread: 0.010 },
      { name: "富士河口湖", lat: 35.5103, lon: 138.7689, spread: 0.012 },
      { name: "富士吉田",   lat: 35.4869, lon: 138.8079, spread: 0.010 },
    ],
  },
  nagano: {
    label: "長野県", scale: 70, mapView: { center: [138.0, 36.2], zoom: 6.9 },
    seeds: [
      { name: "長野駅前",   lat: 36.6431, lon: 138.1886, spread: 0.010 },
      { name: "善光寺",     lat: 36.6617, lon: 138.1877, spread: 0.008 },
      { name: "松本城",     lat: 36.2380, lon: 137.9720, spread: 0.008 },
      { name: "軽井沢",     lat: 36.3483, lon: 138.6353, spread: 0.010 },
    ],
  },
  gifu: {
    label: "岐阜県", scale: 60, mapView: { center: [137.0, 35.9], zoom: 7.2 },
    seeds: [
      { name: "岐阜駅前",       lat: 35.4095, lon: 136.7565, spread: 0.010 },
      { name: "高山・古い町並み", lat: 36.1408, lon: 137.2520, spread: 0.008 },
      { name: "白川郷",         lat: 36.2580, lon: 136.9066, spread: 0.010 },
    ],
  },
  shizuoka: {
    label: "静岡県", scale: 60, mapView: { center: [138.4, 35.0], zoom: 7.4 },
    seeds: [
      { name: "静岡駅前",   lat: 34.9719, lon: 138.3890, spread: 0.010 },
      { name: "浜松駅前",   lat: 34.7038, lon: 137.7340, spread: 0.010 },
      { name: "熱海",       lat: 35.1042, lon: 139.0738, spread: 0.010 },
    ],
  },
  aichi: {
    label: "愛知県", scale: 40, mapView: { center: [137.0, 35.1], zoom: 8.2 },
    seeds: [
      { name: "名古屋・栄",   lat: 35.1681, lon: 136.9080, spread: 0.010 },
      { name: "名古屋駅前",   lat: 35.1709, lon: 136.8816, spread: 0.008 },
      { name: "名古屋・大須", lat: 35.1597, lon: 136.9000, spread: 0.008 },
      { name: "犬山城下町",   lat: 35.3886, lon: 136.9447, spread: 0.008 },
    ],
  },
  mie: {
    label: "三重県", scale: 50, mapView: { center: [136.5, 34.6], zoom: 7.6 },
    seeds: [
      { name: "伊勢神宮・おはらい町", lat: 34.4549, lon: 136.7253, spread: 0.008 },
      { name: "津駅前",       lat: 34.7320, lon: 136.5086, spread: 0.010 },
      { name: "四日市",       lat: 34.9652, lon: 136.6245, spread: 0.010 },
    ],
  },
  shiga: {
    label: "滋賀県", scale: 40, mapView: { center: [136.1, 35.2], zoom: 8.0 },
    seeds: [
      { name: "大津駅前",   lat: 35.0036, lon: 135.8616, spread: 0.010 },
      { name: "彦根城周辺", lat: 35.2766, lon: 136.2517, spread: 0.008 },
      { name: "長浜",       lat: 35.3814, lon: 136.2773, spread: 0.008 },
    ],
  },
  kyoto: {
    label: "京都府", scale: 30, mapView: { center: [135.75, 35.0], zoom: 8.8 },
    seeds: [
      { name: "京都・祇園",     lat: 35.0037, lon: 135.7780, spread: 0.008 },
      { name: "京都・嵐山",     lat: 35.0094, lon: 135.6722, spread: 0.008 },
      { name: "京都・金閣寺",   lat: 35.0394, lon: 135.7292, spread: 0.008 },
      { name: "京都・伏見稲荷", lat: 34.9671, lon: 135.7727, spread: 0.008 },
      { name: "京都駅前",       lat: 34.9858, lon: 135.7585, spread: 0.008 },
      { name: "京都・清水寺周辺", lat: 34.9949, lon: 135.7850, spread: 0.008 },
    ],
  },
  osaka: {
    label: "大阪府", scale: 25, mapView: { center: [135.5, 34.65], zoom: 9.2 },
    seeds: [
      { name: "大阪・道頓堀",   lat: 34.6687, lon: 135.5013, spread: 0.008 },
      { name: "大阪・新世界",   lat: 34.6525, lon: 135.5063, spread: 0.006 },
      { name: "梅田",           lat: 34.7025, lon: 135.4959, spread: 0.008 },
      { name: "大阪城公園",     lat: 34.6873, lon: 135.5262, spread: 0.010 },
      { name: "アメリカ村",     lat: 34.6726, lon: 135.4985, spread: 0.006 },
    ],
  },
  hyogo: {
    label: "兵庫県", scale: 50, mapView: { center: [134.9, 34.9], zoom: 7.6 },
    seeds: [
      { name: "神戸・三宮",           lat: 34.6913, lon: 135.1955, spread: 0.010 },
      { name: "神戸ハーバーランド",   lat: 34.6796, lon: 135.1788, spread: 0.008 },
      { name: "姫路城",               lat: 34.8394, lon: 134.6939, spread: 0.008 },
      { name: "有馬温泉",             lat: 34.7975, lon: 135.2478, spread: 0.008 },
    ],
  },
  nara: {
    label: "奈良県", scale: 40, mapView: { center: [135.8, 34.5], zoom: 8.0 },
    seeds: [
      { name: "奈良公園",   lat: 34.6851, lon: 135.8430, spread: 0.010 },
      { name: "ならまち",   lat: 34.6794, lon: 135.8296, spread: 0.006 },
      { name: "橿原",       lat: 34.4892, lon: 135.7925, spread: 0.010 },
    ],
  },
  wakayama: {
    label: "和歌山県", scale: 50, mapView: { center: [135.4, 34.0], zoom: 7.6 },
    seeds: [
      { name: "和歌山駅前", lat: 34.2321, lon: 135.1908, spread: 0.010 },
      { name: "和歌山城周辺", lat: 34.2284, lon: 135.1716, spread: 0.008 },
      { name: "高野山",     lat: 34.2130, lon: 135.5841, spread: 0.010 },
    ],
  },
  tottori: {
    label: "鳥取県", scale: 50, mapView: { center: [133.8, 35.4], zoom: 7.8 },
    seeds: [
      { name: "鳥取駅前",   lat: 35.4938, lon: 134.2226, spread: 0.010 },
      { name: "米子",       lat: 35.4281, lon: 133.3310, spread: 0.010 },
    ],
  },
  shimane: {
    label: "島根県", scale: 60, mapView: { center: [132.8, 35.3], zoom: 7.4 },
    seeds: [
      { name: "松江",       lat: 35.4660, lon: 133.0635, spread: 0.010 },
      { name: "出雲大社周辺", lat: 35.4017, lon: 132.6855, spread: 0.010 },
      { name: "出雲市駅前", lat: 35.3656, lon: 132.7575, spread: 0.010 },
    ],
  },
  okayama: {
    label: "岡山県", scale: 50, mapView: { center: [133.8, 34.8], zoom: 7.8 },
    seeds: [
      { name: "岡山駅前",     lat: 34.6659, lon: 133.9180, spread: 0.010 },
      { name: "岡山・後楽園周辺", lat: 34.6675, lon: 133.9360, spread: 0.008 },
      { name: "倉敷美観地区", lat: 34.5953, lon: 133.7720, spread: 0.008 },
    ],
  },
  hiroshima: {
    label: "広島県", scale: 50, mapView: { center: [132.7, 34.4], zoom: 7.6 },
    seeds: [
      { name: "広島・原爆ドーム", lat: 34.3955, lon: 132.4536, spread: 0.008 },
      { name: "広島駅前",         lat: 34.3978, lon: 132.4757, spread: 0.010 },
      { name: "宮島・厳島神社",   lat: 34.2960, lon: 132.3199, spread: 0.008 },
      { name: "尾道",             lat: 34.4090, lon: 133.2050, spread: 0.010 },
    ],
  },
  yamaguchi: {
    label: "山口県", scale: 60, mapView: { center: [131.5, 34.2], zoom: 7.4 },
    seeds: [
      { name: "下関・唐戸",     lat: 33.9560, lon: 130.9410, spread: 0.010 },
      { name: "山口駅前",       lat: 34.1740, lon: 131.4737, spread: 0.010 },
      { name: "岩国・錦帯橋周辺", lat: 34.1670, lon: 132.1772, spread: 0.008 },
    ],
  },
  tokushima: {
    label: "徳島県", scale: 40, mapView: { center: [134.4, 33.9], zoom: 7.8 },
    seeds: [
      { name: "徳島駅前",   lat: 34.0746, lon: 134.5510, spread: 0.010 },
      { name: "鳴門",       lat: 34.1726, lon: 134.6090, spread: 0.010 },
    ],
  },
  kagawa: {
    label: "香川県", scale: 30, mapView: { center: [134.0, 34.3], zoom: 8.4 },
    seeds: [
      { name: "高松駅前",       lat: 34.3508, lon: 134.0466, spread: 0.010 },
      { name: "高松・商店街",   lat: 34.3428, lon: 134.0466, spread: 0.008 },
      { name: "琴平・こんぴらさん周辺", lat: 34.1873, lon: 133.8201, spread: 0.008 },
    ],
  },
  ehime: {
    label: "愛媛県", scale: 50, mapView: { center: [132.8, 33.8], zoom: 7.6 },
    seeds: [
      { name: "松山・道後温泉", lat: 33.8520, lon: 132.7860, spread: 0.008 },
      { name: "松山市駅前",     lat: 33.8392, lon: 132.7657, spread: 0.010 },
      { name: "今治",           lat: 34.0663, lon: 132.9978, spread: 0.010 },
    ],
  },
  kochi: {
    label: "高知県", scale: 60, mapView: { center: [133.5, 33.5], zoom: 7.4 },
    seeds: [
      { name: "高知駅前",       lat: 33.5664, lon: 133.5434, spread: 0.010 },
      { name: "はりまや橋",     lat: 33.5597, lon: 133.5430, spread: 0.008 },
    ],
  },
  fukuoka: {
    label: "福岡県", scale: 40, mapView: { center: [130.6, 33.6], zoom: 8.0 },
    seeds: [
      { name: "福岡・天神",   lat: 33.5914, lon: 130.3989, spread: 0.010 },
      { name: "博多駅前",     lat: 33.5897, lon: 130.4207, spread: 0.008 },
      { name: "太宰府天満宮", lat: 33.5196, lon: 130.5350, spread: 0.008 },
      { name: "門司港レトロ", lat: 33.9460, lon: 130.9620, spread: 0.008 },
    ],
  },
  saga: {
    label: "佐賀県", scale: 40, mapView: { center: [130.1, 33.3], zoom: 8.0 },
    seeds: [
      { name: "佐賀駅前",   lat: 33.2644, lon: 130.2988, spread: 0.010 },
      { name: "唐津",       lat: 33.4503, lon: 129.9680, spread: 0.010 },
    ],
  },
  nagasaki: {
    label: "長崎県", scale: 60, mapView: { center: [129.9, 33.0], zoom: 7.4 },
    seeds: [
      { name: "長崎・グラバー園周辺", lat: 32.7341, lon: 129.8699, spread: 0.010 },
      { name: "長崎駅前",             lat: 32.7503, lon: 129.8779, spread: 0.010 },
      { name: "佐世保",               lat: 33.1683, lon: 129.7253, spread: 0.010 },
    ],
  },
  kumamoto: {
    label: "熊本県", scale: 50, mapView: { center: [130.7, 32.7], zoom: 7.6 },
    seeds: [
      { name: "熊本城周辺",   lat: 32.8062, lon: 130.7058, spread: 0.008 },
      { name: "熊本・下通",   lat: 32.8000, lon: 130.7080, spread: 0.008 },
    ],
  },
  oita: {
    label: "大分県", scale: 50, mapView: { center: [131.4, 33.2], zoom: 7.6 },
    seeds: [
      { name: "別府温泉",   lat: 33.2796, lon: 131.5000, spread: 0.010 },
      { name: "由布院",     lat: 33.2646, lon: 131.3544, spread: 0.010 },
      { name: "大分駅前",   lat: 33.2335, lon: 131.6064, spread: 0.010 },
    ],
  },
  miyazaki: {
    label: "宮崎県", scale: 60, mapView: { center: [131.4, 32.1], zoom: 7.4 },
    seeds: [
      { name: "宮崎駅前",     lat: 31.9156, lon: 131.4317, spread: 0.010 },
      { name: "宮崎市中心部", lat: 31.9077, lon: 131.4202, spread: 0.008 },
      { name: "青島",         lat: 31.8049, lon: 131.4684, spread: 0.010 },
    ],
  },
  kagoshima: {
    label: "鹿児島県", scale: 70, mapView: { center: [130.6, 31.6], zoom: 7.2 },
    seeds: [
      { name: "鹿児島・天文館",   lat: 31.5900, lon: 130.5571, spread: 0.008 },
      { name: "鹿児島中央駅前",   lat: 31.5836, lon: 130.5419, spread: 0.008 },
      { name: "指宿",             lat: 31.2526, lon: 130.6330, spread: 0.012 },
    ],
  },
  okinawa: {
    label: "沖縄県", scale: 60, mapView: { center: [127.8, 26.4], zoom: 7.8 },
    seeds: [
      { name: "那覇・国際通り",       lat: 26.2146, lon: 127.6869, spread: 0.008 },
      { name: "首里城周辺",           lat: 26.2173, lon: 127.7195, spread: 0.008 },
      { name: "北谷・アメリカンビレッジ", lat: 26.3158, lon: 127.7561, spread: 0.008 },
      { name: "名護",                 lat: 26.5917, lon: 127.9774, spread: 0.012 },
    ],
  },
};

// ===== 地方（都道府県の組み合わせ） =====
export const JP_AREAS = {
  hokkaido: {
    label: "北海道", scale: 150,
    mapView: { center: [142.5, 43.4], zoom: 5.6 },
    prefs: ["hokkaido"],
  },
  tohoku: {
    label: "東北", scale: 200,
    mapView: { center: [140.7, 39.0], zoom: 5.8 },
    prefs: ["aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima"],
  },
  kanto: {
    label: "関東", scale: 80,
    mapView: { center: [139.65, 35.95], zoom: 7.2 },
    prefs: ["ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa"],
  },
  chubu: {
    label: "中部", scale: 150,
    mapView: { center: [137.7, 36.1], zoom: 6.2 },
    prefs: ["niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano", "gifu", "shizuoka", "aichi"],
  },
  kinki: {
    label: "近畿", scale: 100,
    mapView: { center: [135.6, 34.6], zoom: 7.0 },
    prefs: ["mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama"],
  },
  chugoku: {
    label: "中国", scale: 120,
    mapView: { center: [132.9, 34.8], zoom: 6.8 },
    prefs: ["tottori", "shimane", "okayama", "hiroshima", "yamaguchi"],
  },
  shikoku: {
    label: "四国", scale: 100,
    mapView: { center: [133.5, 33.7], zoom: 7.0 },
    prefs: ["tokushima", "kagawa", "ehime", "kochi"],
  },
  kyushu: {
    label: "九州・沖縄", scale: 250,
    mapView: { center: [130.3, 30.8], zoom: 5.4 },
    prefs: ["fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa"],
  },
};

// ===== 全国・世界 =====
export const REGIONS = {
  japan: {
    label: "日本",
    scale: 500,
    mapView: { center: [137.2, 38.0], zoom: 4.3 },
    // 全国の有名観光地（47都道府県のシードから主要どころを集約しても良いが、
    // 旅行先として名高いスポットを厳選）
    seeds: [
      { name: "札幌・大通公園",       lat: 43.0595, lon: 141.3470, spread: 0.010 },
      { name: "小樽運河",             lat: 43.1985, lon: 141.0019, spread: 0.008 },
      { name: "函館・ベイエリア",     lat: 41.7687, lon: 140.7170, spread: 0.010 },
      { name: "仙台駅前",             lat: 38.2601, lon: 140.8821, spread: 0.010 },
      { name: "松島",                 lat: 38.3680, lon: 141.0586, spread: 0.010 },
      { name: "日光・東照宮周辺",     lat: 36.7581, lon: 139.5994, spread: 0.012 },
      { name: "軽井沢",               lat: 36.3483, lon: 138.6353, spread: 0.010 },
      { name: "草津温泉",             lat: 36.6204, lon: 138.5963, spread: 0.010 },
      { name: "東京・浅草",           lat: 35.7114, lon: 139.7966, spread: 0.008 },
      { name: "東京・渋谷",           lat: 35.6595, lon: 139.7005, spread: 0.008 },
      { name: "横浜みなとみらい",     lat: 35.4571, lon: 139.6332, spread: 0.010 },
      { name: "鎌倉",                 lat: 35.3258, lon: 139.5561, spread: 0.008 },
      { name: "箱根湯本",             lat: 35.2329, lon: 139.1058, spread: 0.010 },
      { name: "熱海",                 lat: 35.1042, lon: 139.0738, spread: 0.010 },
      { name: "富士河口湖",           lat: 35.5103, lon: 138.7689, spread: 0.012 },
      { name: "松本城",               lat: 36.2380, lon: 137.9720, spread: 0.008 },
      { name: "高山・古い町並み",     lat: 36.1408, lon: 137.2520, spread: 0.008 },
      { name: "金沢・近江町市場",     lat: 36.5719, lon: 136.6560, spread: 0.008 },
      { name: "金沢・ひがし茶屋街",   lat: 36.5727, lon: 136.6669, spread: 0.006 },
      { name: "名古屋・栄",           lat: 35.1681, lon: 136.9080, spread: 0.010 },
      { name: "伊勢神宮・おはらい町", lat: 34.4549, lon: 136.7253, spread: 0.008 },
      { name: "京都・祇園",           lat: 35.0037, lon: 135.7780, spread: 0.008 },
      { name: "京都・嵐山",           lat: 35.0094, lon: 135.6722, spread: 0.008 },
      { name: "京都・金閣寺",         lat: 35.0394, lon: 135.7292, spread: 0.008 },
      { name: "京都・伏見稲荷",       lat: 34.9671, lon: 135.7727, spread: 0.008 },
      { name: "奈良公園",             lat: 34.6851, lon: 135.8430, spread: 0.010 },
      { name: "大阪・道頓堀",         lat: 34.6687, lon: 135.5013, spread: 0.008 },
      { name: "大阪・新世界",         lat: 34.6525, lon: 135.5063, spread: 0.006 },
      { name: "神戸・三宮",           lat: 34.6913, lon: 135.1955, spread: 0.010 },
      { name: "姫路城",               lat: 34.8394, lon: 134.6939, spread: 0.008 },
      { name: "倉敷美観地区",         lat: 34.5953, lon: 133.7720, spread: 0.008 },
      { name: "尾道",                 lat: 34.4090, lon: 133.2050, spread: 0.010 },
      { name: "広島・原爆ドーム",     lat: 34.3955, lon: 132.4536, spread: 0.008 },
      { name: "宮島・厳島神社",       lat: 34.2960, lon: 132.3199, spread: 0.008 },
      { name: "高松",                 lat: 34.3508, lon: 134.0466, spread: 0.010 },
      { name: "松山・道後温泉",       lat: 33.8520, lon: 132.7860, spread: 0.008 },
      { name: "福岡・天神",           lat: 33.5914, lon: 130.3989, spread: 0.010 },
      { name: "太宰府天満宮",         lat: 33.5196, lon: 130.5350, spread: 0.008 },
      { name: "長崎・グラバー園周辺", lat: 32.7341, lon: 129.8699, spread: 0.010 },
      { name: "由布院",               lat: 33.2646, lon: 131.3544, spread: 0.010 },
      { name: "別府温泉",             lat: 33.2796, lon: 131.5000, spread: 0.010 },
      { name: "熊本城",               lat: 32.8062, lon: 130.7058, spread: 0.008 },
      { name: "鹿児島・天文館",       lat: 31.5900, lon: 130.5571, spread: 0.008 },
      { name: "那覇・国際通り",       lat: 26.2146, lon: 127.6869, spread: 0.008 },
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
      { name: "台北101周辺",          lat: 25.0330, lon: 121.5654, spread: 0.010 },
      { name: "香港・中環",           lat: 22.2783, lon: 114.1747, spread: 0.010 },
      { name: "バンコク・王宮周辺",   lat: 13.7516, lon: 100.4927, spread: 0.012 },
      { name: "シンガポール・マリーナベイ", lat: 1.2838, lon: 103.8591, spread: 0.012 },
      { name: "クアラルンプール・KLCC", lat: 3.1579, lon: 101.7120, spread: 0.010 },
      { name: "ドバイ・ダウンタウン", lat: 25.1972, lon: 55.2744, spread: 0.012 },
      { name: "イスタンブール旧市街", lat: 41.0082, lon: 28.9784, spread: 0.010 },
      // ヨーロッパ
      { name: "ロンドン・ウェストミンスター", lat: 51.5007, lon: -0.1246, spread: 0.010 },
      { name: "パリ・エッフェル塔",   lat: 48.8584, lon: 2.2945,  spread: 0.010 },
      { name: "パリ・シャンゼリゼ",   lat: 48.8698, lon: 2.3075,  spread: 0.008 },
      { name: "ベルリン・ブランデンブルク門", lat: 52.5163, lon: 13.3777, spread: 0.010 },
      { name: "アムステルダム・ダム広場", lat: 52.3731, lon: 4.8926, spread: 0.008 },
      { name: "ブリュッセル・グランプラス", lat: 50.8467, lon: 4.3525, spread: 0.008 },
      { name: "ローマ・コロッセオ",   lat: 41.8902, lon: 12.4922, spread: 0.010 },
      { name: "ベネチア・サンマルコ広場", lat: 45.4341, lon: 12.3388, spread: 0.006 },
      { name: "バルセロナ・サグラダファミリア", lat: 41.4036, lon: 2.1744, spread: 0.010 },
      { name: "マドリード・ソル広場", lat: 40.4169, lon: -3.7035, spread: 0.008 },
      { name: "リスボン旧市街",       lat: 38.7139, lon: -9.1394, spread: 0.010 },
      { name: "プラハ旧市街",         lat: 50.0875, lon: 14.4213, spread: 0.008 },
      { name: "ウィーン・シュテファン大聖堂", lat: 48.2082, lon: 16.3738, spread: 0.008 },
      { name: "ブダペスト・国会議事堂", lat: 47.5076, lon: 19.0456, spread: 0.010 },
      { name: "ワルシャワ旧市街",     lat: 52.2497, lon: 21.0122, spread: 0.008 },
      { name: "クラクフ旧市街",       lat: 50.0617, lon: 19.9373, spread: 0.008 },
      { name: "コペンハーゲン・ニューハウン", lat: 55.6794, lon: 12.5912, spread: 0.008 },
      { name: "ストックホルム旧市街", lat: 59.3251, lon: 18.0711, spread: 0.008 },
      { name: "チューリッヒ旧市街",   lat: 47.3717, lon: 8.5423,  spread: 0.008 },
      { name: "アテネ・アクロポリス周辺", lat: 37.9715, lon: 23.7267, spread: 0.010 },
      { name: "ダブリン・テンプルバー", lat: 53.3454, lon: -6.2637, spread: 0.008 },
      // 北米
      { name: "ニューヨーク・タイムズスクエア", lat: 40.7580, lon: -73.9855, spread: 0.010 },
      { name: "ワシントンDC・ナショナルモール", lat: 38.8895, lon: -77.0353, spread: 0.012 },
      { name: "シカゴ・ループ",       lat: 41.8819, lon: -87.6278, spread: 0.010 },
      { name: "サンフランシスコ・ユニオンスクエア", lat: 37.7880, lon: -122.4075, spread: 0.010 },
      { name: "ロサンゼルス・ハリウッド", lat: 34.1016, lon: -118.3267, spread: 0.012 },
      { name: "ラスベガス・ストリップ", lat: 36.1147, lon: -115.1728, spread: 0.012 },
      { name: "ホノルル・ワイキキ",   lat: 21.2793, lon: -157.8294, spread: 0.010 },
      { name: "バンクーバー・ガスタウン", lat: 49.2837, lon: -123.1086, spread: 0.008 },
      { name: "トロント・CNタワー周辺", lat: 43.6426, lon: -79.3871, spread: 0.010 },
      { name: "メキシコシティ・ソカロ", lat: 19.4326, lon: -99.1332, spread: 0.010 },
      // 南米
      { name: "リオ・コパカバーナ",   lat: -22.9711, lon: -43.1822, spread: 0.012 },
      { name: "サンパウロ・パウリスタ通り", lat: -23.5614, lon: -46.6559, spread: 0.010 },
      { name: "ブエノスアイレス・オベリスコ", lat: -34.6037, lon: -58.3816, spread: 0.010 },
      // オセアニア
      { name: "シドニー・オペラハウス", lat: -33.8568, lon: 151.2153, spread: 0.012 },
      { name: "メルボルン・フリンダース駅", lat: -37.8183, lon: 144.9671, spread: 0.010 },
      { name: "オークランド",         lat: -36.8485, lon: 174.7633, spread: 0.010 },
      // アフリカ
      { name: "ケープタウン・ウォーターフロント", lat: -33.9036, lon: 18.4196, spread: 0.012 },
    ],
  },
};

// ===== 国別モード：国コード -> シード（各国のメジャースポット・観光地） =====
export const COUNTRIES = {
  jp: {
    label: "日本", scale: 500,
    mapView: { center: [137.2, 38.0], zoom: 4.3 },
    seeds: null, // 下で japan を流用
  },
  kr: {
    label: "韓国", scale: 300,
    mapView: { center: [127.8, 36.3], zoom: 5.6 },
    seeds: [
      { name: "ソウル・明洞",       lat: 37.5636, lon: 126.9838, spread: 0.010 },
      { name: "ソウル・景福宮",     lat: 37.5796, lon: 126.9770, spread: 0.008 },
      { name: "ソウル・江南",       lat: 37.4979, lon: 127.0276, spread: 0.010 },
      { name: "釜山・海雲台",       lat: 35.1587, lon: 129.1604, spread: 0.010 },
      { name: "釜山・南浦洞",       lat: 35.0988, lon: 129.0287, spread: 0.008 },
      { name: "仁川・チャイナタウン", lat: 37.4754, lon: 126.6176, spread: 0.008 },
    ],
  },
  tw: {
    label: "台湾", scale: 200,
    mapView: { center: [121.0, 23.7], zoom: 6.0 },
    seeds: [
      { name: "台北101",           lat: 25.0330, lon: 121.5654, spread: 0.010 },
      { name: "台北・西門町",       lat: 25.0421, lon: 121.5081, spread: 0.008 },
      { name: "台北・中正紀念堂",   lat: 25.0347, lon: 121.5217, spread: 0.008 },
      { name: "台中",               lat: 24.1477, lon: 120.6736, spread: 0.010 },
      { name: "台南",               lat: 22.9999, lon: 120.2027, spread: 0.010 },
      { name: "高雄",               lat: 22.6203, lon: 120.3133, spread: 0.010 },
    ],
  },
  th: {
    label: "タイ", scale: 400,
    mapView: { center: [101.0, 13.5], zoom: 4.8 },
    seeds: [
      { name: "バンコク・王宮",     lat: 13.7516, lon: 100.4927, spread: 0.010 },
      { name: "バンコク・カオサン通り", lat: 13.7588, lon: 100.4972, spread: 0.008 },
      { name: "バンコク・サイアム", lat: 13.7460, lon: 100.5347, spread: 0.010 },
      { name: "チェンマイ旧市街",   lat: 18.7884, lon: 98.9853, spread: 0.010 },
      { name: "パタヤ",             lat: 12.9329, lon: 100.8825, spread: 0.012 },
      { name: "プーケットタウン",   lat: 7.8836,  lon: 98.3915, spread: 0.012 },
    ],
  },
  sg: {
    label: "シンガポール", scale: 30,
    mapView: { center: [103.82, 1.35], zoom: 9.8 },
    seeds: [
      { name: "マリーナベイ",       lat: 1.2838, lon: 103.8591, spread: 0.010 },
      { name: "オーチャードロード", lat: 1.3048, lon: 103.8318, spread: 0.008 },
      { name: "チャイナタウン",     lat: 1.2838, lon: 103.8443, spread: 0.006 },
      { name: "リトルインディア",   lat: 1.3066, lon: 103.8518, spread: 0.006 },
      { name: "クラークキー",       lat: 1.2906, lon: 103.8465, spread: 0.006 },
    ],
  },
  us: {
    label: "アメリカ", scale: 1500,
    mapView: { center: [-98, 39], zoom: 3.2 },
    seeds: [
      { name: "NY タイムズスクエア",  lat: 40.7580, lon: -73.9855, spread: 0.010 },
      { name: "NY ブルックリンブリッジ", lat: 40.7061, lon: -73.9969, spread: 0.010 },
      { name: "SF ユニオンスクエア",  lat: 37.7880, lon: -122.4075, spread: 0.010 },
      { name: "SF フィッシャーマンズワーフ", lat: 37.8080, lon: -122.4177, spread: 0.008 },
      { name: "LA ハリウッド",        lat: 34.1016, lon: -118.3267, spread: 0.012 },
      { name: "LA サンタモニカ",      lat: 34.0093, lon: -118.4973, spread: 0.010 },
      { name: "シカゴ・ループ",       lat: 41.8819, lon: -87.6278, spread: 0.010 },
      { name: "シアトル・パイクプレイス", lat: 47.6097, lon: -122.3422, spread: 0.008 },
      { name: "ラスベガス・ストリップ", lat: 36.1147, lon: -115.1728, spread: 0.012 },
      { name: "マイアミビーチ",       lat: 25.7907, lon: -80.1300, spread: 0.010 },
      { name: "ワシントンDC・モール", lat: 38.8895, lon: -77.0353, spread: 0.012 },
      { name: "ボストン・ダウンタウン", lat: 42.3554, lon: -71.0605, spread: 0.010 },
      { name: "ニューオーリンズ・フレンチクォーター", lat: 29.9584, lon: -90.0644, spread: 0.008 },
      { name: "ホノルル・ワイキキ",   lat: 21.2793, lon: -157.8294, spread: 0.010 },
    ],
  },
  ca: {
    label: "カナダ", scale: 1200,
    mapView: { center: [-96, 56], zoom: 2.6 },
    seeds: [
      { name: "トロント・CNタワー周辺", lat: 43.6426, lon: -79.3871, spread: 0.010 },
      { name: "バンクーバー・ガスタウン", lat: 49.2837, lon: -123.1086, spread: 0.008 },
      { name: "モントリオール旧市街", lat: 45.5075, lon: -73.5544, spread: 0.008 },
      { name: "ケベックシティ旧市街", lat: 46.8123, lon: -71.2055, spread: 0.008 },
      { name: "オタワ・パーラメントヒル", lat: 45.4236, lon: -75.7009, spread: 0.008 },
      { name: "カルガリー",           lat: 51.0447, lon: -114.0719, spread: 0.010 },
    ],
  },
  mx: {
    label: "メキシコ", scale: 800,
    mapView: { center: [-102, 23.8], zoom: 4.0 },
    seeds: [
      { name: "メキシコシティ・ソカロ", lat: 19.4326, lon: -99.1332, spread: 0.010 },
      { name: "メキシコシティ・レフォルマ通り", lat: 19.4270, lon: -99.1677, spread: 0.010 },
      { name: "グアダラハラ",         lat: 20.6767, lon: -103.3475, spread: 0.010 },
      { name: "カンクン・ホテルゾーン", lat: 21.1326, lon: -86.7479, spread: 0.012 },
      { name: "オアハカ",             lat: 17.0606, lon: -96.7253, spread: 0.008 },
    ],
  },
  gb: {
    label: "イギリス", scale: 300,
    mapView: { center: [-2.5, 54.0], zoom: 4.6 },
    seeds: [
      { name: "ロンドン・ウェストミンスター", lat: 51.5007, lon: -0.1246, spread: 0.010 },
      { name: "ロンドン・タワーブリッジ", lat: 51.5055, lon: -0.0754, spread: 0.008 },
      { name: "ロンドン・ピカデリーサーカス", lat: 51.5101, lon: -0.1344, spread: 0.008 },
      { name: "マンチェスター中心部", lat: 53.4794, lon: -2.2453, spread: 0.008 },
      { name: "エディンバラ旧市街",   lat: 55.9486, lon: -3.1999, spread: 0.008 },
      { name: "リバプール・アルバートドック", lat: 53.4002, lon: -2.9926, spread: 0.008 },
      { name: "オックスフォード",     lat: 51.7548, lon: -1.2544, spread: 0.008 },
      { name: "ケンブリッジ",         lat: 52.2053, lon: 0.1218, spread: 0.008 },
      { name: "バース",               lat: 51.3813, lon: -2.3590, spread: 0.008 },
    ],
  },
  fr: {
    label: "フランス", scale: 400,
    mapView: { center: [2.5, 46.8], zoom: 4.7 },
    seeds: [
      { name: "パリ・エッフェル塔",   lat: 48.8584, lon: 2.2945, spread: 0.010 },
      { name: "パリ・ノートルダム",   lat: 48.8530, lon: 2.3499, spread: 0.008 },
      { name: "パリ・モンマルトル",   lat: 48.8867, lon: 2.3431, spread: 0.008 },
      { name: "ベルサイユ宮殿周辺",   lat: 48.8049, lon: 2.1204, spread: 0.010 },
      { name: "リヨン旧市街",         lat: 45.7621, lon: 4.8273, spread: 0.008 },
      { name: "マルセイユ旧港",       lat: 43.2951, lon: 5.3741, spread: 0.008 },
      { name: "ニース・プロムナード", lat: 43.6952, lon: 7.2656, spread: 0.010 },
      { name: "ボルドー中心部",       lat: 44.8412, lon: -0.5800, spread: 0.008 },
      { name: "ストラスブール",       lat: 48.5818, lon: 7.7506, spread: 0.008 },
    ],
  },
  de: {
    label: "ドイツ", scale: 400,
    mapView: { center: [10.3, 51.2], zoom: 4.7 },
    seeds: [
      { name: "ベルリン・ブランデンブルク門", lat: 52.5163, lon: 13.3777, spread: 0.010 },
      { name: "ベルリン・アレクサンダー広場", lat: 52.5219, lon: 13.4132, spread: 0.008 },
      { name: "ミュンヘン・マリエン広場", lat: 48.1374, lon: 11.5755, spread: 0.008 },
      { name: "ハンブルク港",         lat: 53.5438, lon: 9.9796, spread: 0.010 },
      { name: "ケルン大聖堂周辺",     lat: 50.9413, lon: 6.9583, spread: 0.008 },
      { name: "フランクフルト・レーマー", lat: 50.1106, lon: 8.6820, spread: 0.008 },
      { name: "ドレスデン旧市街",     lat: 51.0520, lon: 13.7372, spread: 0.008 },
      { name: "ハイデルベルク旧市街", lat: 49.4116, lon: 8.7104, spread: 0.008 },
    ],
  },
  nl: {
    label: "オランダ", scale: 150,
    mapView: { center: [5.3, 52.2], zoom: 6.2 },
    seeds: [
      { name: "アムステルダム・ダム広場", lat: 52.3731, lon: 4.8926, spread: 0.008 },
      { name: "アムステルダム・運河地区", lat: 52.3676, lon: 4.9041, spread: 0.008 },
      { name: "ロッテルダム中心部",   lat: 51.9225, lon: 4.4792, spread: 0.010 },
      { name: "ユトレヒト旧市街",     lat: 52.0907, lon: 5.1214, spread: 0.008 },
      { name: "ハーグ",               lat: 52.0799, lon: 4.3113, spread: 0.008 },
    ],
  },
  it: {
    label: "イタリア", scale: 400,
    mapView: { center: [12.5, 42.5], zoom: 4.6 },
    seeds: [
      { name: "ローマ・コロッセオ",   lat: 41.8902, lon: 12.4922, spread: 0.010 },
      { name: "ローマ・トレビの泉",   lat: 41.9009, lon: 12.4833, spread: 0.006 },
      { name: "バチカン・サンピエトロ広場", lat: 41.9022, lon: 12.4567, spread: 0.008 },
      { name: "ミラノ・ドゥオーモ",   lat: 45.4642, lon: 9.1900, spread: 0.008 },
      { name: "フィレンツェ大聖堂",   lat: 43.7731, lon: 11.2560, spread: 0.008 },
      { name: "ベネチア・サンマルコ広場", lat: 45.4341, lon: 12.3388, spread: 0.006 },
      { name: "ナポリ中心部",         lat: 40.8467, lon: 14.2526, spread: 0.010 },
      { name: "ピサの斜塔周辺",       lat: 43.7230, lon: 10.3966, spread: 0.008 },
      { name: "ベローナ旧市街",       lat: 45.4430, lon: 10.9936, spread: 0.008 },
    ],
  },
  es: {
    label: "スペイン", scale: 400,
    mapView: { center: [-3.7, 40.2], zoom: 4.7 },
    seeds: [
      { name: "マドリード・ソル広場", lat: 40.4169, lon: -3.7035, spread: 0.008 },
      { name: "マドリード・プラド美術館周辺", lat: 40.4138, lon: -3.6921, spread: 0.008 },
      { name: "バルセロナ・サグラダファミリア", lat: 41.4036, lon: 2.1744, spread: 0.010 },
      { name: "バルセロナ・ランブラス通り", lat: 41.3809, lon: 2.1735, spread: 0.008 },
      { name: "セビリア大聖堂周辺",   lat: 37.3858, lon: -5.9933, spread: 0.008 },
      { name: "グラナダ・アルハンブラ周辺", lat: 37.1761, lon: -3.5881, spread: 0.010 },
      { name: "バレンシア旧市街",     lat: 39.4754, lon: -0.3766, spread: 0.008 },
      { name: "ビルバオ・グッゲンハイム周辺", lat: 43.2687, lon: -2.9340, spread: 0.008 },
    ],
  },
  pt: {
    label: "ポルトガル", scale: 200,
    mapView: { center: [-8.2, 39.6], zoom: 5.8 },
    seeds: [
      { name: "リスボン・バイシャ地区", lat: 38.7139, lon: -9.1394, spread: 0.008 },
      { name: "リスボン・ベレンの塔",  lat: 38.6916, lon: -9.2160, spread: 0.008 },
      { name: "ポルト・リベイラ地区",  lat: 41.1408, lon: -8.6110, spread: 0.008 },
      { name: "シントラ",              lat: 38.7980, lon: -9.3880, spread: 0.010 },
    ],
  },
  cz: {
    label: "チェコ", scale: 150,
    mapView: { center: [15.4, 49.8], zoom: 6.0 },
    seeds: [
      { name: "プラハ・旧市街広場",   lat: 50.0875, lon: 14.4213, spread: 0.008 },
      { name: "プラハ・カレル橋",     lat: 50.0865, lon: 14.4114, spread: 0.006 },
      { name: "プラハ城周辺",         lat: 50.0911, lon: 14.4016, spread: 0.008 },
      { name: "ブルノ中心部",         lat: 49.1951, lon: 16.6068, spread: 0.008 },
    ],
  },
  at: {
    label: "オーストリア", scale: 200,
    mapView: { center: [13.4, 47.6], zoom: 6.0 },
    seeds: [
      { name: "ウィーン・シュテファン大聖堂", lat: 48.2082, lon: 16.3738, spread: 0.008 },
      { name: "ウィーン・シェーンブルン宮殿周辺", lat: 48.1845, lon: 16.3122, spread: 0.010 },
      { name: "ザルツブルク旧市街",   lat: 47.7995, lon: 13.0455, spread: 0.008 },
      { name: "インスブルック",       lat: 47.2682, lon: 11.3933, spread: 0.008 },
    ],
  },
  ch: {
    label: "スイス", scale: 150,
    mapView: { center: [8.2, 46.8], zoom: 6.4 },
    seeds: [
      { name: "チューリッヒ旧市街",   lat: 47.3717, lon: 8.5423, spread: 0.008 },
      { name: "ジュネーブ・レマン湖畔", lat: 46.2074, lon: 6.1481, spread: 0.008 },
      { name: "ルツェルン・カペル橋", lat: 47.0517, lon: 8.3072, spread: 0.006 },
      { name: "ベルン旧市街",         lat: 46.9480, lon: 7.4474, spread: 0.008 },
      { name: "インターラーケン",     lat: 46.6863, lon: 7.8632, spread: 0.010 },
    ],
  },
  gr: {
    label: "ギリシャ", scale: 300,
    mapView: { center: [23.8, 38.5], zoom: 5.5 },
    seeds: [
      { name: "アテネ・アクロポリス周辺", lat: 37.9715, lon: 23.7267, spread: 0.010 },
      { name: "アテネ・シンタグマ広場", lat: 37.9755, lon: 23.7348, spread: 0.008 },
      { name: "テッサロニキ",         lat: 40.6401, lon: 22.9444, spread: 0.010 },
    ],
  },
  tr: {
    label: "トルコ", scale: 600,
    mapView: { center: [35, 39], zoom: 4.8 },
    seeds: [
      { name: "イスタンブール・ブルーモスク周辺", lat: 41.0054, lon: 28.9768, spread: 0.008 },
      { name: "イスタンブール・ガラタ塔", lat: 41.0256, lon: 28.9744, spread: 0.008 },
      { name: "イスタンブール・タクシム広場", lat: 41.0370, lon: 28.9850, spread: 0.008 },
      { name: "アンカラ",             lat: 39.9208, lon: 32.8541, spread: 0.010 },
      { name: "イズミル",             lat: 38.4192, lon: 27.1287, spread: 0.010 },
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
      { name: "ゴールドコースト・サーファーズパラダイス", lat: -28.0023, lon: 153.4145, spread: 0.010 },
      { name: "パース中心部",          lat: -31.9523, lon: 115.8613, spread: 0.010 },
      { name: "ケアンズ",              lat: -16.9203, lon: 145.7710, spread: 0.010 },
    ],
  },
  nz: {
    label: "ニュージーランド", scale: 600,
    mapView: { center: [172.5, -41], zoom: 4.3 },
    seeds: [
      { name: "オークランド・スカイタワー周辺", lat: -36.8485, lon: 174.7633, spread: 0.010 },
      { name: "ウェリントン",         lat: -41.2865, lon: 174.7762, spread: 0.010 },
      { name: "クライストチャーチ",   lat: -43.5321, lon: 172.6362, spread: 0.010 },
      { name: "クイーンズタウン",     lat: -45.0312, lon: 168.6626, spread: 0.010 },
    ],
  },
  br: {
    label: "ブラジル", scale: 1200,
    mapView: { center: [-53, -14], zoom: 3.2 },
    seeds: [
      { name: "リオ・コパカバーナ",   lat: -22.9711, lon: -43.1822, spread: 0.012 },
      { name: "リオ・セントロ",       lat: -22.9068, lon: -43.1729, spread: 0.010 },
      { name: "サンパウロ・パウリスタ通り", lat: -23.5614, lon: -46.6559, spread: 0.010 },
      { name: "ブラジリア",           lat: -15.7975, lon: -47.8919, spread: 0.012 },
      { name: "サルバドール旧市街",   lat: -12.9714, lon: -38.5108, spread: 0.010 },
    ],
  },
};

// 日本の国別シードは japan モードを流用
COUNTRIES.jp.seeds = REGIONS.japan.seeds;

// region 指定からシード配列・スケール・初期表示を取得
// region: "japan" | "world" | "area" | "pref" | "country"
// sub: area/pref/country の各コード
export function resolveRegion(region, sub) {
  if (region === "pref" && sub && PREFECTURES[sub]) {
    return PREFECTURES[sub];
  }
  if (region === "area" && sub && JP_AREAS[sub]) {
    const a = JP_AREAS[sub];
    return {
      label: a.label,
      scale: a.scale,
      mapView: a.mapView,
      seeds: a.prefs.flatMap((p) => PREFECTURES[p].seeds),
    };
  }
  if (region === "country" && sub && COUNTRIES[sub]) {
    return COUNTRIES[sub];
  }
  if (REGIONS[region]) return REGIONS[region];
  return REGIONS.world;
}
