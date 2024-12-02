const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  text: { type: String, required: true },
  isUser: { type: Boolean, default: true },  // Якщо true, це повідомлення від користувача
  isAutoReply: { type: Boolean, default: false },  // Якщо true, це автоматична відповідь
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
