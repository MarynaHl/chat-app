import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat, onDeleteChat, onCreateChat, selectedChatId }) => {
  const [search, setSearch] = useState('');

  // Фільтруємо чати по введеному тексту
  const filteredChats = chats.filter(
    (chat) => `${chat.firstName} ${chat.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  // Знаходимо вибраний чат
  const selectedChat = chats.find(chat => chat._id === selectedChatId);

  return (
    <div className="chat-list">
      {/* Заголовок, який залежить від вибраного чату */}
      <h2>{selectedChat ? `Chat with ${selectedChat.firstName} ${selectedChat.lastName}` : 'Chats'}</h2>
      
      {/* Пошукове поле */}
      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* Список чатів */}
      <ul>
        {filteredChats.map((chat) => (
          <li key={chat._id} onClick={() => onSelectChat(chat._id, chat.firstName + ' ' + chat.lastName)}>
            {chat.firstName} {chat.lastName}
            <button onClick={(e) => {
              e.stopPropagation();  // Запобігаємо виклику onSelectChat
              onDeleteChat(chat._id);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onCreateChat}>Add New Chat</button>
    </div>
  );
};

export default ChatList;
