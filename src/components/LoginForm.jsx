import React, { useState } from "react";

function LoginForm({onLogin , onToggleAuthMode}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); //clear previous error
        
        if(!username || !password){
            setError("Please enter both username and password.")
            return;
        }

        onLogin({username,password});
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 
        bg-gradient-to-br from-blue-200 to-indigo-800 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-500 min-h-screen">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md 
            transform transition-all duration-300 hover:scale-[1.01] animate-fade-in">

                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-6 animate-slide-down"> 
                    Welcome Back!
                </h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-fade-in" role="alert">
                        <span className="block sm:inline">{error}</span>

                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 
                        transition duration-200 ease-in-out transform hover:scale-[1.02]"
                        required
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition duration-200 ease-in-out transform hover:scale-[1.02]"
                        required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                        onClick={() => onToggleAuthMode('forgotPassword')}
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition duration-200 ease-in-out"
                        >
                        Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Login
                    </button>

                </form>
                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                        onClick={() => onToggleAuthMode('register')}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition duration-200 ease-in-out"
                    >
                        Register now
                    </button>
                </p>

            </div>

        </div>
    );
}
export default LoginForm;