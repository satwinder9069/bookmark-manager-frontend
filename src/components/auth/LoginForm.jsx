import React, { useState } from "react";

function LoginForm({ onLogin, onToggleAuthMode }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); //clear previous error

        if (!username || !password) {
            setError("Please enter both username and password.")
            return;
        }

        onLogin({ username, password });
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 md:p-8 min-h-[90vh] bg-[var(--color-bg-primary)]">
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-10 rounded-2xl shadow-[var(--shadow-strong)] w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] animate-fade-in relative overflow-hidden">

                {/* Decorative background blur */}
                <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[var(--color-accent)] opacity-20 rounded-full blur-[40px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-[50px] mix-blend-screen pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold text-center text-[var(--color-text-primary)] tracking-tight mb-2 animate-slide-down">
                        Welcome Back
                    </h2>
                    <p className="text-center text-[var(--color-text-secondary)] mb-8 text-sm">Sign in to manage your bookmarks</p>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl relative mb-6 animate-fade-in flex items-center shadow-sm text-sm" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5 ml-1">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200 ease-in-out hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5 ml-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200 ease-in-out hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onToggleAuthMode('forgotPassword')}
                                type="button"
                                className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-semibold transition-colors duration-200 ease-in-out"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--color-accent)] text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-secondary)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 mt-2"
                        >
                            Sign In
                        </button>

                    </form>
                    <p className="mt-8 text-center text-[var(--color-text-secondary)] text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={() => onToggleAuthMode('register')}
                            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold transition-colors duration-200 ease-in-out"
                        >
                            Register now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default LoginForm;