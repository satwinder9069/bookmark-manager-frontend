import React, { useState } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';


function Bookmark({ bookmark, onEdit, onConfirmDelete, onToggleFavourite }) {

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
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
            <div className="flex-1">
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-semibold text-lg line-clamp-2">
                    {bookmark.name}
                </a>
                {bookmark.description && (
                    <div className="mt-3">
                        <p className={`text-[var(--color-text-secondary)] text-sm leading-relaxed ${!isDescriptionExpanded && isLongDescription ? 'line-clamp-2' : ''}`}>
                            {bookmark.description}
                        </p>
                        {isLongDescription && (
                            <button onClick={() => toggleDescriptionExpanded()} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors mt-1 text-xs font-medium focus:outline-none">
                                {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                )}


                {bookmark.notes && (
                    <div className="mt-3 bg-[var(--color-bg-tertiary)] p-3 rounded-xl border border-[var(--color-border)]">
                        <p className={`text-[var(--color-text-secondary)] text-sm italic ${!isNotesExpanded && isLongNotes ? 'line-clamp-2' : ''}`}>
                            "{bookmark.notes}"
                        </p>
                        {isLongNotes && (
                            <button onClick={() => toggleNotesExpanded()} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors mt-1 text-xs font-medium focus:outline-none">
                                {isNotesExpanded ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                )}

                {bookmark.tags && bookmark.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {bookmark.tags.map((tag, index) => (
                            <span key={index} className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)] text-xs font-medium px-2.5 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-border)]">
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(bookmark)}
                        className="bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-medium" >
                        Edit
                    </button>
                    <button
                        onClick={() => onConfirmDelete(bookmark._id)}
                        className="bg-[var(--color-bg-tertiary)] text-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-medium"
                    >
                        Delete
                    </button>
                </div>

                <button
                    onClick={handleToggleFavourite}
                    className={`p-2 rounded-full transition-all duration-300 ${bookmark.isFavourite ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-tertiary)] hover:text-red-500'}`}
                >
                    {bookmark.isFavourite ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
                </button>
            </div>


        </div>
    );
}

export default Bookmark;