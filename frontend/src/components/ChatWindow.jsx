import React from 'react';

const ChatWindow = ({ messages, chatName }) => {
  return (
    <div className="chat-window">
      {/* Виводимо ім'я чату, якщо воно є */}
      <h2>{chatName ? chatName : 'Chat'}</h2>
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
