# ベースイメージを指定
FROM oven/bun:1

# 作業ディレクトリを指定
WORKDIR /app

# package.json と bun.lock をコピー
COPY package.json bun.lock ./

# 依存関係をインストール
RUN bun install --frozen-lockfile

# アプリケーションのソースコードをコピー
COPY . .

# 開発用サーバーを起動するコマンド
CMD ["bun", "run", "dev"]
