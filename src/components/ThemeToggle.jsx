import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

function Themetoggle() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if(theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);

    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <button
            onClick={toggleTheme}
            className="
                flex items-center space-x-2 w-full px-4 py-2 rounded-md
                bg-gray-200 dark:bg-gray-600
                text-gray-600 dark:text-gray-200
                transition"
        >
            {/* {theme === 'dark' ? 'Light Mode' : 'Dark Mode'} */}
            {theme === 'dark' ? (
                <>
                <CiLight className="text-yellow-400 text-xl" />
                <span>Light Mode</span>
                </>
            ) : (
                <>
                <MdDarkMode className="text-gray-900 text-xl" />
                <span>Dark Mode</span>
                </>
            )}

        </button>
    );
}

export default Themetoggle;

// import { MdDarkMode } from "react-icons/md";
// import { CiLight } from "react-icons/ci";
