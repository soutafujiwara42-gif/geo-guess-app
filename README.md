# 🌍 街並みあてゲーム（GeoGuess）

GeoGuessr 風の「街並みの写真から場所を当てる」ゲームです。
すべて **無料サービス** で構成しています。

## 🚀 2つの公開版

| 版 | URL | 特徴 |
|----|-----|------|
| **GitHub Pages（静的版・推奨）** | https://soutafujiwara42-gif.github.io/geo-guess-app/ | サーバー不要・常に即起動。`docs/` フォルダ |
| **Render（動的版）** | https://geo-guess-app.onrender.com | トークンをサーバーで秘匿。無料プランのためスリープあり（初回約50秒） |

静的版は Mapillary の Client Token（クライアント埋め込み前提・読み取り専用）を
`docs/app.js` に直接記載しています。main ブランチに push すると GitHub Actions が
自動で Pages にデプロイします（`.github/workflows/pages.yml`）。

| 役割 | 使用サービス |
|------|--------------|
| 街並み画像 | [Mapillary](https://www.mapillary.com/)（オープンライセンス・25億枚超） |
| 推測用の地図 | [MapLibre GL JS](https://maplibre.org/) + [OpenFreeMap](https://openfreemap.org/) タイル |
| 配信ホスティング | [Render](https://render.com/)（無料プラン） |
| ソース管理 | GitHub |

## 🎮 遊び方

1. 出題エリア（関東／日本／国別／世界中）と制限時間を選んでスタート
2. 表示された街並み写真を見て、右下の地図にピンを刺す
3. 「ここに決定」で正解地点との距離からスコア化（1ラウンド最大5000点）
4. 全5ラウンドの合計点（最大25000点）を競う

---

## 🛠 セットアップ手順

### 1. Mapillary のアクセストークンを取得（無料）

1. [Mapillary](https://www.mapillary.com/) にサインアップ
2. [Developer ダッシュボード](https://www.mapillary.com/dashboard/developers) を開く
3. 「Register Application」でアプリを登録（用途は任意）
4. 発行された **Client Token**（`MLY|xxxx|yyyy` 形式）をコピー

### 2. GitHub にプッシュ

```bash
cd 地図アプリゲーム
git init
git add .
git commit -m "GeoGuess: 街並みあてゲーム 初回コミット"
git branch -M main
# GitHub で空のリポジトリを作成しておく
git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
git push -u origin main
```

### 3. Render でデプロイ

**方法A：render.yaml で自動（推奨）**

1. [Render](https://dashboard.render.com/) にログイン → 「New +」→「Blueprint」
2. 上記の GitHub リポジトリを選択（`render.yaml` を自動検出）
3. 環境変数 `MAPILLARY_TOKEN` に手順1のトークンを入力
4. 「Apply」でデプロイ完了。発行された URL でプレイできます

**方法B：手動で Web Service 作成**

1. 「New +」→「Web Service」→ GitHub リポジトリを選択
2. 設定：
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. 「Environment」タブで環境変数を追加：
   - `MAPILLARY_TOKEN` = 取得したトークン
4. 「Create Web Service」

> ⚠️ Render 無料プランは一定時間アクセスがないとスリープします。
> 初回アクセス時に起動まで数十秒かかることがあります。

---

## 💻 ローカルで動かす場合（任意）

Node.js 18 以上が必要です（未インストールなら [nodejs.org](https://nodejs.org/) から）。

```bash
# .env を作成してトークンを設定
cp .env.example .env
# .env を編集して MAPILLARY_TOKEN を入れる

npm install
npm start
# http://localhost:3000 を開く
```

---

## 📁 構成

```
地図アプリゲーム/
├── server.js         … Express サーバー（Mapillary API プロキシ＋出題ロジック）
├── regions.js        … 出題エリア・国別のシード都市データ
├── package.json
├── render.yaml       … Render デプロイ設定
├── .env.example      … 環境変数のサンプル
└── public/
    ├── index.html    … 画面
    ├── style.css     … スタイル
    └── app.js        … ゲームロジック（MapLibre 地図・スコア計算）
```

## 🔧 カスタマイズ

- **出題地点を増やす**: `regions.js` の `seeds` に `{ name, lat, lon, spread }` を追加
- **スコアの厳しさ**: 各エリアの `scale`（小さいほど距離にシビア）を調整
- **ラウンド数**: `public/app.js` の `TOTAL_ROUNDS`

## 📝 ライセンス

MIT。Mapillary 画像は各画像のライセンス（多くは CC-BY-SA）に従います。
OpenFreeMap / OpenStreetMap データは ODbL に従います。
