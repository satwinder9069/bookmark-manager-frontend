import React from "react";

function LandingPageV2( { onToggleAuthMode }) {
    return (
     <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        {/* Navbar */}
        <nav className="container-center py-6">
            <div className="flex items-center ">
                <h1 className="text-2xl font-semibold">Bookmarks</h1>
                <button
                onClick={() => onToggleAuthMode('login')}
                className="btn-secondary"
                >
                    Sign In
                </button>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="container-center py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Your Bookmarks
                </h1>

            </div>

        </section>
     </div>
    );
}

export default LandingPageV2;