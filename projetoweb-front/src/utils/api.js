import axios from 'axios';
import { getAuthToken, setAuthToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL_ADMIN || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Token inválido ou expirado. Redirecionando para o login.');
      setAuthToken(null);
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;