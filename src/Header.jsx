import React, { useState } from 'react'
import BookmarkForm from './BookmarkForm';
import { IoSearch } from 'react-icons/io5';
import { FaTimes } from "react-icons/fa";
import SortBy from './components/SortBy';

const sortOptions = [
    { value: 'date_desc', label: 'Newest' },
    { value: 'date_asc', label: 'Oldest' },
    { value: 'title_asc', label: 'Title (A-Z)' },
    { value: 'title_desc', label: 'Title (Z-A)' },
];

function Header({ onSearch, onAdd, onUpdate, initialData, onCancel, sortBy, setSortBy }) {
    const [searchItem , setSearchItem] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = () => {
        setShowForm(!showForm);
        if(initialData) {
            onCancel();
        }
    };

    const handleSearchChange = (e) => {
        const item = e.target.value;
        setSearchItem(item);
        onSearch(item);
    };

    const handleAddSubmit = (data) => {
        onAdd(data);
        setShowForm(false);
    };

    const handleUpdateSubmit = (id, data) => {
        onUpdate(id, data);
        setShowForm(false);
    }

    //to show the form if we are in edit mode
    React.useEffect(() => {
        if(initialData) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    }, [initialData]);
    
    return(
        <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6' >
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center'>
                <div className='relative flex items-center'>
                    <IoSearch className='w-5 h-5 absolute ml-3 text-gray-400 dark:text-gray-500 '/>
                    <input
                        type='text'
                        placeholder='Search'
                        value={searchItem}
                        onChange={handleSearchChange}
                        className='w-full pl-10 pr-4 py-1 rounded-md 
                        border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800

                        focus:outline-none
                        text-gray-900 dark:text-gray-100
                        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600'
                    />
                    {searchItem && (
                        <button
                        onClick={() => {
                            setSearchItem('');
                            onSearch('');
                        }}
                        className="absolute right-0 mr-3 text-gray-400 dark:text-gray-600 hover:text-gray-600"
                        >
                        <FaTimes size={16} />
                        </button>
                    )}
                    
                </div>
                <div
                    className='flex items-center space-x-4'
                >
                    <SortBy sortBy={sortBy} setSortBy={setSortBy} sortOptions={sortOptions}/>
                    <button
                        onClick={handleToggleForm}
                        className='
                        bg-blue-600 text-white font-semibold px-4 py-2 text-sm rounded-md lg:px-6 lg:py-2 md:px-6 md:py-1.5 md:text-base
                        shadow-md hover:bg-blue-700 transition-colors
                        '
                    >
                        {showForm ? 'Cancel' : 'Add Bookmark'}
                    </button>
                </div>
                
                    
            </div>
            {showForm && (
                <div
                className='mt-6'>
                    <BookmarkForm 
                        initialData={initialData}
                        onAdd={initialData ? handleUpdateSubmit : handleAddSubmit}
                        onCancel={handleToggleForm}
                    />
                </div>
            )}
        </div>
    );
    
}
export default Header;