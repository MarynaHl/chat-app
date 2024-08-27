import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import NewChatDialog from './components/NewChatDialog';
import Header from './components/Header';
import './styles/main.css';

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSocketEnabled, setIsSocketEnabled] = useState(false);

  useEffect(() => {
    fetch('/api/chats')
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error('Error fetching chats:', err));
  }, []);

  const toggleSocket = () => {
    setIsSocketEnabled(!isSocketEnabled);
    // Логіка підключення WebSocket
  };

  return (
    <div className="app">
      <Header toggleSocket={toggleSocket} />
      <ChatList chats={chats} setSelectedChat={setSelectedChat} />
      {selectedChat && <ChatWindow chat={selectedChat} />}
      {isDialogOpen && <NewChatDialog setIsDialogOpen={setIsDialogOpen} />}
    </div>
  );
}

export default App;
