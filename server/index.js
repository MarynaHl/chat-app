const dotenv = require('dotenv'); // Спочатку імпортуйте dotenv
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const quoteService = require('./services/quoteService'); //сервіс цитат

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


app.use(cors());
app.use(express.json());

// Перевірка, чи завантажується MONGO_URI
console.log('Mongo URI:', process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/chats', require('./routes/chats'));
app.use('/api/auth', require('./routes/auth'));

// WebSocket Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send_message', async (data) => {
    // Додаємо логіку авто-респонсу при отриманні нового повідомлення
    const autoReply = await quoteService.getRandomQuote(); // Отримуємо цитату
    io.emit('receive_message', { content: autoReply, sender: 'bot', chatId: data.chatId }); // Відправляємо цитату всім клієнтам
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
