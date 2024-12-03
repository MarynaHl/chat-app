const mongoose = require('mongoose');

// Схема для повідомлень
const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  text: { type: String, required: true },
  isUser: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }, // Дата створення повідомлення
  isAutoReply: { type: Boolean, default: false }, // Додано поле для позначення автовідповіді
});

// Індекс для оптимізації запитів (необов'язково, але рекомендовано)
MessageSchema.index({ chatId: 1, createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);
