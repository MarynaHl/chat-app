import React from 'react';
import './App.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      <h2>Chat</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
