const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
