import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ToastNotification from './components/ToastNotification';
import { getChats, getMessages, sendMessage } from './services/api';

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    // Завантаження списку чатів при першому завантаженні
    const fetchChats = async () => {
      const chats = await getChats();
      setChats(chats);
    };
    fetchChats();
  }, []);

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    const messages = await getMessages(chatId);
    setMessages(messages);
  };

  const handleSendMessage = async (text) => {
    if (selectedChatId) {
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
    }
  };

  return (
    <div className="app">
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      <ChatWindow messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
      <ToastNotification message={toastMessage} />
    </div>
  );
};

export default App;
