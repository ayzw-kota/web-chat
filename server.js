const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 環境変数からMongoDBの接続URIを取得
const mongoURI = process.env.MONGODB_URI;

// MongoDBに接続
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// メッセージスキーマの定義
const messageSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// WebSocket接続時の処理
wss.on('connection', (ws) => {
    Message.find().then(messages => {
        messages.forEach(message => {
            ws.send(message.content);
        });
    }).catch(err => console.error('Error finding messages:', err));

    // メッセージ受信時、MongoDBに保存
    ws.on('message', (message) => {
        const chatMessage = new Message({ content: message });
        chatMessage.save().then(() => {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }).catch(err => console.error('Error saving message:', err));

        // OpenWeatherMap APIを使用して天気情報を取得
        if (message.startsWith('/weather ')) {
            const city = message.split('/weather ')[1];
            const apiKey = process.env.OPENWEATHERMAP_API_KEY;
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            axios.get(url)
                .then(response => {
                    const weather = response.data;
                    const weatherMessage = `Weather in ${city}: ${weather.weather[0].description}, Temperature: ${weather.main.temp}°C`;
                    ws.send(weatherMessage);
                })
                .catch(error => {
                    ws.send('Could not retrieve weather information.');
                });
        }
    });
});

// メッセージリセット
app.post('/reset', (req, res) => {
    Message.deleteMany({}, (err) => {
        if (err) {
            return res.status(500).send('Failed to reset messages');
        }
        res.send('Messages reset');
    });
});

app.use(express.static('public'));

//サーバ起動
server.listen(3000, () => {
    console.log('Server listen on port 3000');
});
