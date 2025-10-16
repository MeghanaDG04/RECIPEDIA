// src/services/recipeService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRecipes = async () => {
  const response = await fetch(`${API_BASE_URL}/recipes`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : (data.recipes || []);
};

export const addRecipe = async (recipeData) => {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authService.getAuthHeader()
    },
    body: JSON.stringify(recipeData)
  });
  if (response.status === 401) {
    throw new Error('Session expired. Please log in again.');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add recipe');
  }
  const result = await response.json();
  return result.recipe;
};

export const updateRecipe = async (id, recipeData) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authService.getAuthHeader()
    },
    body: JSON.stringify(recipeData)
  });
  if (response.status === 401) {
    throw new Error('Session expired. Please log in again.');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update recipe');
  }
  const result = await response.json();
  return result.recipe;
};

export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: authService.getAuthHeader()
  });
  if (response.status === 401) {
    throw new Error('Session expired. Please log in again.');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete recipe');
  }
};

export const likeRecipe = async (id) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}/like`, {
    method: 'POST',
    headers: authService.getAuthHeader()
  });
  if (response.status === 401) {
    throw new Error('Session expired. Please log in again.');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to like recipe');
  }
  const result = await response.json();
  return result.likes;
};

export const addComment = async (recipeId, commentText) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authService.getAuthHeader()
    },
    body: JSON.stringify({ text: commentText.trim() })
  });
  if (response.status === 401) {
    throw new Error('Session expired. Please log in again.');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add comment');
  }
  const result = await response.json();
  return result.recipe;
};
