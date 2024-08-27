import React from 'react';
import '../styles/main.css';

function ChatWindow({ chatId }) {
  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <h2>Chat {chatId}</h2>
      </div>
      <div className="chat-window-messages">
        {/* Display messages based on chatId */}
      </div>
      <div className="chat-window-input">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
