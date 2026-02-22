import React, { useState } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';


function Bookmark({bookmark, onEdit,  onConfirmDelete, onToggleFavourite}) {

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isNotesExpanded, setIsNotesExpanded] = useState(false);

    const toggleDescriptionExpanded = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    }
    const toggleNotesExpanded = () => {
        setIsNotesExpanded(!isNotesExpanded);
    }

    const handleToggleFavourite = () => {
        console.log('Button clicked for bookmark:', bookmark._id);
        const newFavouriteStatus = !bookmark.isFavourite;
        console.log('New favourite status:', newFavouriteStatus); 
        onToggleFavourite(bookmark._id, newFavouriteStatus);
    };

    const description = bookmark.description;
    const isLongDescription = description && description.length > 100;
    const note = bookmark.notes;
    const isLongNotes = note && note.length > 100;

     if (!bookmark) return <div>No bookmark!</div>;


    return (
        <div className="bg-white dark:bg-gray-300 p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div className="flex-1">
                <a href={bookmark.url} target="_blank" rel="noopener noreferer" className="text-blue-500 dark:text-blue-700 hover:underline font-semibold text-lg">
                {bookmark.name}
                </a>
                {bookmark.description && (
                    <>
                      <p className={`text-gray-500 mt-2 text-sm ${!isDescriptionExpanded && isLongDescription ? 'line-clamp-2' : ''}`}>
                        {bookmark.description}
                      </p>
                      {isLongDescription && (
                        <button onClick={() => toggleDescriptionExpanded()} className="text-blue-500 dark:text-blue-700 hover:underline mt-1 text-sm focus:outline-none">
                          {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                        </button>
                      )}

                    </>
                )}
                

                {bookmark.notes && (
                    <>
                    <p className={`text-gray-600 mt-2 text-sm italic ${!isNotesExpanded && isLongNotes ? 'line-clamp-2': ''}`}>
                        "{bookmark.notes}"
                    </p>
                    {isLongNotes && (
                        <button onClick={() => toggleNotesExpanded()} className="text-blue-500 hover:underline mt-1 text-sm focus: outline-none">
                            {isNotesExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                    </>

                )}

                {bookmark.tags && bookmark.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {bookmark.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-800 text-xs text-white font-medium px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

            </div>
            <div className="flex items-center space-x-2 mt-4">
                <button onClick={() => onEdit(bookmark)}
                
                className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-xs" >
                    Edit
                </button>
                <button 
                    onClick={() => onConfirmDelete(bookmark._id)} 
                    className="bg-red-500 dark:bg-red-600 text-white p-2 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors text-xs" 
                >
                    Delete
                </button>
                
                <button
                    onClick={handleToggleFavourite}
                    className={`p-1 rounded-full transition-colors ${bookmark.isFavourite ? 'text-red-500 dark:text-red-600 hover:text-red-600': 'text-gray-400 dark:text-gray-500 hover:text-red-500'}`}
                    >
                    {bookmark.isFavourite ? <FaHeart /> : <FaRegHeart />}
                </button>

            </div>


        </div>
    );
}

export default Bookmark;