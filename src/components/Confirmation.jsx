import React from "react";

function Confirmation({ message , onConfirm , onCancel}) {
    return (
        <div className="fixed inset-0 bg-gray-400 dark:bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-500">
                <h3 className="text-lg font-bold text-gray-900 dark:text-black leading-6">{message}</h3>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-300 p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 dark:bg-red-600 text-white p-2 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Confirmation;