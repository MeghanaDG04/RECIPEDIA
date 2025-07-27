import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/RecipeDetail.css";

function PaneerButterMasala() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { text: newComment, user: localStorage.getItem("username") },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="recipe-detail-container">
      <div className="back-button" onClick={() => navigate("/veg")}>
        <FaArrowLeft /> Back
      </div>

      <h1>Paneer Butter Masala</h1>

      <div className="recipe-image">
        <img src="/paneer.jpg" alt="Paneer Butter Masala" />
      </div>

      <div className="recipe-info">
        <h2>About</h2>
        <p>
          A rich and creamy North Indian curry made with paneer (cottage cheese)
          in a tomato-based gravy with aromatic spices.
        </p>

        <h2>Ingredients</h2>
        <ul>
          <li>500g Paneer, cubed</li>
          <li>4 tbsp Butter</li>
          <li>2 cups Tomato puree</li>
          <li>1 cup Heavy cream</li>
          <li>2 tbsp Ginger-garlic paste</li>
          <li>2 tsp Garam masala</li>
          <li>Salt to taste</li>
          <li>Kasuri methi</li>
        </ul>

        <h2>Preparation Steps</h2>
        <ol>
          <li>Heat butter in a pan and sauté ginger-garlic paste</li>
          <li>Add tomato puree and cook until oil separates</li>
          <li>Add spices and simmer for 5 minutes</li>
          <li>Add paneer cubes and cream</li>
          <li>Cook for 10 minutes on low heat</li>
          <li>Garnish with kasuri methi and serve hot</li>
        </ol>
      </div>

      <div className="user-interaction">
        <div className="like-section">
          <button onClick={handleLike}>
            {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            {liked ? " Liked" : " Like"}
          </button>
        </div>

        <div className="comment-section">
          <h3>Comments</h3>
          <form onSubmit={handleComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Post Comment</button>
          </form>

          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.user}</strong>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaneerButterMasala;
