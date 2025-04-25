import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL ?? 'https://localhost:7049';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('AXIOS ERROR:', error.response);
      sessionStorage.removeItem('access_token'); // optional: clear token
      window.location.href = '/'; // redirect to login page
    }
    return Promise.reject(error instanceof Error ? error : new Error(error.message ?? 'An unknown error occurred'));
  }
);

export default api;