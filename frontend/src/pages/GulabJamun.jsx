import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

function GulabJamun() {
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
      <button onClick={() => navigate('/dessert')} className="flex items-center text-red-500 hover:text-red-600 mb-6">
        <FaArrowLeft className="mr-2" /> Back
      </button>
      
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Gulab Jamun</h1>
      
      <img src="/jamun.jpg" alt="Gulab Jamun" className="w-full h-80 object-cover rounded-xl shadow-lg mb-8" />

      <section className="prose max-w-none">
        <h2>About</h2>
        <p>A classic Indian dessert made from deep-fried milk-based dumplings soaked in a fragrant sugar syrup.</p>

        <h2>Ingredients</h2>
        <h3>For the Gulab Jamun:</h3>
        <ul className="list-disc pl-6">
          <li>1 cup Milk powder</li>
          <li>1/4 cup All-purpose flour (maida)</li>
          <li>1/4 tsp Baking soda</li>
          <li>2 tbsp Ghee (clarified butter)</li>
          <li>1/4 cup Milk (warm, as needed for kneading)</li>
          <li>Oil or ghee for deep frying</li>
        </ul>

        <h3>For the Sugar Syrup:</h3>
        <ul>
          <li>1 cup Sugar</li>
          <li>1/2 cup Water</li>
          <li>2 Cardamom pods, crushed</li>
          <li>1/2 tsp Rose water (optional)</li>
          <li>1/2 tsp Lemon juice (to prevent crystallization)</li>
        </ul>

        <h2>Preparation Steps</h2>
        <ol>
          <li>In a bowl, mix milk powder, all-purpose flour, and baking soda</li>
          <li>Add ghee and mix until the mixture becomes crumbly</li>
          <li>Gradually add warm milk and knead into a soft dough (do not over-knead)</li>
          <li>Cover and let it rest for 10 minutes, then shape into smooth, crack-free balls</li>
          <li>Heat oil or ghee on low-medium flame and fry the balls until golden brown</li>
          <li>For sugar syrup: Boil sugar and water until slightly sticky, then add cardamom, rose water, and lemon juice</li>
          <li>Add the fried gulab jamuns to the warm syrup and let them soak for at least 2 hours</li>
          <li>Serve warm or chilled, garnished with chopped nuts if desired</li>
        </ol>
      </section>

    

      <div className="user-interaction">
        <div className="like-section">
          <button onClick={handleLike}>
            {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            {liked ? ' Liked' : ' Like'}
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

export default GulabJamun;