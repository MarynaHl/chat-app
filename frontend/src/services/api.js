import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getChats = async () => {
  const response = await axios.get(`${API_BASE_URL}/chats`);
  return response.data;
};

export const getMessages = async (chatId) => {
  const response = await axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);
  return response.data;
};

export const sendMessage = async (chatId, text) => {
  const response = await axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, { text });
  return response.data;
};
