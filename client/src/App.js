import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';
import './styles/main.css';

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    fetch('/api/chats')
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error('Error fetching chats:', err));
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <ChatList chats={chats} setChats={setChats} setSelectedChatId={setSelectedChatId} />
        {selectedChatId && <ChatWindow chatId={selectedChatId} />}
      </div>
    </div>
  );
}

export default App;
