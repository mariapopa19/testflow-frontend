import axios from 'axios';
import { showToast } from '../utils/toastHelper';
import toastMessages from '../constants/toastMessages';

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
      sessionStorage.removeItem('access_token'); 
      window.location.href = '/';
    }
    return Promise.reject(error instanceof Error ? error : new Error(error.message ?? 'An unknown error occurred'));
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized - User session expired or invalid
        sessionStorage.removeItem('access_token');
        showToast(toastMessages.auth.unauthorized);
        window.location.href = '/signin';
      } else if (status === 404) {
        // Not Found
        window.location.href = '/404';
      } else if (status === 500) {
        // Internal Server Error
        window.location.href = '/500';
      }
    }
    
    // For other errors (like 400), we let the component's catch block handle it
    return Promise.reject(error instanceof Error ? error : new Error(error.message ?? 'An unknown error occurred'));
  }
);

export default api;