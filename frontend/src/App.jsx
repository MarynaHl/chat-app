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

  return (
    <div className="app">
      <div className="chat-container">
        {/* Список чатів */}
        <div className="chat-list-container">
          <ChatList chats={chats} onSelectChat={handleSelectChat} />
        </div>

        {/* Вікно повідомлень */}
        <div className="chat-window-container">
          <ChatWindow messages={messages} />
        </div>
      </div>

      {/* Форма введення повідомлень */}
      <div className="message-input-container">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {/* Toast-сповіщення про нові повідомлення */}
      <ToastNotification message={toastMessage} />
    </div>
  );
};

export default App;
