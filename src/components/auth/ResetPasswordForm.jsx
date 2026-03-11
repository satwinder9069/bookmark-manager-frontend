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
    <div className="relative flex flex-col items-center justify-center p-8 min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl border border-[var(--color-border)] p-8 sm:p-10 rounded-2xl shadow-[var(--shadow-strong)] w-full max-w-md transform transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-2 tracking-tight">Secure Account</h2>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Set a new password for <span className="font-semibold text-[var(--color-text-primary)]">{email}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg relative mb-6 text-sm text-center font-medium" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full bg-[var(--color-accent)] text-white font-semibold py-3 px-4 rounded-xl shadow-[var(--shadow-soft)] 
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-secondary)] 
              transition-all duration-300 
              ${isLoading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:bg-[var(--color-accent-hover)] hover:shadow-lg transform hover:-translate-y-0.5'
              }
            `}
          >
            {isLoading ? 'Resetting...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;