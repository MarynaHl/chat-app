import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ToastNotification from './components/ToastNotification';
import { getChats, getMessages, sendMessage, deleteChat, createChat } from './services/api';
import './App.css';

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null); // Вибраний чат
  const [messages, setMessages] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState('');  // Стан для зберігання імені чату

  // Завантажуємо чати при завантаженні компонента
  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log('Fetching chats...');
        const chatsData = await getChats();
        console.log('Fetched chats:', chatsData);
        setChats(chatsData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  // Вибір чату та завантаження його повідомлень
  const handleSelectChat = async (chatId, chatName) => {
    setSelectedChatId(chatId);  // Зберігаємо ID вибраного чату
    setSelectedChatName(chatName);  // Зберігаємо ім'я вибраного чату
    try {
      console.log(`Fetching messages for chat ID: ${chatId}`);
      const messagesData = await getMessages(chatId);
      console.log('Fetched messages:', messagesData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Відправка нового повідомлення
  const handleSendMessage = async (text) => {
    if (selectedChatId) {
      try {
        console.log(`Sending message: "${text}" to chat ID: ${selectedChatId}`);
        const newMessage = await sendMessage(selectedChatId, text);
        console.log('Message sent:', newMessage);

        // Оновлюємо список повідомлень
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Оновлюємо повідомлення через 3 секунди (відповідь від сервера з цитатою)
        setTimeout(async () => {
          console.log('Fetching updated messages...');
          const updatedMessages = await getMessages(selectedChatId);
          console.log('Updated messages:', updatedMessages);
          setMessages(updatedMessages);

          const latestMessage = updatedMessages[updatedMessages.length - 1];
          if (!latestMessage.isUser) {
            console.log('Displaying toast message:', latestMessage.text);
            setToastMessage(latestMessage.text);
            setTimeout(() => setToastMessage(null), 3000);  // Сховати toast після 3 секунд
          }
        }, 3000);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Створення нового чату
  const handleCreateChat = async () => {
    const firstName = prompt('Enter first name:');
    const lastName = prompt('Enter last name:');
    if (firstName && lastName) {
      try {
        console.log(`Creating new chat with name: ${firstName} ${lastName}`);
        const newChat = await createChat(firstName, lastName);
        console.log('New chat created:', newChat);
        setChats([...chats, newChat]);
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
  };

  // Видалення чату
  const handleDeleteChat = async (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        console.log(`Deleting chat with ID: ${chatId}`);
        await deleteChat(chatId);
        setChats(chats.filter((chat) => chat._id !== chatId));  // Видаляємо чат за ID
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
          onSelectChat={handleSelectChat}  // Передаємо ID чату та ім'я
          onCreateChat={handleCreateChat}
          onDeleteChat={handleDeleteChat}
          selectedChatId={selectedChatId}  // Передаємо ID вибраного чату
        />
        {/* Тепер передаємо selectedChatName в ChatWindow */}
        <ChatWindow messages={messages} chatName={selectedChatName} />  
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
      <ToastNotification message={toastMessage} />
    </div>
  );
};

export default App;
