import React from "react";
import { FaBookBookmark } from "react-icons/fa6";

function EmptyState(/*{ onAdd }*/) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-300 to-gray-600 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-500 rounded-lg shadow-md min-h-[400px] transition-all duration-300">
            <FaBookBookmark className="text-blue-600 text-5xl mb-4"/>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No bookmarks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                Start building your bookmark collection by adding your first bookmark.
            </p>
            {/* <button
                onClick={onAdd}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
                Add Your First Bookmark
            </button> */}

        </div>
    );
}
export default EmptyState;
