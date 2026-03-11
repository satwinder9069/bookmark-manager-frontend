import React from "react";

function Confirmation({ message, onConfirm, onCancel, confirmText = "Delete", confirmColor = "red", }) {

    const confirmButtonClass = confirmColor === "red"
        ? "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
        : "bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700";

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative mx-auto p-6 border border-[var(--color-border)] w-96 shadow-[var(--shadow-strong)] rounded-xl bg-[var(--color-bg-secondary)]">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-6 mb-2">
                    {message}
                </h3>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg hover:bg-[var(--color-border)] transition-colors font-medium text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`${confirmButtonClass} text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-md`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Confirmation;