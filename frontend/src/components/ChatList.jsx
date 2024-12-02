import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat =>
    `${chat.firstName} ${chat.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDeleteChat = (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteChat(chatId); // Викликаємо API для видалення
    }
  };

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>
            <span onClick={() => onSelectChat(chat.id)}>
              {chat.firstName} {chat.lastName}
            </span>
            <button onClick={() => handleDeleteChat(chat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
