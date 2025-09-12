// src/services/axiosConfig.js
import axios from "axios";
import { authService } from "./authService";

// ✅ Set backend base URL
axios.defaults.baseURL = "http://localhost:3000"; 
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const authHeaders = authService.getAuthHeader();
    config.headers = { ...config.headers, ...authHeaders };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.clearAuth();
      window.dispatchEvent(new CustomEvent("auth-logout"));

      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
