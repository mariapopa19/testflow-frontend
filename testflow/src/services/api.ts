import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL ?? 'https://localhost:7049';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;