import React from 'react';


const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {chat.firstName} {chat.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
