const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get all chats
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new chat
router.post('/', async (req, res) => {
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
});

// Update existing chat
router.put('/:id', async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true });
    if (!updatedChat) return res.status(404).json({ message: 'Chat not found' });
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a chat
router.delete('/:id', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    await chat.remove();
    res.json({ message: 'Chat deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
