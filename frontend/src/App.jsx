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
  const [selectedChatName, setSelectedChatName] = useState('');  // Додаємо стан для імені чату

  // Fetch chats when the component is mounted
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

  // Select a chat and load its messages
  const handleSelectChat = async (chatId, chatName) => {
    setSelectedChatId(chatId);
    setSelectedChatName(chatName);  // Оновлюємо ім'я чату
    try {
      console.log(`Fetching messages for chat ID: ${chatId}`);
      const messagesData = await getMessages(chatId);
      console.log('Fetched messages:', messagesData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send a new message in the selected chat
  const handleSendMessage = async (text) => {
    if (selectedChatId) {
      try {
        console.log(`Sending message: "${text}" to chat ID: ${selectedChatId}`);
        const newMessage = await sendMessage(selectedChatId, text);
        console.log('Message sent:', newMessage);

        // Update the message list with the new message
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Fetch the updated messages after 3 seconds to check for new ones
        setTimeout(async () => {
          console.log('Fetching updated messages...');
          const updatedMessages = await getMessages(selectedChatId);
          console.log('Updated messages:', updatedMessages);
          setMessages(updatedMessages);

          const latestMessage = updatedMessages[updatedMessages.length - 1];
          if (!latestMessage.isUser) {
            console.log('Displaying toast message:', latestMessage.text);
            setToastMessage(latestMessage.text);
            setTimeout(() => setToastMessage(null), 3000);  // Hide toast after 3 seconds
          }
        }, 3000);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Create a new chat
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

  // Delete a chat
  const handleDeleteChat = async (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        console.log(`Deleting chat with ID: ${chatId}`);
        await deleteChat(chatId);
        setChats(chats.filter((chat) => chat._id !== chatId));  // Correctly filter by _id
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
        <ChatWindow messages={messages} chatName={selectedChatName} /> {/* Передаємо chatName */}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
      <ToastNotification message={toastMessage} />
    </div>
  );
};

export default App;
