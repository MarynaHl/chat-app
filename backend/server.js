const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
}));
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    const Chat = require('./models/Chat');
    const existingChats = await Chat.find();
    if (existingChats.length === 0) {
      await Chat.insertMany([
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
        { firstName: 'Alice', lastName: 'Johnson' },
      ]);
      console.log('Predefined chats created');
    }
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Підключення маршрутів чату
app.use('/api', chatRoutes);

// Тестовий маршрут для перевірки роботи API
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

// Новий ендпоінт для автовідповіді
app.post('/api/send-message', async (req, res) => {
  const { chatId, message } = req.body;
  try {
    // Створення повідомлення користувача
    const Message = require('./models/Message');
    const userMessage = new Message({ chatId, text: message, isUser: true });
    await userMessage.save();
    console.log('User message saved:', userMessage);

    // Отримання цитати через API для автовідповіді
    const response = await axios.get('https://api.quotable.io/random');
    const autoReplyText = response.data.content;

    // Створення автовідповіді
    const autoReply = new Message({
      chatId,
      text: autoReplyText,
      isUser: false,
      isAutoReply: true, // Додаємо позначку, що це автовідповідь
    });
    await autoReply.save();
    console.log('Auto-reply saved:', autoReply);

    // Відправка обох повідомлень (користувацького та автовідповіді) назад на фронтенд
    res.status(200).json({ userMessage, autoReply });
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ message: 'Error processing message' });
  }
});

// Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
