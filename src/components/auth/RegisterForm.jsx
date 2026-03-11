import React, { useState } from "react";

function RegisterForm({ onRegister, onToggleAuthMode }) {
    console.log("RegisterForm mounted");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register clicked", { username, password, confirmPassword, email });
        setError(''); //clear previous error ;)

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Password do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        onRegister({ username, email, password });

    };

    return (
        <div className="flex flex-col items-center justify-center p-6 md:p-8 min-h-[90vh] bg-[var(--color-bg-primary)]">
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 md:p-10 rounded-2xl shadow-[var(--shadow-strong)] w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] animate-fade-in relative overflow-hidden">

                {/* Decorative background blur */}
                <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[var(--color-accent)] opacity-20 rounded-full blur-[40px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-[50px] mix-blend-screen pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold text-center text-[var(--color-text-primary)] tracking-tight mb-2 animate-slide-down">
                        Create Account
                    </h2>
                    <p className="text-center text-[var(--color-text-secondary)] mb-8 text-sm">Join us to organize your web</p>

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
                                autoComplete="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200 ease-in-out hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5 ml-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                autoComplete="new-password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200 ease-in-out hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5 ml-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200 ease-in-out hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[var(--color-accent)] text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-secondary)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 mt-4"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-8 text-center text-[var(--color-text-secondary)] text-sm">
                        Already have an account?{' '}
                        <button
                            onClick={() => onToggleAuthMode('login')}
                            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold transition-colors duration-200 ease-in-out"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;