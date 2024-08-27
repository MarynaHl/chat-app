import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './styles/main.css';

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    // Fetch chats from backend
    fetch('/api/chats')
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error('Error fetching chats:', err));
  }, []);

  return (
    <div className="app">
      <ChatList chats={chats} setSelectedChat={setSelectedChat} />
      {selectedChat && <ChatWindow chat={selectedChat} />}
    </div>
  );
}

export default App;
