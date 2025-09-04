import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaHeart, FaComment } from 'react-icons/fa';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
  const [recipes, setRecipes] = useState([]); // Ensure it's always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    image: "",
  });
  const [editingRecipe, setEditingRecipe] = useState(null);
  const navigate = useNavigate();

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Get authentication token
  const getAuthToken = () => {
    return sessionStorage.getItem('token');
  };

  // Get current user
  const getCurrentUser = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!getAuthToken() && !!getCurrentUser();
  };

  // Get authorization headers
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Fetch all recipes (public endpoint)
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      const response = await fetch(`${API_BASE_URL}/recipes`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Ensure data is an array, even if API returns something else
      if (Array.isArray(data)) {
        setRecipes(data);
      } else if (data && Array.isArray(data.recipes)) {
        // In case API returns { recipes: [...] }
        setRecipes(data.recipes);
      } else {
        console.warn('API did not return an array of recipes:', data);
        setRecipes([]);
      }
      
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Error fetching recipes: ' + err.message);
      setRecipes([]); // Ensure recipes is still an array on error
    } finally {
      setLoading(false);
    }
  };

  // Load recipes on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      fetchRecipes();
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  // Add or Update Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      setError('Please log in to add recipes');
      navigate('/login');
      return;
    }

    try {
      setError(''); // Clear previous errors
      
      const recipeData = {
        title: newRecipe.title.trim(),
        description: newRecipe.description.trim(),
        ingredients: newRecipe.ingredients.split(',').map(item => item.trim()).filter(item => item),
        image: newRecipe.image.trim()
      };

      // Validate recipe data
      if (!recipeData.title || !recipeData.description || !recipeData.ingredients.length) {
        setError('Please fill in all required fields');
        return;
      }

      if (editingRecipe) {
        // Update existing recipe
        const response = await fetch(`${API_BASE_URL}/recipes/${editingRecipe._id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(recipeData)
        });

        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to update recipe');
        }
        
        const result = await response.json();
        setRecipes(prevRecipes => 
          prevRecipes.map(recipe => 
            recipe._id === editingRecipe._id ? result.recipe : recipe
          )
        );
        setEditingRecipe(null);
      } else {
        // Add new recipe
        const response = await fetch(`${API_BASE_URL}/recipes`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(recipeData)
        });

        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to add recipe');
        }
        
        const result = await response.json();
        setRecipes(prevRecipes => [...prevRecipes, result.recipe]);
      }

      // Reset form
      setNewRecipe({ title: "", description: "", ingredients: "", image: "" });
    } catch (err) {
      console.error('Recipe submission error:', err);
      setError('Error saving recipe: ' + err.message);
    }
  };

  // Edit Recipe
  const handleEdit = (recipe) => {
    const currentUser = getCurrentUser();
    if (!currentUser || recipe.userId !== currentUser.id) {
      setError('You can only edit your own recipes');
      return;
    }

    setNewRecipe({
      title: recipe.title,
      description: recipe.description,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients,
      image: recipe.image || ''
    });
    setEditingRecipe(recipe);
  };

  // Delete Recipe
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    if (!isAuthenticated()) {
      setError('Please log in to delete recipes');
      navigate('/login');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete recipe');
      }
      
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Error deleting recipe: ' + err.message);
    }
  };

  // Like Recipe
  const handleLike = async (id) => {
    if (!isAuthenticated()) {
      setError('Please log in to like recipes');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}/like`, {
        method: 'POST',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to like recipe');
      }
      
      const result = await response.json();
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe._id === id ? { ...recipe, likes: result.likes } : recipe
        )
      );
    } catch (err) {
      console.error('Like error:', err);
      setError('Error liking recipe: ' + err.message);
    }
  };

  // Add Comment
  const handleAddComment = async (recipeId, commentText) => {
    if (!commentText.trim()) return;
    
    if (!isAuthenticated()) {
      setError('Please log in to add comments');
      navigate('/login');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          text: commentText.trim()
        })
      });

      if (response.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add comment');
      }
      
      const result = await response.json();
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe._id === recipeId ? result.recipe : recipe
        )
      );
    } catch (err) {
      console.error('Comment error:', err);
      setError('Error adding comment: ' + err.message);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="add-recipe-bg">
        <div className="recipe-container">
          <div className="loading">Loading recipes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-recipe-bg">
      <div className="recipe-container">
        {/* Back to Home */}
        <Link to="/home" className="back-button">← Back to Home</Link>

        {/* Error Display */}
        {error && <div className="error-message">{error}</div>}

        {/* Recipe Form */}
        <div className="recipe-form">
          <h2>{editingRecipe ? "Edit Recipe" : "Add New Recipe"}</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="title" 
              placeholder="Recipe Title" 
              value={newRecipe.title} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              name="description" 
              placeholder="Description" 
              value={newRecipe.description} 
              onChange={handleChange} 
              required
              rows="4"
            />
            <textarea 
              name="ingredients" 
              placeholder="Ingredients (comma separated)" 
              value={newRecipe.ingredients} 
              onChange={handleChange} 
              required 
              rows="3"
            />
            <input 
              type="url" 
              name="image" 
              placeholder="Image URL (optional)" 
              value={newRecipe.image} 
              onChange={handleChange} 
            />
            <button type="submit">
              {editingRecipe ? "Update Recipe" : "Add Recipe"}
            </button>
            {editingRecipe && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingRecipe(null);
                  setNewRecipe({ title: "", description: "", ingredients: "", image: "" });
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Recipe List */}
        <div className="recipe-list">
          <h2>All Recipes</h2>
          {!Array.isArray(recipes) || recipes.length === 0 ? (
            <p>No recipes found. Be the first to add a recipe!</p>
          ) : (
            recipes.map((recipe) => (
              <RecipeCard 
                key={recipe._id} 
                recipe={recipe} 
                currentUser={getCurrentUser()}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
                onAddComment={handleAddComment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Separate Recipe Card Component
const RecipeCard = ({ recipe, currentUser, onEdit, onDelete, onLike, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onAddComment(recipe._id, newComment);
    setNewComment('');
  };

  const isOwner = currentUser && recipe.userId === currentUser.id;
  const authorName = recipe.userId?.username || 'Unknown Author';

  return (
    <div className="recipe-card">
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          onError={(e) => {
            e.target.style.display = 'none';
          }} 
        />
      )}
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p className="recipe-author">By: {authorName}</p>
        <p>{recipe.description}</p>
        <div className="ingredients">
          <strong>Ingredients:</strong>
          <ul>
            {(Array.isArray(recipe.ingredients) ? recipe.ingredients : []).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        {isOwner && (
          <div className="recipe-actions">
            <button onClick={() => onEdit(recipe)}>
              <FaEdit /> Edit
            </button>
            <button onClick={() => onDelete(recipe._id)} className="delete">
              <FaTrash /> Delete
            </button>
          </div>
        )}
        
        <div className="recipe-meta">
          <button 
            className="like-button" 
            onClick={() => onLike(recipe._id)}
          >
            <FaHeart /> {recipe.likes || 0}
          </button>
          <button 
            className="comment-button"
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment /> {recipe.comments?.length || 0} Comments
          </button>
        </div>

        {showComments && (
          <div className="comments-section">
            <div className="comments-list">
              {recipe.comments?.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment.text}</p>
                  <small>
                    {comment.user?.username || 'Anonymous'} - {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>
              )) || <p>No comments yet.</p>}
            </div>
            
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <button type="submit">Post</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecipe;