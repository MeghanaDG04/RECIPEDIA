// src/components/RecipeCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaHeart, FaComment } from 'react-icons/fa';
import { Clock, User } from 'lucide-react'; // Added more icons for enhancement

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.03, rotate: 1, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }
};

const commentsVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: 'easeInOut' } }
};

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
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-pink-100"
    >
      {recipe.image && (
        <motion.img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-56 object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{recipe.title}</h3>
        <div className="flex items-center text-gray-500 mb-3 gap-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" /> {authorName}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {new Date(recipe.createdAt).toLocaleDateString()}
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{recipe.description}</p>
        <div className="mb-6">
          <strong className="text-gray-700 block mb-2">Ingredients:</strong>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {(Array.isArray(recipe.ingredients) ? recipe.ingredients : []).map((ingredient, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-lg">{ingredient}</li>
            ))}
          </ul>
        </div>
        
        {isOwner && (
          <div className="flex space-x-4 mb-6">
            <motion.button 
              onClick={() => onEdit(recipe)}
              whileHover={{ scale: 1.1, color: '#3b82f6' }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-blue-500"
            >
              <FaEdit className="w-5 h-5" /> <span>Edit</span>
            </motion.button>
            <motion.button 
              onClick={() => onDelete(recipe._id)}
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-red-500"
            >
              <FaTrash className="w-5 h-5" /> <span>Delete</span>
            </motion.button>
          </div>
        )}
        
        <div className="flex space-x-6 mb-4">
          <motion.button 
            onClick={() => onLike(recipe._id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-pink-500"
          >
            <FaHeart className="w-6 h-6" /> <span className="text-lg">{recipe.likes || 0}</span>
          </motion.button>
          <motion.button 
            onClick={() => setShowComments(!showComments)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-blue-500"
          >
            <FaComment className="w-6 h-6" /> <span className="text-lg">{recipe.comments?.length || 0}</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div 
              variants={commentsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-4 space-y-4"
            >
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {recipe.comments?.map((comment, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-3 rounded-xl border border-gray-200"
                  >
                    <p className="text-gray-700">{comment.text}</p>
                    <small className="text-gray-500 flex items-center gap-1 mt-1">
                      <User className="w-3 h-3" />
                      {comment.user?.username || 'Anonymous'} - {new Date(comment.createdAt).toLocaleDateString()}
                    </small>
                  </motion.div>
                )) || <p className="text-gray-500 text-center">No comments yet. Be the first!</p>}
              </div>
              
              <form onSubmit={handleCommentSubmit} className="flex space-x-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  required
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent transition bg-white/50"
                />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow-sm"
                >
                  Post
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
