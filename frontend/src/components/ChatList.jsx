import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat, onDeleteChat, onCreateChat }) => {
  const [search, setSearch] = useState('');

  const filteredChats = chats.filter((chat) =>
    `${chat.firstName} ${chat.lastName}`.toLowerCase().includes(search.toLowerCase())
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
        {filteredChats.map((chat) => (
          <li key={chat._id} onClick={() => onSelectChat(chat._id)}>
            {chat.firstName} {chat.lastName}
            <button onClick={(e) => {
              e.stopPropagation();
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
