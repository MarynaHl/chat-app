const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Перевірка та створення початкових чатів
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
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Основні маршрути
app.use('/api', chatRoutes);

// Новий ендпоінт для отримання автовідповіді
app.post('/api/send-message', async (req, res) => {
  const { chatId, message } = req.body;

  try {
    // Зберігаємо повідомлення користувача
    const Message = require('./models/Message');
    const newMessage = new Message({
      chatId: chatId,
      text: message,
      isUser: true,
    });
    await newMessage.save();
    console.log('User message saved:', newMessage);

    // Отримуємо цитату з Quotable API
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data.content;

    // Зберігаємо автовідповідь через 3 секунди
    setTimeout(async () => {
      try {
        const autoReply = new Message({
          chatId: chatId,
          text: quote,
          isUser: false,
        });
        await autoReply.save();
        console.log('Auto-reply saved:', autoReply);

        res.status(200).json({
          userMessage: newMessage,
          autoReply: autoReply,
        });
      } catch (err) {
        console.error('Error saving auto-reply:', err);
        res.status(500).json({ message: 'Error generating auto-reply' });
      }
    }, 3000);
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ message: 'Error processing message' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
