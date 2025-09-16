
import axios from 'axios';
import { authService } from './authService';


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', 
  withCredentials: true, 
});


instance.interceptors.request.use(
  (config) => {
    const authHeaders = authService.getAuthHeader();
    if (authHeaders.Authorization) {
      config.headers['Authorization'] = authHeaders.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.clearAuth();
      window.dispatchEvent(new CustomEvent('auth-logout'));

      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

