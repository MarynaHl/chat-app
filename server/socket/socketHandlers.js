module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('new_message', (data) => {
      io.emit('receive_message', data); // Розсилаємо повідомлення всім підключеним клієнтам
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
