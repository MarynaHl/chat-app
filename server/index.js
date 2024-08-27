const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const quoteService = require('./services/quoteService'); //сервіс цитат
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


app.use(cors());
app.use(express.json());

// Перевірка, чи завантажується
console.log('Mongo URI:', process.env.MONGODB_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/chats', require('./routes/chats'));
app.use('/api/auth', require('./routes/auth'));

// WebSocket Logic
io.on('connection', (socket) => {


  socket.on('send_message', async (data) => {
    // Додаємо логіку авто-респонсу при отриманні нового повідомлення
    const autoReply = await quoteService.getRandomQuote(); // Отримуємо цитату
    io.emit('receive_message', { content: autoReply, sender: 'bot', chatId: data.chatId }); // Відправляємо цитату всім клієнтам
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
