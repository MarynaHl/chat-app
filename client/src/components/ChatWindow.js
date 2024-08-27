import React, { useState } from 'react';

function ChatWindow({ chat }) {
  const [messages, setMessages] = useState(chat.messages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages, { content: newMessage, sender: 'user' }];
      setMessages(updatedMessages);

      // Відправка повідомлення на сервер
      const response = await fetch(`/api/chats/${chat._id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage })
      });

      const autoReply = await response.json();
      setMessages([...updatedMessages, { content: autoReply.content, sender: 'bot' }]);
    }
    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatWindow;
