import React from "react";

function SidebarLink({ icon, text, active, onClick, activeIcon }) {
    const activeClass = active
        ? 'bg-[var(--color-accent)] text-white shadow-md'
        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]';

    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeClass}`}
        >
            {/* {icon} */}
            <span>{active ? activeIcon : icon}</span>
            <span>{text}</span>

        </button>
    )
}
export default SidebarLink;