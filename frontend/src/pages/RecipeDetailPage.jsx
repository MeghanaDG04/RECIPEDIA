import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaRegHeart, FaCheck } from 'react-icons/fa';
import allRecipes from '../data/recipes.json';
import NotFoundPage from './NotFound.jsx';
import { v4 as uuidv4 } from 'uuid';
import AudioOverview from '../components/AudioOverview.jsx';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
// Main accent gradient for titles and important actions
const accentGradient = "linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%)";
// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};
const heartVariants = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { type: 'spring', stiffness: 200, damping: 10 } },
  exit: { scale: 0 },
  hover: { scale: 1.15, transition: { duration: 0.2 } },
};
const RecipeDetailPage = () => {
  const { category, recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [ratingValue, setRatingValue] = useState(4);
  const [error, setError] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  // Speech states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [spokenChars, setSpokenChars] = useState(0);
  const contentPartsRef = useRef([]);
  useEffect(() => {
    const found = allRecipes.find(
      (r) => r.id === recipeId && r.category === category
    );
    setRecipe(found);
    setShowAllComments(false); // Reset showAllComments when recipe changes.
    if (found) {
      const parts = [
        found.name, "About this Recipe", found.about,
        "Ingredients", ...found.ingredients,
        "Preparation Steps", ...found.preparationSteps,
      ];
      contentPartsRef.current = parts.filter(p => p && p.trim().length > 0);
      setSpeechIndex(0);
      setSpokenChars(0);
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [recipeId, category]);
  useEffect(() => () => window.speechSynthesis.cancel(), []);
  const handleLike = () => setLiked(!liked);
  const handleComment = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username') || 'Guest';
    if (!newComment.trim()) {
      setError('Comment cannot be empty!');
      return;
    }
    const newCommentObject = {
      id: uuidv4(),
      text: newComment.trim(),
      user: username,
      rating: ratingValue,
    };
    setComments([newCommentObject, ...comments]);
    setNewComment('');
    setRatingValue(4);
    setError('');
  };
  if (!recipe) return <NotFoundPage />;
  // Determine the comments to display
  const visibleComments = showAllComments ? comments : comments.slice(0, 2);
  const showMoreButton = comments.length > 2 && !showAllComments;
  return (
    <motion.div
      className="recipe-detail-page min-h-screen bg-gray-50 dark:bg-slate-900 pt-24"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      {/* --- Hero Section --- */}
      <motion.div
        className="relative h-[60vh] min-h-[450px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8 } }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-b-3xl">
          <motion.img
            src={recipe.image}
            onError={(e) => (e.target.src = '/default.jpg')}
            alt={recipe.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1, transition: { duration: 1.5, ease: "circOut" } }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute top-8 left-4 sm:left-8 z-10">
          <motion.button
            onClick={() => navigate(`/${recipe.category}`)}
            className="flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full transition-colors hover:bg-black/40 group"
            variants={itemVariants}
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold hidden sm:block">Back</span>
          </motion.button>
        </div>
        <motion.button
          onClick={handleLike}
          className="absolute top-8 right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"
          variants={itemVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {liked ? (
              <motion.div variants={heartVariants} initial="initial" animate="animate" exit="exit">
                <FaHeart className="text-2xl text-red-500" />
              </motion.div>
            ) : (
              <motion.div variants={heartVariants} initial="initial" animate="animate" exit="exit">
                <FaRegHeart className="text-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-3" variants={itemVariants}>
            {recipe.name}
          </motion.h1>
          <motion.p className="max-w-3xl text-white/90 text-lg" variants={itemVariants}>
            {recipe.about}
          </motion.p>
        </div>
      </motion.div>
      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT: Sticky Sidebar (Ingredients & Controls) */}
          <motion.div className="lg:col-span-1 lg:sticky lg:top-28 self-start space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg ring-1 ring-gray-200/50 dark:ring-slate-700/50">
              <SectionHeader title="Ingredients" />
              <motion.ul className="space-y-4" variants={containerVariants}>
                {recipe.ingredients.map((item, i) => (
                  <motion.li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300" variants={itemVariants}>
                    <FaCheck className="text-[#ff4b2b] mt-1.5 flex-shrink-0"/>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg ring-1 ring-gray-200/50 dark:ring-slate-700/50">
              <SectionHeader title="Audio Guide" />
              <AudioOverview
                contentPartsRef={contentPartsRef}
                speechRate={speechRate}
                setSpeechRate={setSpeechRate}
                spokenChars={spokenChars}
                setSpokenChars={setSpokenChars}
                speechIndex={speechIndex}
                setSpeechIndex={setSpeechIndex}
                isSpeaking={isSpeaking}
                setIsSpeaking={setIsSpeaking}
              />
            </motion.div>
          </motion.div>
          {/* RIGHT: Preparation Steps */}
          <motion.div className="lg:col-span-2" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <SectionHeader title="Preparation" />
              <ol className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed space-y-6 list-decimal list-inside marker:text-[#ff4b2b] marker:font-bold">
                {recipe.preparationSteps.map((step, i) => (
                  <motion.li
                    key={i}
                    className="pl-2 transition-all duration-300 hover:bg-rose-50 dark:hover:bg-slate-800 p-3 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    {step}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        </div>
        {/* --- Reviews & Comments Section (Full Width) --- */}
        <motion.div className="mt-20 py-12 border-t border-gray-200 dark:border-slate-700" variants={containerVariants}>
          <SectionHeader title="Reviews & Comments" />
          {/* Container for vertical stacking */}
          <div className="space-y-12">
            {/* Comment Form - Takes full width */}
            <form onSubmit={handleComment} className="w-full bg-white dark:bg-slate-800 p-7 rounded-2xl shadow-lg ring-1 ring-gray-200/50 dark:ring-slate-700/50">
              <h4 className="font-bold text-2xl mb-4 text-gray-800 dark:text-white">Leave a Review</h4>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="How did it turn out? Share your tips!"
                className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-lg p-4 min-h-[120px] bg-gray-50 dark:bg-slate-700/50 focus:ring-2 focus:ring-[#ff4b2b] transition mb-4"
              />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                <Box>
                  <Typography component="legend" className='font-semibold text-gray-600 dark:text-gray-300'>Your Rating:</Typography>
                  <Rating
                    name="comment-rating" value={ratingValue}
                    sx={{ '& .MuiRating-iconFilled': { color: '#ff4b2b' } }}
                    onChange={(_, newValue) => setRatingValue(newValue)}
                  />
                </Box>
                <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  Post Review
                </motion.button>
              </div>
              {error && <p className="text-red-500 mt-3 font-semibold">{error}</p>}
            </form>
            {/* Comments List - Appears below the form */}
            <div className="w-full space-y-6">
              <AnimatePresence>
                {visibleComments.length > 0 ? (
                  visibleComments.map((c) => <CommentCard key={c.id} comment={c} />)
                ) : (
                  <motion.div variants={itemVariants} className="text-center py-10 px-6 bg-gray-100 dark:bg-slate-800 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400">Be the first to share your experience!</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {showMoreButton && (
                <div className="text-center w-full">
          
                  <motion.button
                    onClick={() => setShowAllComments(true)}
                    className="mt-4 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Show More Comments
                    
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
// --- Sub-components for better organization ---
const SectionHeader = ({ title }) => (
  <div className="mb-6">
    <h2 className="text-3xl lg:text-4xl font-bold inline-block"
      style={{
        background: accentGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
      {title}
    </h2>
    <div className="h-0.5 bg-gradient-to-r from-[#ff4b2b]/30 to-transparent mt-2 w-1/3" />
  </div>
);
const CommentCard = ({ comment }) => (
  <motion.div
    className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md ring-1 ring-gray-200/50 dark:ring-slate-700/50"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#ff4b2b] to-[#ff416c] rounded-full flex items-center justify-center font-bold text-white text-xl shadow-sm">
        {comment.user.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{comment.user}</p>
          <Rating name="read-only" value={comment.rating} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#ff4b2b' } }} />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{comment.text}</p>
      </div>
    </div>
  </motion.div>
);
export default RecipeDetailPage;
