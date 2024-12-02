const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const axios = require('axios');
const router = express.Router();

// Отримати всі чати
router.get('/chats', async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
});

// Створити новий чат
router.post('/chats', async (req, res) => {
  const { firstName, lastName } = req.body;
  const newChat = new Chat({ firstName, lastName });
  await newChat.save();
  res.json(newChat);
});

// Отримати всі повідомлення для чату
router.get('/chats/:id/messages', async (req, res) => {
  const messages = await Message.find({ chatId: req.params.id });
  res.json(messages);
});

// Відправити нове повідомлення
router.post('/chats/:id/messages', async (req, res) => {
  const { text, isUser } = req.body;
  const newMessage = new Message({ chatId: req.params.id, text, isUser });
  await newMessage.save();

  // Якщо повідомлення від користувача, генеруємо відповідь
  if (isUser) {
    setTimeout(async () => {
      const response = await axios.get('https://api.quotable.io/random');
      const autoReply = new Message({
        chatId: req.params.id,
        text: response.data.content,
        isUser: false,
      });
      await autoReply.save();
    }, 3000); // Затримка у 3 секунди
  }

  res.json(newMessage);
});

// Видалення чату
router.delete('/chats/:id', async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id);
  await Message.deleteMany({ chatId: req.params.id });
  res.json({ message: 'Chat deleted' });
});

module.exports = router;
