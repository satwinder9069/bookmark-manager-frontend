import React, { useState } from 'react';

function ForgotPasswordForm({ onForgotPassword, onToggleAuthMode }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    onForgotPassword(email);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center mb-6">Forgot Password</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition duration-200 ease-in-out transform hover:scale-[1.02]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send Reset Link
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Back to{' '}
          <button
            onClick={() => onToggleAuthMode('login')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition duration-200 ease-in-out"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;