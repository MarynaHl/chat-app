const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

const router = express.Router();

// Отримати список чатів
router.get('/chats', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats' });
  }
});

// Створити новий чат
router.post('/chats', async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const newChat = new Chat({ firstName, lastName });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat' });
  }
});

// Отримати повідомлення для конкретного чату
router.get('/chats/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Відправити повідомлення в конкретний чат
router.post('/chats/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  const { text } = req.body;
  try {
    const newMessage = new Message({ chatId, text, isUser: true });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Видалити чат
router.delete('/chats/:chatId', async (req, res) => {
  const { chatId } = req.params;
  try {
    await Chat.findByIdAndDelete(chatId);
    res.status(200).json({ message: 'Chat deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chat' });
  }
});

module.exports = router;
