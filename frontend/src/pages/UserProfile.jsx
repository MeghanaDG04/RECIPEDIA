import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Settings, Edit, Save, X, Trash2, PlusCircle, AlertTriangle } from 'lucide-react';

import { userAPI } from '../api'; // Your centralized API service
import { authService } from '../services/authService';

// Reusable Loader component with better styling
const Loader = ({ small = false }) => (
  <div className={`flex justify-center items-center ${small ? 'h-5 w-5' : 'h-64'}`}>
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-red-500 ${small ? 'h-5 w-5' : 'h-12 w-12'}`}></div>
  </div>
);

// Framer Motion Variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError('');
        setLoading(true);
        const response = await userAPI.getProfile();
        if (response.success) {
          setUserData(response.data);
          setFormData(response.data);
        } else {
          setError(response.message || 'Failed to fetch profile.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching your profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      const response = await userAPI.updateProfile(formData);
      if (response.success) {
        setUserData(response.data);
        setIsEditing(false);
      } else {
        setError(response.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you absolutely sure? This action is irreversible and will permanently delete your account and all associated data.')) {
      try {
        await userAPI.deleteAccount();
        authService.clearAuth();
        window.location.href = '/'; // Force a full reload to clear all state
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete account.');
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'recipes', label: 'My Recipes', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // While loading, show a full-page loader
  if (loading) {
    return <div className="pt-24"><Loader /></div>;
  }

  // CRITICAL FIX: After loading, if userData is still null (due to an error),
  // show a dedicated error screen instead of trying to render the dashboard.
  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 text-center px-4">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Could Not Load Profile</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{error || "We couldn't retrieve your data. Please try logging in again."}</p>
        <button
          onClick={() => {
            authService.clearAuth();
            window.location.href = '/login';
          }}
          className="mt-6 px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // If we reach here, data has loaded successfully and userData is available.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-28 pb-12"
    >
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header 
          variants={childVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">My Dashboard</h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Welcome back, <span className="font-semibold text-red-500">{userData.username}</span>!
          </p>
        </motion.header>
        
        {error && !isEditing && ( // Only show non-critical errors if not in editing mode
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 flex items-center gap-3"
          >
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <motion.aside
            variants={childVariants}
            initial="hidden"
            animate="visible"
            className="md:w-1/4"
          >
            <nav className="flex flex-row md:flex-col gap-2 p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 md:w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 dark:focus-visible:ring-offset-slate-900
                    ${activeTab === tab.id ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'}
                  `}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-md"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10"><tab.icon size={20} /></span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </nav>
          </motion.aside>

          <motion.div
            variants={childVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg min-h-[400px] border border-gray-200 dark:border-slate-700">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
                      {!isEditing && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }} 
                          onClick={() => setIsEditing(true)} 
                          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                        >
                          <Edit size={16} /> Edit
                        </motion.button>
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.form
                          key="edit-form"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0 }}
                          onSubmit={handleUpdateProfile} 
                          className="space-y-6"
                        >
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center gap-3"
                            >
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              <span>{error}</span>
                            </motion.div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div variants={childVariants} className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                              <input 
                                type="text" 
                                name="username" 
                                value={formData.username || ''} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                              />
                            </motion.div>
                            <motion.div variants={childVariants} className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                              <input 
                                type="email" 
                                name="email" 
                                value={formData.email || ''} 
                                disabled 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                              />
                            </motion.div>
                            <motion.div variants={childVariants} className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                              <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone || ''} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                              />
                            </motion.div>
                            <motion.div variants={childVariants} className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                              <input 
                                type="number" 
                                name="age" 
                                value={formData.age || ''} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                              />
                            </motion.div>
                          </div>
                          <motion.div variants={childVariants} className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                            <textarea 
                              name="address" 
                              value={formData.address || ''} 
                              onChange={handleInputChange} 
                              rows="3" 
                              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                            ></textarea>
                          </motion.div>
                          
                          <motion.div variants={childVariants} className="flex items-center justify-end gap-4 pt-4">
                            <motion.button 
                              type="button" 
                              whileHover={{ scale: 1.05 }} 
                              whileTap={{ scale: 0.95 }} 
                              onClick={() => { setIsEditing(false); setFormData(userData); setError('') }} 
                              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition dark:bg-slate-600 dark:text-gray-200 dark:hover:bg-slate-500"
                            >
                              <X size={16} /> Cancel
                            </motion.button>
                            <motion.button 
                              type="submit" 
                              whileHover={{ scale: 1.05 }} 
                              whileTap={{ scale: 0.95 }} 
                              disabled={isSaving} 
                              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md hover:shadow-xl transition disabled:opacity-50"
                            >
                              {isSaving ? <Loader small={true} /> : <Save size={16} />} {isSaving ? 'Saving...' : 'Save'}
                            </motion.button>
                          </motion.div>
                        </motion.form>
                      ) : (
                        <motion.div
                          key="view-profile"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div 
                              variants={childVariants} 
                              className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600"
                            >
                              <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</strong>
                              <span className="text-lg font-semibold text-gray-900 dark:text-white">{userData.username}</span>
                            </motion.div>
                            <motion.div 
                              variants={childVariants} 
                              className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600"
                            >
                              <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</strong>
                              <span className="text-lg font-semibold text-gray-900 dark:text-white">{userData.email}</span>
                            </motion.div>
                            <motion.div 
                              variants={childVariants} 
                              className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600"
                            >
                              <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</strong>
                              <span className="text-lg font-semibold text-gray-900 dark:text-white">{userData.phone || 'Not set'}</span>
                            </motion.div>
                            <motion.div 
                              variants={childVariants} 
                              className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600"
                            >
                              <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</strong>
                              <span className="text-lg font-semibold text-gray-900 dark:text-white">{userData.age || 'Not set'}</span>
                            </motion.div>
                          </div>
                          <motion.div 
                            variants={childVariants} 
                            className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600"
                          >
                            <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</strong>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">{userData.address || 'Not set'}</span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                
                {activeTab === 'recipes' && (
                  <motion.div
                    key="recipes"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Recipes</h2>
                    <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50/50 dark:bg-slate-800/20">
                      <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't added any recipes yet.</p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        onClick={() => navigate('/add-recipe')} 
                        className="inline-flex items-center mx-auto gap-2 px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <PlusCircle size={18} /> Add Your First Recipe
                      </motion.button>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Account Settings</h2>
                    <div className="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg shadow-sm">
                      <h3 className="font-bold text-red-800 dark:text-red-300">Danger Zone</h3>
                      <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                        Once you delete your account, all of your data, including recipes and comments, will be permanently removed. This action cannot be undone.
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        onClick={handleDeleteAccount} 
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                      >
                        <Trash2 size={16} /> Delete My Account Permanently
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default UserProfile;
