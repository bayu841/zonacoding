import axios from 'axios';
import { getCookie, removeCookie } from '../utils/cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // Prioritize token from Cookie for security
    const token = getCookie('token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized: Clear all storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      removeCookie('token');
      
      // Optional: Optional redirect to login can be handled by router guards
    }
    return Promise.reject(error);
  }
);

export default api;
