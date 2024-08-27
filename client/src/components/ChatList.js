import React, { useState } from 'react';
import NewChatDialog from './NewChatDialog';
import '../styles/main.css';

function ChatList({ chats, setChats, setSelectedChatId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);

  const handleNewChat = () => {
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditChat = (chat) => {
    setCurrentChat(chat);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSaveChat = (newChat) => {
    if (isEditMode) {
      setChats(chats.map(chat => 
        chat.id === newChat.id ? { ...chat, name: `${newChat.firstName} ${newChat.lastName}` } : chat
      ));
    } else {
      const newChatEntry = {
        id: chats.length + 1,
        name: `${newChat.firstName} ${newChat.lastName}`,
        lastMessage: '',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      setChats([...chats, newChatEntry]);
    }
    setIsDialogOpen(false);
    setCurrentChat(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setCurrentChat(null);
  };

  const handleDeleteChat = (chatId) => {
    const confirmed = window.confirm('Are you sure you want to delete this chat?');
    if (confirmed) {
      setChats(chats.filter(chat => chat.id !== chatId));
    }
  };

  const handleChatClick = (id) => {
    setSelectedChatId(id);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search or start new chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="chat-list-items">
        {filteredChats.map(chat => (
          <div key={chat.id} className="chat-item" onClick={() => handleChatClick(chat.id)}>
            <div className="chat-avatar">
              <img src={`https://i.pravatar.cc/150?img=${chat.id}`} alt={`${chat.name}`} />
            </div>
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-last-message">{chat.lastMessage}</div>
            </div>
            <div className="chat-date">{chat.date}</div>
            <div className="chat-actions">
              <button className="edit-button" onClick={(e) => {e.stopPropagation(); handleEditChat(chat);}}>Edit</button>
              <button className="delete-button" onClick={(e) => {e.stopPropagation(); handleDeleteChat(chat.id);}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="new-chat-button" onClick={handleNewChat}>New Chat</button>
      {isDialogOpen && (
        <NewChatDialog
          onSave={handleSaveChat}
          onCancel={handleCancel}
          isEditMode={isEditMode}
          chat={currentChat}
        />
      )}
    </div>
  );
}

export default ChatList;
