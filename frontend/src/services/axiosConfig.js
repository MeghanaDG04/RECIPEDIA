// src/services/axiosConfig.js
import axios from 'axios';
import { authService } from './authService';

// CHANGED: Create an Axios instance with the base URL.
// WHY: All API requests will now correctly point to your backend server.
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., 'http://localhost:3000'
});

// Request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    const authHeaders = authService.getAuthHeader();
    // CHANGED: A safer way to merge headers
    if (authHeaders.Authorization) {
      config.headers['Authorization'] = authHeaders.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
instance.interceptors.response.use(
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
        // CHANGED: Use window.location.href for a full page reload to clear all React state
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// CHANGED: Export the configured instance as the default
export default instance;