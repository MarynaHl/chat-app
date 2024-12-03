const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const axios = require('axios');
const router = express.Router();

// Отримати всі чати
router.get('/chats', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    console.error('Error fetching chats:', err);
    res.status(500).json({ message: 'Error fetching chats' });
  }
});

// Створити новий чат
router.post('/chats', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newChat = new Chat({ firstName, lastName });
    await newChat.save();
    res.json(newChat);
  } catch (err) {
    console.error('Error creating chat:', err);
    res.status(400).json({ message: 'Error creating chat' });
  }
});

// Отримати всі повідомлення для чату
router.get('/chats/:id/messages', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.id }).sort({ createdAt: 1 }); // Сортування за датою
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Відправити нове повідомлення
router.post('/chats/:id/messages', async (req, res) => {
  try {
    const { text, isUser } = req.body;

    // Зберігаємо повідомлення користувача
    const newMessage = new Message({ chatId: req.params.id, text, isUser });
    await newMessage.save();
    console.log('User message saved:', newMessage);

    res.json(newMessage); // Надсилаємо відповідь про збережене повідомлення користувача

    // Генеруємо цитату через 3 секунди
    if (isUser) {
      setTimeout(async () => {
        try {
          const response = await axios.get('https://api.quotable.io/random');
          const autoReply = new Message({
            chatId: req.params.id,
            text: response.data.content,
            isUser: false,
          });
          await autoReply.save();
          console.log('Auto-reply saved:', autoReply);
        } catch (err) {
          console.error('Error generating auto-reply:', err);
        }
      }, 3000);
    }
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(400).json({ message: 'Error sending message' });
  }
});

// Видалення чату
router.delete('/chats/:id', async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ chatId: req.params.id });
    res.json({ message: 'Chat deleted' });
  } catch (err) {
    console.error('Error deleting chat:', err);
    res.status(500).json({ message: 'Error deleting chat' });
  }
});

module.exports = router;
