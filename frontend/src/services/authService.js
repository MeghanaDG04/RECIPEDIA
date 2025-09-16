// src/services/authService.js
export const authService = {
  // Get auth token from sessionStorage
  getToken() {
    return sessionStorage.getItem('token');
  },

  // Get user data from sessionStorage
getUser() {
  const userStr = sessionStorage.getItem('user');
  if (!userStr || userStr === 'undefined' || userStr === 'null' || userStr.trim() === '') {
    return null;
  }
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error('Parsing user failed:', e, userStr);
    return null;
  }
},


  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  },

  // Get auth headers for API requests
  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Store auth data
  setAuth(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  },

  // Clear auth data (logout)
  clearAuth() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },

  // Get username
  getUsername() {
    const user = this.getUser();
    return user ? user.username : '';
  }
};