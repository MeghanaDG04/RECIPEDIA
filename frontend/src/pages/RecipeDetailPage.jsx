import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from 'react-icons/io5';
import { IoMdSettings, IoMdPause } from 'react-icons/io';

import allRecipes from '../data/recipes.json';
import NotFoundPage from './NotFound.jsx';
import '../styles/RecipeDetail.css';
import { v4 as uuidv4 } from 'uuid';

const RecipeDetailPage = () => {
  const { category, recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [spokenChars, setSpokenChars] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const utteranceRef = useRef(null);
  const contentPartsRef = useRef([]);

  useEffect(() => {
    const found = allRecipes.find(r => r.id === recipeId && r.category === category);
    setRecipe(found);
    if (found) {
      const text = `${found.name}. ${found.about}. Ingredients Required, ${found.ingredients.join(', ')}. Preparation Steps, ${found.preparationSteps.join('. ')}`;
      contentPartsRef.current = text.split('.');
      setSpeechIndex(0);
    }
  }, [recipeId, category]);

  useEffect(() => {
    if (isSpeaking && speechIndex < contentPartsRef.current.length) {
      speak(speechIndex);
    }
  }, [speechIndex, isSpeaking]);

  useEffect(() => {
    window.onbeforeunload = () => window.speechSynthesis.cancel();
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleLike = () => setLiked(!liked);

  const handleComment = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username') || 'Guest';
    if (!newComment.trim()) {
      setError('Comment cannot be empty!');
      return;
    }
    setComments([...comments, { id: uuidv4(), text: newComment.trim(), user: username }]);
    setNewComment('');
    setError('');
  };

  const speak = (index) => {
    if (index >= contentPartsRef.current.length) return;
    const utterance = new SpeechSynthesisUtterance(contentPartsRef.current[index]);
    utterance.rate = speechRate;
    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const totalSpoken = contentPartsRef.current.slice(0, index).join(' ').length + e.charIndex;
        setSpokenChars(totalSpoken);
      }
    };
    utterance.onend = () => {
      if (index + 1 < contentPartsRef.current.length) {
        setSpeechIndex(prev => prev + 1);
      } else {
        setIsSpeaking(false);
        setSpeechIndex(0);
        setSpokenChars(0);
      }
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (!isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
    }
  };
  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsSpeaking(false);
  };
  const handleCancel = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  const handleSkipForward = () => {
    const newIndex = Math.min(speechIndex + 1, contentPartsRef.current.length - 1);
    if (newIndex !== speechIndex) {
      handleCancel();
      setSpeechIndex(newIndex);
      setIsSpeaking(true);
    }
  };
  const handleSkipBack = () => {
    const newIndex = Math.max(speechIndex - 1, 0);
    if (newIndex !== speechIndex) {
      handleCancel();
      setSpeechIndex(newIndex);
      setIsSpeaking(true);
    }
  };
  const handleSpeed = () => {
    setShowSettings(prev => !prev);
  };
  const handleSeek = (e) => {
    const newCharIndex = parseInt(e.target.value, 10);
    setSpokenChars(newCharIndex);
    let accumulated = 0;
    for (let i = 0; i < contentPartsRef.current.length; i++) {
      if (accumulated + contentPartsRef.current[i].length >= newCharIndex) {
        setSpeechIndex(i);
        break;
      }
      accumulated += contentPartsRef.current[i].length;
    }
  };
  const handleSeekRelease = () => {
    if (isDragging) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      speak(speechIndex);
      setIsDragging(false);
    }
  };

  if (!recipe) return <NotFoundPage />;

  return(
  <div className="recipe-detail-container max-w-4xl mx-auto px-4 pt-32 pb-16 dark:bg-slate-800 dark:text-white">
    <button
      onClick={() => navigate(`/${recipe.category}`)}
      className="mb-6 px-4 font-bold py-2.5 bg-red-100 text-red-600 hover:text-white hover:bg-red-500 rounded-xl shadow flex items-center gap-2 w-fit transition-all duration-200"
    >
      <FaArrowLeft className="text-inherit" />
      <span className="font-medium text-base">Back to {recipe.category}</span>
    </button>

    <h1 className="text-4xl font-bold text-center my-10 text-[#d35400]">{recipe.name}</h1>

    <img
      src={recipe.image}
      onError={(e) => (e.target.src = '/default.jpg')}
      alt={recipe.name}
      className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
    />
    
{/* Audio overview */}
<div className="w-full max-w-md mx-auto my-10 px-6 py-5 bg-[#F9FAFB] rounded-2xl shadow-lg flex flex-col items-center gap-4">
  {/* Title & Settings */}
  <div className="flex items-center justify-between w-full">
    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#d30303]">
      Audio Overview
    </p>
    <div
      onClick={handleSpeed}
      className="text-2xl md:text-3xl text-[#4CAF50] hover:text-[#000] cursor-pointer transition-all duration-200"
    >
      <IoMdSettings />
    </div>
  </div>

  {/* Controls */}
  <div className="flex justify-center items-center gap-6 mt-2">
    <button
      onClick={handleSkipBack}
      className="text-2xl sm:text-3xl text-[#1E293B] hover:text-orange-600 focus:outline-none transition-colors"
    >
      <IoPlaySkipBackSharp />
    </button>
    <button
      onClick={isSpeaking ? handlePause : handlePlay}
      className="text-3xl sm:text-4xl text-[#1E293B] focus:text-orange-600 focus:outline-none transition-colors"
    >
      {isSpeaking ? <IoMdPause /> : <FaPlay className="w-7 h-7" />}
    </button>
    <button
      onClick={handleSkipForward}
      className="text-2xl sm:text-3xl text-[#1E293B] hover:text-orange-600 focus:outline-none transition-colors"
    >
      <IoPlaySkipForwardSharp />
    </button>
  </div>

  {/* Seek Bar (radial effect using background gradient) */}
  <input
    type="range"
    min={0}
    step={1}
    max={contentPartsRef.current.reduce((a, b) => a + b.length, 0)}
    value={spokenChars}
    onChange={(e) => {
      setIsDragging(true);
      handleSeek(e);
    }}
    onMouseUp={handleSeekRelease}
    onTouchEnd={handleSeekRelease}
    className="w-full h-2 rounded-lg cursor-pointer transition-all duration-150"
    style={{
      accentColor: "#1d4ed8", 
      background: `radial-gradient(circle at 50% 50%, #F44336 0%, #FFCDD2 100%)`, // Tomato + Light Pink
    }}
  />

  {/* Speed Control */}
  {showSettings && (
  <div className="flex flex-row w-full items-center justify-between mt-2">
    <label htmlFor="rate" className="text-base sm:text-lg font-medium text-[#1E293B]">
      Speed:
    </label>
    <input
      id="rate"
      type="range"
      min="0.25"
      max="3"
      step="0.1"
      value={speechRate}
      onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
      className="w-full mx-3"
      style={{ accentColor: "#d110f3ff" }} 
    />
    <span className="text-base sm:text-lg text-[#1E293B]">{speechRate}x</span>
  </div>
  )}
</div>

{/* Subtitles */}
{showSettings && (
<div className="w-full mt-4 px-4 py-2 bg-[#FFFFFFC9] rounded-md text-center text-[#033881] text-base sm:text-lg font-medium min-h-[48px] transition-all border border-[#E5E7EB]">
  {
    (() => {
      const fullText = contentPartsRef.current.join(" ");
      const currentIndex = spokenChars;
      const previewLength = 80;

      const start = Math.max(0, currentIndex - 40);
      const end = Math.min(fullText.length, currentIndex + previewLength);

      const subtitle = fullText.slice(start, end);
      return subtitle;
    })()
  }
</div>
)}

    <section className="prose max-w-none dark:prose-invert">
      <h2 className="text-2xl font-semibold text-[#d35400] pb-2">About this Recipe</h2>
      <p className='dark:text-white text-red-500'>{recipe.about}</p>
      <h2 className="text-2xl font-semibold mt-6 text-[#d35400] pb-2">Ingredients</h2> 
      <ul className="list-disc dark:text-white pl-6 marker:text-red-500 text-red-500">
        {recipe.ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 text-[#d35400] pb-2">Preparation Steps</h2>
      <ol className="list-decimal pl-6 space-y-2 dark:text-white  text-red-500">
        {recipe.preparationSteps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </section>

    {/* User Interaction: Likes and Comments */}
    <div className="mt-10 flex items-center gap-4">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 px-4 py-2.5 bg-red-100 text-red-600 hover:text-white hover:bg-red-500 rounded-xl shadow w-fit transition-all duration-200 focus:outline-none"
      >
        {liked ? <FaHeart className="text-inherit" /> : <FaRegHeart className="text-inherit" />}
        {liked ? 'Liked' : 'Like'}
      </button>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-4 text-[#d35400]">Comments</h3>
      <form onSubmit={handleComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border rounded-lg p-4 min-h-[120px] text-black bg-white dark:bg-slate-700 dark:text-white"
        />
        {error && <p className="text-red-600 mt-2 font-semibold">{error}</p>}
        <button
          type="submit"
          className="mt-3 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-4 mt-6">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg shadow">
              <strong>{c.user}</strong>
              <p>{c.text}</p>
            </div>
          ))
        ) : (
          <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg shadow text-center text-gray-500 dark:text-white">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default RecipeDetailPage;
