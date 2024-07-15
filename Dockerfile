# ベースイメージとしてNode.jsを使用
FROM node:20

# 作業ディレクトリを作成
WORKDIR /app

# パッケージマネージャーのキャッシュを利用するため、パッケージファイルのみをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# NODE_ENVを設定
ENV NODE_ENV docker

# コンテナが実行するコマンドを指定
CMD ["npm", "start"]

# EXPOSEはコンテナが使用するポートを指定（オプション）
EXPOSE 3000
