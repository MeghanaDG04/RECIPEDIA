import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

function PalakSoup() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, user: localStorage.getItem('username') }]);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
      <button onClick={() => navigate('/veg')} className="flex items-center text-red-500 hover:text-red-600 mb-6">
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Palak Soup</h1>

      <img src="/palak.jpg" alt="Palak Soup" className="w-full h-80 object-cover rounded-xl shadow-lg mb-8" />

      <section className="prose max-w-none">
        <h2>About</h2>
        <p>A nutritious and flavorful soup made with fresh spinach (palak), blended with spices and cream for a smooth texture.</p>

        <h2>Ingredients</h2>
        <ul className="list-disc pl-6">
          <li>2 cups Fresh spinach, chopped</li>
          <li>1 tbsp Butter</li>
          <li>1 Onion, finely chopped</li>
          <li>2 Garlic cloves, minced</li>
          <li>1 cup Milk or cream</li>
          <li>2 cups Vegetable broth</li>
          <li>1 tsp Black pepper</li>
          <li>Salt to taste</li>
          <li>1 tsp Lemon juice</li>
        </ul>

        <h2>Preparation Steps</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Heat butter in a pan and sauté onion and garlic until soft.</li>
          <li>Add chopped spinach and cook until wilted.</li>
          <li>Pour in vegetable broth and let it simmer for 5 minutes.</li>
          <li>Blend the mixture until smooth.</li>
          <li>Return to heat, add milk or cream, and season with salt and pepper.</li>
          <li>Simmer for 5 minutes, then add lemon juice before serving.</li>
        </ol>
      </section>

      <div className="mt-10 flex items-center gap-4">
        <button onClick={handleLike} className="flex items-center gap-2 text-gray-600 hover:text-red-500 focus:outline-none">
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {liked ? 'Liked' : 'Like'}
        </button>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
        <form onSubmit={handleComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
          />
          <button type="submit" className="mt-3 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full">Post Comment</button>
        </form>

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
              <strong className="block text-gray-800">{comment.user}</strong>
              <p className="text-gray-700 mt-1">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PalakSoup;