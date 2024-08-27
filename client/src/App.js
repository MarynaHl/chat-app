import React, { useState } from 'react';
import './ChatApp.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Application</h1>
      </header>
      <div className="chat-container">
        <ChatList onChatSelect={handleChatSelect} />
        <div className="chat-content">
          {selectedChat ? (
            <>
              <ChatWindow chat={selectedChat} />
              <ChatInput chat={selectedChat} />
            </>
          ) : (
            <div className="no-chat-selected">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
