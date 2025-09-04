import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { authService } from '../services/authService';
import "../styles/UserProfile.css"; 

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get logged-in user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }

        const userData = authService.getUser();
        if (!userData || !userData.email) {
          setError("User data not found. Please login again.");
          return;
        }

        // Fetch full profile data from API
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/${userData.email}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        if (err.response?.status === 401) {
          // Token expired or invalid
          authService.clearAuth();
          navigate('/login');
        } else {
          setError(err.response?.data?.message || "Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/home')} className="btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // No user data
  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-message">
          <h2>Profile Not Found</h2>
          <p>Unable to load user profile data.</p>
          <button onClick={() => navigate('/home')} className="btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="back-button" onClick={() => navigate('/home')}>
        <FaArrowLeft className="back-arrow" /> Back
      </div>

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} />
            ) : (
              <div className="avatar-placeholder">
                <FaUser size={40} />
              </div>
            )}
          </div>
          <h1 className="profile-name">{user.username}</h1>
          <p className="profile-email">{user.email}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
          
          {/* Basic User Info */}
          <div className="user-info">
            {user.age && <span className="info-item">Age: {user.age}</span>}
            {user.gender && <span className="info-item">Gender: {user.gender}</span>}
            {user.address && <span className="info-item">Location: {user.address}</span>}
            {user.phone && <span className="info-item">Phone: {user.phone}</span>}
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Favorite Recipe Section */}
          {user.favoriteRecipe && (
            <div className="profile-section">
              <h2>Favorite Recipe</h2>
              <div className="favorite-recipe-card">
                <h3>{user.favoriteRecipe.name || user.favoriteRecipe.title}</h3>
                {user.favoriteRecipe.cuisine && (
                  <span className="cuisine-tag">{user.favoriteRecipe.cuisine}</span>
                )}
              </div>
            </div>
          )}

          {/* Favorite Cuisines */}
          {user.favoriteCuisines && user.favoriteCuisines.length > 0 && (
            <div className="profile-section">
              <h2>Favorite Cuisines</h2>
              <div className="tags-container">
                {user.favoriteCuisines.map((cuisine, index) => (
                  <span key={index} className="tag">{cuisine}</span>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Preferences */}
          {user.dietaryPreferences && user.dietaryPreferences.length > 0 && (
            <div className="profile-section">
              <h2>Dietary Preferences</h2>
              <div className="tags-container">
                {user.dietaryPreferences.map((pref, index) => (
                  <span key={index} className="tag">{pref}</span>
                ))}
              </div>
            </div>
          )}

          {/* Liked Recipes */}
          {user.likedRecipes && user.likedRecipes.length > 0 && (
            <div className="profile-section">
              <h2>Liked Recipes ({user.likedRecipes.length})</h2>
              <div className="recipes-grid">
                {user.likedRecipes.map((recipe) => (
                  <div key={recipe._id || recipe.id} className="recipe-card liked">
                    <h3>{recipe.title || recipe.name}</h3>
                    {recipe.cuisine && <span className="cuisine-tag">{recipe.cuisine}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Comments */}
          {user.recentComments && user.recentComments.length > 0 && (
            <div className="profile-section">
              <h2>Recent Comments</h2>
              <div className="comments-list">
                {user.recentComments.map((comment, index) => (
                  <div key={comment._id || index} className="comment-card">
                    <p>
                      <strong>{comment.recipe?.title || comment.recipe || 'Recipe'}:</strong> 
                      {comment.text || comment.comment}
                    </p>
                    {comment.createdAt && (
                      <small className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Recipes */}
          {user.savedRecipes && user.savedRecipes.length > 0 && (
            <div className="profile-section">
              <h2>Saved Recipes ({user.savedRecipes.length})</h2>
              <div className="recipes-grid">
                {user.savedRecipes.map((recipe) => (
                  <div key={recipe._id || recipe.id} className="recipe-card">
                    <h3>{recipe.title || recipe.name}</h3>
                    {recipe.cuisine && <span className="cuisine-tag">{recipe.cuisine}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State Messages */}
          {(!user.likedRecipes || user.likedRecipes.length === 0) && 
           (!user.savedRecipes || user.savedRecipes.length === 0) && 
           (!user.recentComments || user.recentComments.length === 0) && (
            <div className="profile-section">
              <div className="empty-state">
                <h3>Start Building Your Profile!</h3>
                <p>Like recipes, save your favorites, and leave comments to see them here.</p>
                <button 
                  onClick={() => navigate('/explore')} 
                  className="btn-primary"
                >
                  Explore Recipes
                </button>
              </div>
            </div>
          )}

          {/* Edit Profile Button */}
          <div className="profile-section">
            <button 
              onClick={() => navigate('/settings')} 
              className="btn-secondary edit-profile-btn"
            >
              <FaEdit className="btn-icon" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;