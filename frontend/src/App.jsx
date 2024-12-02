import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ToastNotification from './components/ToastNotification';
import { getChats, getMessages, sendMessage } from './services/api';
import './App.css'; // Імпортуємо стилі

const App = () => {
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

        // Показати сповіщення через 3 секунди після авто-відповіді
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

  // Видалення чату
  const handleDeleteChat = (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      setChats(chats.filter(chat => chat.id !== chatId)); // Видалення чату з локального стану
      if (chatId === selectedChatId) {
        setSelectedChatId(null); // Скидаємо вибір чату, якщо він видалений
        setMessages([]); // Очищаємо повідомлення, якщо чат видалено
      }
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        {/* Список чатів */}
        <ChatList chats={chats} onSelectChat={handleSelectChat} deleteChat={handleDeleteChat} />
        
        {/* Вікно повідомлень */}
        <ChatWindow messages={messages} />
      </div>

      {/* Форма введення повідомлень */}
      <MessageInput onSendMessage={handleSendMessage} />

      {/* Toast-сповіщення про нові повідомлення */}
      <ToastNotification message={toastMessage} />
    </div>
  );
};

export default App;
