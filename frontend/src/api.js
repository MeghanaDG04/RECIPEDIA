// api.js - Centralized API utility functions (NOW USING AXIOS)
import axios from './services/axiosConfig'; // CHANGED: Import the configured axios instance

// WHY: This entire file now uses your central 'axiosConfig.js'.
// This means every request made from this file will automatically have the
// 'Authorization: Bearer <token>' header attached if the user is logged in.
// It also ensures correct backend route prefixes (e.g., '/auth', '/users') are used.

// --- Auth API functions ---
export const authAPI = {
  // POST /auth/register
  register: (userData) => axios.post('/auth/register', userData).then(res => res.data),

  // POST /auth/login
  login: (email, password) => axios.post('/auth/login', { email, password }).then(res => res.data),
};


// --- Recipe API functions ---
export const recipeAPI = {
  // GET /recipes
  getAllRecipes: () => axios.get('/recipes').then(res => res.data),
 
  // GET /recipes/:id
  getRecipeById: (id) => axios.get(`/recipes/${id}`).then(res => res.data),

  // POST /recipes
  createRecipe: (recipeData) => axios.post('/recipes', recipeData).then(res => res.data),

  // PUT /recipes/:id
  updateRecipe: (id, recipeData) => axios.put(`/recipes/${id}`, recipeData).then(res => res.data),

  // DELETE /recipes/:id
  deleteRecipe: (id) => axios.delete(`/recipes/${id}`).then(res => res.data),
   
  // POST /recipes/:id/like
  likeRecipe: (id) => axios.post(`/recipes/${id}/like`).then(res => res.data),

  // POST /recipes/:id/comments
  addComment: (id, userId, text) => axios.post(`/recipes/${id}/comments`, { userId, text }).then(res => res.data),
};


// --- User API functions ---
export const userAPI = {
  // GET /users/profile (CHANGED from email in param)
  getProfile: () => axios.get(`/users/profile`).then(res => res.data),

  // PUT /users/profile (CHANGED from email in param)
  updateProfile: (userData) => axios.put(`/users/profile`, userData).then(res => res.data),

  // DELETE /users/profile (CHANGED from email in param)
  deleteAccount: () => axios.delete(`/users/profile`).then(res => res.data),

  // GET /users (Assuming this is an admin route)
  getAllUsers: () => axios.get('/users').then(res => res.data),
};

// WHY: The 'authUtils' section was removed from this file.
// Its functions (setCurrentUser, getCurrentUser) duplicated the logic already present in
// 'src/services/authService.js' and used 'localStorage' while the rest of the app
// correctly uses 'sessionStorage'. Removing this duplication prevents bugs and confusion.