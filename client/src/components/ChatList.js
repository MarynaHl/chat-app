import React from 'react';

function ChatList({ chats, setSelectedChat }) {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat._id} onClick={() => setSelectedChat(chat)} className="chat-item">
          <p>{chat.firstName} {chat.lastName}</p>
          <p>Last message: {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : 'No messages yet'}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
