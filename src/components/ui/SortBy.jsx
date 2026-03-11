import React, { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

function SortBy({ sortBy, setSortBy, sortOptions }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort By';

    return (
        <div className="relative inline-block text-left w-full sm:w-auto">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-full sm:w-auto bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border)] font-medium px-4 py-2 text-sm lg:py-2.5 rounded-lg shadow-sm hover:bg-[var(--color-border)] transition-all duration-200 flex items-center justify-between sm:justify-start space-x-2"
            >
                {/* CHANGED: Display the current sort label instead of static text */}
                <span>{currentSortLabel}</span>
                {menuOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </button>

            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-strong)] z-50 overflow-hidden">
                    {sortOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                setSortBy(opt.value);
                                setMenuOpen(false);
                            }}
                            className={`
                                block w-full text-left px-4 py-2.5 text-sm transition-colors duration-200
                                ${sortBy === opt.value
                                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold'
                                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'}
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