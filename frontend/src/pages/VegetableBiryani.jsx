import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

function VegetableBiryani() {
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

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Vegetable Biryani</h1>

      <img src="/vegbiriyani.jpg" alt="Vegetable Biryani" className="w-full h-80 object-cover rounded-xl shadow-lg mb-8" />

      <section className="prose max-w-none">
        <h2>About</h2>
        <p>A fragrant and flavorful rice dish made with aromatic spices, basmati rice, and a mix of fresh vegetables.</p>

        <h2>Ingredients</h2>
        <ul className="list-disc pl-6">
          <li>2 cups Basmati rice</li>
          <li>2 tbsp Ghee or oil</li>
          <li>1 Onion, sliced</li>
          <li>1 Tomato, chopped</li>
          <li>1 cup Mixed vegetables (carrot, beans, peas, potato)</li>
          <li>1 tbsp Ginger-garlic paste</li>
          <li>2 tsp Biryani masala</li>
          <li>1/2 tsp Turmeric powder</li>
          <li>1/2 tsp Red chili powder</li>
          <li>1/2 cup Yogurt</li>
          <li>2 cups Water or vegetable broth</li>
          <li>Salt to taste</li>
          <li>Fresh coriander and mint for garnish</li>
        </ul>

        <h2>Preparation Steps</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Rinse and soak basmati rice for 20 minutes.</li>
          <li>Heat ghee in a pan, sauté onions until golden brown.</li>
          <li>Add ginger-garlic paste, tomatoes, and cook until soft.</li>
          <li>Mix in chopped vegetables, biryani masala, turmeric, and chili powder.</li>
          <li>Stir in yogurt, cook for 5 minutes, then add water and salt.</li>
          <li>Add soaked rice, cover, and cook on low heat until rice is fluffy.</li>
          <li>Garnish with fresh coriander and mint, serve hot.</li>
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

export default VegetableBiryani;