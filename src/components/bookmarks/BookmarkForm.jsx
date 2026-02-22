import React, { useState , useEffect} from "react";

function BookmarkForm({initialData, onAdd, onCancel}) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description , setDescription] = useState('');
    const [notes , setNotes] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setUrl(initialData.url);
      setDescription(initialData.description || '');
      setNotes(initialData.notes || '');
      setTags(initialData.tags ? initialData.tags.join(', '): '');


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

        if(name && url) {
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !=='');
            const dataToSend = {
                name,
                url, 
                description,
                notes,
                tags: tagsArray,
            };

            if(initialData) {
            console.log("onAdd function exists:", typeof onAdd === 'function');
                onAdd(initialData._id, dataToSend);
            } else {
                
                onAdd(dataToSend);
            }

        }
    };

    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
                {initialData ? 'Edit Bookmark' : 'Add a New Bookmark'}
                </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="site-name">Site Name</label>
                <input 
                    id="site-name"
                    name="siteName"
                    className="p-2 mb-2 border border-gray-300 text-gray-900 dark:text-gray-100 rounded-md"
                    type="text" 
                    placeholder="Site Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />

                <label htmlFor="site-url">Site URL</label>
                <input
                    id="site-url"
                    name="siteUrl"
                    className="p-2 mb-2 border border-gray-300 text-gray-900 dark:text-gray-100 rounded-md"
                    type="url"
                    placeholder="Site URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="A short description of the site"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={500}
                    className="p-2 mb-2 border border-gray-300 text-gray-900 dark:text-gray-100 rounded-md"
                ></textarea>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {description.length} / 500 characters
                </p>
                
                <label htmlFor="notes">Notes</label>
                <textarea
                    id="notes"
                    name="notes"
                    className="p-2 mb-2 border border-gray-300 text-gray-900 dark:text-gray-100 rounded-md"
                    placeholder="Notes"
                    value={notes}
                    maxLength={300}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {notes.length} / 300 characters
                </p>
                <label htmlFor="tags">Tags</label>
                <input 
                    id="tags"
                    name="tags"
                    className="p-2 mb-4 border border-gray-300 text-gray-900 dark:text-gray-100 rounded-md"
                    type="text"
                    placeholder="Tags (comma-separated e.g. #new, #react)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}

                />

                <div className="flex justify-end space-x-2">
                    {initialData && (
                        <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 dark:bg-gray-500 text-white p-2 rounded-md hover:bg-gray-500 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                <button 
                type="submit" 
                className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                    {initialData ? 'Update Bookmark' : 'Add Bookmark'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookmarkForm;