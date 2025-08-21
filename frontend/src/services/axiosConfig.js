// src/services/axiosConfig.js - Axios interceptor for automatic token handling
import axios from 'axios';
import { authService } from './authService';

// Request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    const authHeaders = authService.getAuthHeader();
    config.headers = { ...config.headers, ...authHeaders };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      authService.clearAuth();
      
      // Trigger a custom event to notify the app about logout
      window.dispatchEvent(new CustomEvent('auth-logout'));
      
      // Redirect to login only if not already on login/register page
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axios;