import React, {useMemo} from "react";

function LandingPage({ onToggleAuthMode }) {
  // Generate some floating shapes
  const shapes = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 40, // size between 40px and 100px
      left: `${Math.random() * 100}%`, // random horizontal position
      delay: `${Math.random() * 5}s`, // random delay
      duration: `${Math.random() * 10 + 5}s`, // random duration between 5s and 15s
    }));
  }, []); 

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-200 to-indigo-800 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-500 text-white dark:text-white p-6">
      
      {/* Floating animated shapes */}
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="floating-shape"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: shape.left,
            animationDelay: shape.delay,
            animationDuration: shape.duration,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to Bookmark Manager
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Organize, search, and manage your favorite web links with ease.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onToggleAuthMode('login')}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => onToggleAuthMode('register')}
            className="bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;