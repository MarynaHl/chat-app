const mongoose = require('mongoose');

// Схема для чату
const ChatSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  status: { type: String, enum: ['active', 'archived'], default: 'active' }, // Додано статус
  createdAt: { type: Date, default: Date.now },
});

// Віртуальне поле для повного імені
ChatSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Додаємо індекс для поля createdAt
ChatSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Chat', ChatSchema);
