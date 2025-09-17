import React, { useState } from 'react';

function ResetPasswordForm({ onResetPassword, email, isLoading }) {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    onResetPassword(password);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center mb-6">Reset Password</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter a new password for <strong>{email}</strong>
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition duration-200 ease-in-out transform hover:scale-[1.02]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition duration-200 ease-in-out transform hover:scale-[1.02]"
              required
            />
          </div>
          <button
            type="submit"
            className={`
              w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md 
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              transition duration-300 ease-in-out transform hover:scale-105
              ${isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'hover:bg-blue-700 transform hover:scale-105'
              }
            `}
            >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;