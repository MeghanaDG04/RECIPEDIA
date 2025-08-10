// api.js - Centralized API utility functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generic API call handler
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Recipe API functions
export const recipeAPI = {
  // Get all recipes
  getAllRecipes: () => apiCall('/recipes'),
 
  // Get recipe by ID
  getRecipeById: (id) => apiCall(`/recipes/${id}`),

  // Create new recipe
  createRecipe: (recipeData) => apiCall('/recipes', {
    method: 'POST',
    body: JSON.stringify(recipeData),
  }),

  // Update recipe
  updateRecipe: (id, recipeData) => apiCall(`/recipes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(recipeData),
  }),

  // Delete recipe
  deleteRecipe: (id) => apiCall(`/recipes/${id}`, {
    method: 'DELETE',
  }),
   
 

  // Like recipe
  likeRecipe: (id) => apiCall(`/recipes/${id}/like`, {
    method: 'POST',
  }),

  // Add comment to recipe
  addComment: (id, userId, text) => apiCall(`/recipes/${id}/comments`, {
    method: 'POST',
    body: JSON.stringify({ userId, text }),
  }),
};

// User API functions
export const userAPI = {
  // Register user
  register: (userData) => apiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Login user
  login: (email, password) => apiCall('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),

  // Get user profile
  getProfile: (email) => apiCall(`/profile/${email}`),

  // Update user profile
  updateProfile: (email, userData) => apiCall(`/update/${email}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),

  // Delete user account
  deleteAccount: (email) => apiCall(`/delete/${email}`, {
    method: 'DELETE',
  }),

  // Get all users
  getAllUsers: () => apiCall('/users'),
};

// Authentication utilities
export const authUtils = {
  // Store user session (replace with proper auth solution)
  setCurrentUser: (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // Remove user session
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return localStorage.getItem('currentUser') !== null;
  },
};

export default { recipeAPI, userAPI, authUtils };