const Chat = require('../models/Chat');
const quoteService = require('../services/quoteService');

// Отримати всі чати
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Створити новий чат
const createChat = async (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First and last names are required' });
  }

  try {
    const newChat = new Chat({ firstName, lastName, messages: [] });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Відправити повідомлення і отримати авто-респонс
const sendMessage = async (req, res) => {
  const { content } = req.body;
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    // Додаємо повідомлення користувача
    chat.messages.push({ content, sender: 'user' });

    // Отримуємо випадкову цитату для авто-респонсу
    const autoReply = await quoteService.getRandomQuote();

    // Додаємо авто-відповідь
    chat.messages.push({ content: autoReply, sender: 'bot' });
    await chat.save();

    res.json({ content: autoReply });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Оновити існуючий чат
const updateChat = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true });
    if (!updatedChat) return res.status(404).json({ message: 'Chat not found' });
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Видалити чат
const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    await chat.remove();
    res.json({ message: 'Chat deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllChats,
  createChat,
  sendMessage,
  updateChat,
  deleteChat,
};
