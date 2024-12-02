import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat, onDeleteChat, onCreateChat }) => {
  const [search, setSearch] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredChats.map(chat => (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {chat.title}
            <button onClick={(e) => {
              e.stopPropagation();
              onDeleteChat(chat.id);
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
