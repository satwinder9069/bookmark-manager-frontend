import React, { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

function SortBy({ sortBy, setSortBy, sortOptions }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort By';

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-blue-600 text-white font-semibold px-4 py-1.5 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
                {/* CHANGED: Display the current sort label instead of static text */}
                <span>{currentSortLabel}</span>
                {menuOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </button>

            {menuOpen && (
                <div className="absolute mt-2 w-40 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    {sortOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                setSortBy(opt.value);
                                setMenuOpen(false);
                            }}
                            // You can add a highlight to the currently active sort option
                            className={`
                                block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 
                                hover:bg-gray-100 dark:hover:bg-gray-700
                                ${sortBy === opt.value ? 'font-bold bg-gray-100 dark:bg-gray-700' : ''}
                            `}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SortBy;