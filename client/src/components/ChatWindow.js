import React, { useState } from 'react';
import ChatInput from './ChatInput';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice Freeman', text: 'Hi, how are you?', time: '8/17/2022, 7:43 AM' },
    { id: 2, sender: 'You', text: 'Not bad. What about you?', time: '8/17/2022, 7:45 AM' },
    { id: 3, sender: 'You', text: 'How was your meeting?', time: '8/17/2022, 7:48 AM' },
  ]);

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState('');

  const sendMessage = (messageText) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      text: messageText,
      time: new Date().toLocaleString(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleEdit = (id) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    setEditingMessageId(id);
    setEditText(messageToEdit.text);
  };

  const handleSaveEdit = () => {
    setMessages(messages.map((msg) => 
      msg.id === editingMessageId ? { ...msg, text: editText } : msg
    ));
    setEditingMessageId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{/**/}</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
            <div className="message-content">
              {editingMessageId === msg.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                msg.text
              )}
            </div>
            <div className="message-time">{msg.time}</div>
            {msg.sender === 'You' && editingMessageId !== msg.id && (
              <button onClick={() => handleEdit(msg.id)}>Edit</button>
            )}
            {editingMessageId === msg.id && (
              <>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            )}
          </div>
        ))}
      </div>
      {editingMessageId === null && <ChatInput onSend={sendMessage} />}
    </div>
  );
}

export default ChatWindow;
