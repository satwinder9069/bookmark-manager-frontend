import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

function Toast({ message, type, onClose, duration = 3000 }) {
    const toastClasses = {
        success: 'bg-emerald-500/90 dark:bg-emerald-500/20 border-emerald-500/50 text-white dark:text-emerald-400',
        error: 'bg-rose-500/90 dark:bg-rose-500/20 border-rose-500/50 text-white dark:text-rose-400',
        info: 'bg-[var(--color-accent)]/90 dark:bg-[var(--color-accent)]/20 border-[var(--color-accent)]/50 text-white dark:text-[var(--color-accent)]',
    };

    const iconClasses = {
        success: <FaCheckCircle className="shrink-0 text-white dark:text-emerald-400 text-lg" />,
        error: <FaTimesCircle className="shrink-0 text-white dark:text-rose-400 text-lg" />,
        info: <FaInfoCircle className="shrink-0 text-white dark:text-[var(--color-accent)] text-lg" />,
    };

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl shadow-[var(--shadow-strong)] font-medium flex items-center space-x-3 transition-all duration-300 z-[100] border backdrop-blur-md animate-[slideUp_0.4s_ease-out_forwards] ${toastClasses[type]}`}
            role="alert"
        >
            {iconClasses[type]}
            <span className="text-sm sm:text-base mr-2">{message}</span>
            <button
                className="ml-auto flex-shrink-0 p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
                onClick={onClose}
                aria-label="Close"
            >
                <FaTimesCircle className="text-sm" />
            </button>
        </div>
    );
}

export default Toast;