const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Passport Config
require('./config/passport')(passport);

// Routes
app.use('/api/chats', require('./routes/chats'));
app.use('/api/auth', require('./routes/auth'));

// WebSocket Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('new_message', (data) => {
    io.emit('receive_message', data); // Send message to all connected clients
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
