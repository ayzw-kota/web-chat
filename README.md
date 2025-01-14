# web-chat

このアプリケーションは、WebSocket、Node.js、Express、MongoDB、OpenWeatherMap APIを使用して構築されたシンプルなチャットアプリケーションです。ユーザーはリアルタイムでメッセージを送受信でき、特定の都市の天気情報を取得することができます。また、チャット履歴を削除する機能も提供されています。

## 機能

- **リアルタイムメッセージ**: WebSocketを使用して、ユーザーはメッセージを即時に送受信できます。
- **メッセージの永続化**: メッセージはMongoDBに保存され、ユーザーが接続した際に読み込まれます。
- **天気情報**: `/weather` コマンドを使用して、特定の都市の現在の天気情報を取得できます。
- **チャット履歴の削除**: サーバーに対してリクエストを送ることで、保存されたチャット履歴を削除することができます。

## ファイル概要

- **`index.html`**: チャットインターフェースの構造を定義するメインHTMLファイル。
- **`styles.css`**: チャットインターフェースをスタイリングするCSSファイル。
- **`script.js`**: WebSocket通信を処理するクライアントサイドのJavaScriptファイル。
- **`server.js`**: WebSocket接続、MongoDBとのやり取り、天気APIの呼び出し、およびチャット履歴の削除を処理するサーバーサイドのNode.jsスクリプト。
- **`.env`**: 環境変数ファイル（このリポジトリには含まれていません）。

## セットアップ手順

1. **リポジトリをクローン**:
    ```bash
    git clone <リポジトリのURL>
    cd <リポジトリ名>
    ```

2. **依存関係をインストール**:
    ```bash
    npm install
    ```

3. **環境変数を設定**:
    ルートディレクトリに `.env` ファイルを作成し、以下の変数を追加します:
    ```plaintext
    MONGODB_URI=あなたのMongoDB接続URI
    OPENWEATHERMAP_API_KEY=あなたのOpenWeatherMap APIキー
    ```

4. **サーバーを起動**:
    ```bash
    node server.js
    ```
    サーバーは `http://localhost:3000` で起動します。

5. **チャットアプリケーションにアクセス**:
    ブラウザを開き、`http://localhost:3000` にアクセスしてください。

## 使用方法

- **メッセージを送信**: 入力ボックスにメッセージを入力し、「送信」をクリックするか、Enterキーを押してください。
- **天気情報を取得**: `/weather <都市名>` と入力して、特定の都市の天気情報を取得します。
- **チャット履歴の削除**: POSTリクエストを `/reset` エンドポイントに送ることで、保存されているすべてのメッセージを削除できます。この操作は、サーバー側でMongoDBに保存されたメッセージを完全に消去します。

## API

- **`/reset`**: MongoDBに保存されたメッセージをリセット（削除）するためのPOSTエンドポイント。

## 依存関係

- **Node.js**: JavaScriptランタイム
- **Express**: Node.js用のWebフレームワーク
- **WebSocket**: WebSocket接続用ライブラリ
- **Mongoose**: MongoDBオブジェクトモデリングツール
- **Axios**: PromiseベースのHTTPクライアント

