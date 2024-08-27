import React from 'react';
import '../styles/main.css';

function ChatList({ chats, setSelectedChat }) {
  return (
    <div className="chat-list">
      <input type="text" placeholder="Search or start new chat" />
      <ul>
        {chats.map(chat => (
          <li key={chat.id} className="chat-item" onClick={() => setSelectedChat(chat)}>
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-last-message">{chat.lastMessage}</div>
            </div>
            <div className="chat-date">{chat.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
