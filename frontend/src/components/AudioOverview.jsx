import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from "react-icons/io5";
import { IoMdSettings, IoMdPause } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const AudioOverview = ({
  contentPartsRef,
  speechRate,
  setSpeechRate,
  spokenChars,
  setSpokenChars,
  speechIndex,
  setSpeechIndex,
  isSpeaking,
  setIsSpeaking,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const resumeIntervalRef = useRef(null);

  const isAndroid = /Android/.test(navigator.userAgent);

  // ✅ FIXED: The `speak` function now chains itself to play the next part automatically.
  const speak = (index) => {
    // Stop if we're at the end or the content part is invalid
    if (index >= contentPartsRef.current.length || !contentPartsRef.current[index]) {
        setIsSpeaking(false);
        setIsPaused(false);
        // Optional: Reset to the beginning when finished
        // setSpeechIndex(0);
        // setSpokenChars(0);
        return;
    }

    const text = contentPartsRef.current[index];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;

    utterance.onboundary = (e) => {
      if (e.name === "word") {
        const charsBeforeCurrentPart = contentPartsRef.current
          .slice(0, index)
          .join(" ").length;
        setSpokenChars(charsBeforeCurrentPart + e.charIndex);
      }
    };

    // THIS IS THE KEY FIX: When one utterance ends, start the next one.
    utterance.onend = () => {
      const nextIndex = index + 1;
      if (nextIndex < contentPartsRef.current.length) {
        setSpeechIndex(nextIndex); // Update state for UI
        speak(nextIndex);          // Call speak for the next part
      } else {
        // We've reached the end of all content
        setIsSpeaking(false);
        setIsPaused(false);
        setSpeechIndex(0); // Reset for next play
        setSpokenChars(0);
      }
    };

    utterance.onerror = (e) => {
      console.error("Speech Synthesis Error:", e);
      handleCancel(); // Stop on error
    };
    
    window.speechSynthesis.speak(utterance);
    setupResumeInterval(); // Start the keep-alive interval
  };

  // Enhanced workaround for Chrome's ~15s speech timeout
  const setupResumeInterval = () => {
    clearResumeInterval(); // Clear any existing interval
    resumeIntervalRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 12000);
  };

  const clearResumeInterval = () => {
    if (resumeIntervalRef.current) {
      clearInterval(resumeIntervalRef.current);
      resumeIntervalRef.current = null;
    }
  };

  const handlePlay = () => {
    if (window.speechSynthesis.paused && !isAndroid) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      setupResumeInterval();
    } else {
      window.speechSynthesis.cancel(); // Clear any previous queue
      setIsSpeaking(true);
      setIsPaused(false);
      speak(speechIndex);
    }
  };

  const handlePause = () => {
    clearResumeInterval();
    if (window.speechSynthesis.speaking) {
      if (!isAndroid) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } else {
        window.speechSynthesis.cancel(); // Android doesn't handle pause well
      }
      setIsSpeaking(false);
    }
  };

  const handleCancel = () => {
    clearResumeInterval();
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleSkipForward = () => {
    handleCancel();
    const newIndex = Math.min(speechIndex + 1, contentPartsRef.current.length - 1);
    setSpeechIndex(newIndex);
    setIsSpeaking(true);
    speak(newIndex);
  };

  const handleSkipBack = () => {
    handleCancel();
    const newIndex = Math.max(speechIndex - 1, 0);
    setSpeechIndex(newIndex);
    setIsSpeaking(true);
    speak(newIndex);
  };

  const handleSeek = (e) => {
    const newCharIndex = parseInt(e.target.value, 10);
    setSpokenChars(newCharIndex);
    let accumulated = 0;
    for (let i = 0; i < contentPartsRef.current.length; i++) {
      const partLength = contentPartsRef.current[i].length;
      if (accumulated + partLength >= newCharIndex) {
        setSpeechIndex(i);
        break;
      }
      accumulated += partLength + 1; // +1 for space between parts
    }
  };

  const handleSeekStart = () => {
    if (isSpeaking) {
      handlePause();
    }
    setIsDragging(true);
  };

  const handleSeekRelease = () => {
    if (isDragging) {
      handlePlay(); // Use handlePlay to resume from the new speechIndex
      setIsDragging(false);
    }
  };

  const toggleCollapse = () => {
    if (collapsed) {
      setCollapsed(false);
      handlePlay();
    } else {
      handlePause();
      setCollapsed(true);
    }
  };

  useEffect(() => {
    if (isSpeaking) {
      handleCancel();
      setIsSpeaking(true);
      speak(speechIndex);
    }
  }, [speechRate]);

  useEffect(() => {
    return () => {
      handleCancel(); // Cleanup on unmount
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {collapsed ? (
        <motion.div
          key="collapsed"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center mx-auto my-4"
        >
          <motion.button
            onClick={toggleCollapse}
            whileHover={{ scale: 1.1, boxShadow: "0 0 10px #ef4444" }}
            className="p-3 rounded-full bg-red-500 text-white shadow-lg cursor-pointer flex items-center justify-center"
            aria-label="Listen to audio overview"
            style={{ width: 52, height: 52, minWidth: 52 }}
          >
            <FaPlay size={22} />
          </motion.button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1 select-none">
            Listen
          </span>
        </motion.div>
      ) : (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg mx-auto my-8 px-5 py-4 rounded-2xl shadow-xl flex flex-col items-center gap-5 bg-gradient-to-br from-white via-red-50 to-pink-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
          style={{ minWidth: 300 }}
        >
          <button
            onClick={toggleCollapse}
            className="self-end text-red-600 hover:text-red-800 font-bold mb-2 select-none"
            aria-label="Close audio overview"
          >
            ✕
          </button>

          <div className="flex items-center justify-between w-full px-2">
            <h3 className="text-lg sm:text-xl md:text-xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent select-none">
              🎧 Audio Overview
            </h3>
            <div
              onClick={() => setShowSettings((p) => !p)}
              className="text-xl md:text-2xl text-red-600 hover:text-red-800 cursor-pointer select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowSettings((p) => !p) }}
              aria-label="Toggle speed settings"
            >
              <IoMdSettings />
            </div>
          </div>

          <div className="flex justify-center items-center gap-5 px-2">
            <motion.button whileTap={{ scale: 0.85 }} onClick={handleSkipBack} className="p-2 rounded-full shadow-lg bg-white dark:bg-gray-700 hover:bg-red-500 hover:text-white transition" aria-label="Skip backward" type="button" style={{ width: 40, height: 40 }}>
              <IoPlaySkipBackSharp size={20} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={isSpeaking ? handlePause : handlePlay} className="p-4 rounded-full shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white flex items-center justify-center" aria-label={isSpeaking ? "Pause audio" : "Play audio"} type="button" style={{ width: 56, height: 56 }}>
              {isSpeaking ? <IoMdPause size={24} /> : <FaPlay size={20} />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.85 }} onClick={handleSkipForward} className="p-2 rounded-full shadow-lg bg-white dark:bg-gray-700 hover:bg-red-500 hover:text-white transition" aria-label="Skip forward" type="button" style={{ width: 40, height: 40 }}>
              <IoPlaySkipForwardSharp size={20} />
            </motion.button>
          </div>

          <motion.input
            type="range"
            min={0}
            step={1}
            max={contentPartsRef.current.join(" ").length}
            value={spokenChars}
            onChange={handleSeek}
            onMouseDown={handleSeekStart}
            onTouchStart={handleSeekStart}
            onMouseUp={handleSeekRelease}
            onTouchEnd={handleSeekRelease}
            className="w-full h-1 rounded-full cursor-pointer"
            style={{ accentColor: "#ef4444" }}
            whileHover={{ scale: 1.02 }}
            aria-label="Seek audio progress"
          />

          <AnimatePresence>
            {showSettings && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex w-full items-center justify-between px-2">
                <label htmlFor="rate" className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">Speed:</label>
                <input id="rate" type="range" min="0.25" max="3" step="0.1" value={speechRate} onChange={(e) => setSpeechRate(parseFloat(e.target.value))} className="w-36" style={{ accentColor: "#ef4444" }} aria-valuemin={0.25} aria-valuemax={3} aria-valuenow={speechRate} aria-label="Adjust speech speed" />
                <span className="text-sm font-semibold select-none">{speechRate}x</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div key={speechIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full text-center text-gray-700 dark:text-white text-sm font-medium min-h-[36px] select-text px-2" aria-live="polite">
            {contentPartsRef.current[speechIndex]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioOverview;