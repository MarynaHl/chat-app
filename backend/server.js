const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');  // Додаємо axios для запитів до Quotable API
require('dotenv').config();

const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    
    // Перевірка наявності початкових чатів і їх створення
    const Chat = require('./models/Chat');
    const existingChats = await Chat.find();
    if (existingChats.length === 0) {
      await Chat.insertMany([
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
        { firstName: 'Alice', lastName: 'Johnson' }
      ]);
      console.log('Predefined chats created');
    }
  })
  .catch(err => console.error(err));

app.use('/api', chatRoutes);

// Новий endpoint для відправки повідомлення та отримання автоматичної відповіді
app.post('/send-message', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Отримуємо цитату з Quotable API
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data.content;
    
    // Відправляємо цитату як автоматичну відповідь через 3 секунди
    setTimeout(() => {
      res.json({
        quote: quote,
        userMessage: userMessage,
      });
    }, 3000); // Відповідь через 3 секунди

  } catch (error) {
    res.status(500).send('Error fetching quote');
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
