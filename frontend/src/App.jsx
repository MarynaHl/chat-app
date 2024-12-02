import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ToastNotification from './components/ToastNotification';
import { getChats, getMessages, sendMessage, deleteChat, createChat } from './services/api';
import './App.css';

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatsData = await getChats();
        setChats(chatsData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    try {
      const messagesData = await getMessages(chatId);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (text) => {
    if (selectedChatId) {
      try {
        const newMessage = await sendMessage(selectedChatId, text);
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setTimeout(async () => {
          const updatedMessages = await getMessages(selectedChatId);
          setMessages(updatedMessages);

          const latestMessage = updatedMessages[updatedMessages.length - 1];
          if (!latestMessage.isUser) {
            setToastMessage(latestMessage.text);
            setTimeout(() => setToastMessage(null), 3000);
          }
        }, 3000);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleCreateChat = async () => {
    const firstName = prompt('Enter first name:');
    const lastName = prompt('Enter last name:');
    if (firstName && lastName) {
      try {
        const newChat = await createChat(firstName, lastName);
        setChats([...chats, newChat]);
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
  };

  const handleDeleteChat = async (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        await deleteChat(chatId);
        setChats(chats.filter((chat) => chat.id !== chatId));
        if (chatId === selectedChatId) {
          setSelectedChatId(null);
          setMessages([]);
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
      }
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <ChatList
          chats={chats}
          onSelectChat={handleSelectChat}
          onCreateChat={handleCreateChat}
          onDeleteChat={handleDeleteChat}
        />
        <ChatWindow messages={messages} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
      <ToastNotification message={toastMessage} />
    </div>
  );
};

export default App;
