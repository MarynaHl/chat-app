const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  messages: [
    {
      content: { type: String, required: true },
      sender: { type: String, required: true }, // 'user' or 'bot'
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Chat', ChatSchema);
