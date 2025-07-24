import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Error.css"

const NotFound = () => {
  return (
     <div className="flex items-center justify-center mt-[100px]">
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-lg shadow-lg text-center max-w-md">
        {/* Yellow Triangle Icon */}
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4 mx-auto" />

        <h1 className="text-6xl font-bold text-red-500 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
