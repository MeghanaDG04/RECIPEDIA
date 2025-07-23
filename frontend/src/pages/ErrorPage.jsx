import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-red-300 text-center mt-[150px]">
        <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 text-6xl mb-4" />
        <h1 className="text-4xl font-bold text-red-700 mb-4">Something Went Wrong</h1>
        <p className="text-gray-700 mb-2">
          An unexpected error occurred while loading this page.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Please try again later or contact support.
        </p>
        <Link to="/" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
