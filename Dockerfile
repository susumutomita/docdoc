# ベースイメージを指定
FROM node:18.20.8

# 作業ディレクトリを指定
WORKDIR /app

# package.json と yarn.lockをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# 開発用サーバーを起動するコマンド
CMD ["npm", "run", "dev"]
