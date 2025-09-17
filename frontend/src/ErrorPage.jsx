import React from "react";

function ErrorPage({ error, resetError }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 text-center px-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong 😢
      </h1>
      {error && (
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {error.message || "An unexpected error occurred."}
        </p>
      )}
      <div className="flex gap-4">
        <button
          onClick={resetError || (() => window.location.reload())}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
