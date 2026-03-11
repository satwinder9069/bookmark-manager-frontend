import React, { useState, useEffect } from "react";

function BookmarkForm({ initialData, onAdd, onCancel }) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setUrl(initialData.url);
            setDescription(initialData.description || '');
            setNotes(initialData.notes || '');
            setTags(initialData.tags ? initialData.tags.join(', ') : '');


        } else {
            setName('');
            setUrl('');
            setDescription('');
            setNotes('');
            setTags('');
        }

    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name && url) {
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            const dataToSend = {
                name,
                url,
                description,
                notes,
                tags: tagsArray,
            };

            if (initialData) {
                console.log("onAdd function exists:", typeof onAdd === 'function');
                onAdd(initialData._id, dataToSend);
            } else {

                onAdd(dataToSend);
            }

        }
    };

    return (
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 sm:p-8 rounded-xl shadow-[var(--shadow-strong)] w-full max-w-lg max-h-[85vh] flex flex-col my-auto overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-[var(--color-text-primary)] shrink-0">
                {initialData ? 'Edit Bookmark' : 'Add a New Bookmark'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <div>
                    <label htmlFor="site-name" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Site Name</label>
                    <input
                        id="site-name"
                        name="siteName"
                        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200"
                        type="text"
                        placeholder="Site Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="site-url" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Site URL</label>
                    <input
                        id="site-url"
                        name="siteUrl"
                        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200"
                        type="url"
                        placeholder="Site URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="A short description of the site"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={500}
                        rows={2}
                        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200 resize-none min-h-[60px] sm:min-h-[80px]"
                    ></textarea>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1 text-right">
                        {description.length} / 500 characters
                    </p>
                </div>

                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200 resize-none min-h-[50px] sm:min-h-[60px]"
                        placeholder="Personal notes..."
                        value={notes}
                        maxLength={300}
                        rows={2}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1 text-right">
                        {notes.length} / 300 characters
                    </p>
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Tags</label>
                    <input
                        id="tags"
                        name="tags"
                        className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition-all duration-200"
                        type="text"
                        placeholder="e.g. react, tutorial, design"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <div className="flex justify-end space-x-2 sm:space-x-3 mt-4 sm:mt-6 pt-4 border-t border-[var(--color-border)] shrink-0">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-border)] transition-colors font-medium text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--color-accent)] text-white shadow-md rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors font-medium text-sm"
                    >
                        {initialData ? 'Update Bookmark' : 'Add Bookmark'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookmarkForm;