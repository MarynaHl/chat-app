import React from 'react';

const ChatWindow = ({ messages, chatName }) => {
  return (
    <div className="chat-window">
      {/* Виводимо ім'я чату або користувача */}
      <h2>{chatName ? `Chat with ${chatName}` : 'Chat'}</h2>  {/* Відображаємо ім'я користувача */}
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
