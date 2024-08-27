const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const Chat = require('../models/Chat');
const axios = require('axios');

// Використовуємо chatController для обробки маршрутів
router.post('/', chatController.createChat);
router.put('/:id', chatController.updateChat);
router.delete('/:id', chatController.deleteChat);
router.get('/', chatController.getAllChats);

// Додаткові маршрути
router.post('/:id/message', async (req, res) => {
  const { content } = req.body;
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    chat.messages.push({ content, sender: 'user' });

    // Отримати цитату через Quotable API
    const quoteResponse = await axios.get('https://api.quotable.io/random');
    const autoReply = quoteResponse.data.content;

    chat.messages.push({ content: autoReply, sender: 'bot' });
    await chat.save();

    res.json({ content: autoReply });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
