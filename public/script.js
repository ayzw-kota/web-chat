// WebSocketの接続を作成
const ws = new WebSocket('ws://localhost:3000');
//DOM要素の取得
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// サーバーからのメッセージを受信
ws.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = event.data;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};

// メッセージ送信ボタンのクリックイベント
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        ws.send(message);
        messageInput.value = '';
    }
});
