import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ToastNotification from './components/ToastNotification';
import { getChats, getMessages, sendMessage } from './services/api';
import './App.css';

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Завантаження списку чатів при першому рендері
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

  // Обробка вибору чату
  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    try {
      const messagesData = await getMessages(chatId);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Надсилання повідомлення
  const handleSendMessage = async (text) => {
    if (selectedChatId) {
      try {
        const newMessage = await sendMessage(selectedChatId, text);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="app">
      {/* Список чатів */}
      <ChatList chats={chats} onSelectChat={handleSelectChat} />

      {/* Вікно повідомлень */}
      <ChatWindow messages={messages} />

      {/* Форма введення повідомлень */}
      <MessageInput onSendMessage={handleSendMessage} />

      {/* Toast-сповіщення про нові повідомлення */}
      <ToastNotification message={toastMessage} />
    </div>
  );
}

export default App;
