import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Отримати список чатів
export const getChats = async () => {
  const response = await axios.get(`${API_BASE_URL}/chats`);
  return response.data;
};

// Створити новий чат
export const createChat = async (firstName, lastName) => {
  const response = await axios.post(`${API_BASE_URL}/chats`, { firstName, lastName });
  return response.data;
};

// Оновити чат
export const updateChat = async (chatId, firstName, lastName) => {
  const response = await axios.put(`${API_BASE_URL}/chats/${chatId}`, { firstName, lastName });
  return response.data;
};

// Отримати повідомлення для певного чату
export const getMessages = async (chatId) => {
  const response = await axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);
  return response.data;
};

// Відправити нове повідомлення
export const sendMessage = async (chatId, text) => {
  const response = await axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, { text });
  return response.data;
};

// Видалити чат
export const deleteChat = async (chatId) => {
  await axios.delete(`${API_BASE_URL}/chats/${chatId}`);
};
