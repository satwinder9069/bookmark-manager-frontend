import React, { useState } from 'react'
import BookmarkForm from '../bookmarks/BookmarkForm';
import { IoSearch } from 'react-icons/io5';
import { FaTimes } from "react-icons/fa";
import SortBy from '../ui/SortBy';
import ThemeToggle from '../ThemeToggle';
const sortOptions = [
    { value: 'dateDesc', label: 'Newest' },
    { value: 'dateAsc', label: 'Oldest' },
    { value: 'nameAsc', label: 'Title (A-Z)' },
    { value: 'nameDesc', label: 'Title (Z-A)' },
];

function Header({ onSearch, onAdd, onUpdate, initialData, onCancel, sortBy, setSortBy }) {
    const [searchItem, setSearchItem] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = () => {
        setShowForm(!showForm);
        if (initialData) {
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
        if (initialData) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    }, [initialData]);

    return (
        <div className='bg-[var(--color-bg-secondary)] p-3 sm:p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-soft)] mb-6 transition-all duration-300' >
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between'>
                <div className='relative flex items-center w-full'>
                    <IoSearch className='w-5 h-5 absolute ml-3 text-[var(--color-text-tertiary)]' />
                    <input
                        id='search'
                        name='search'
                        type='text'
                        placeholder='Search bookmarks, tags, URLs...'
                        value={searchItem}
                        onChange={handleSearchChange}
                        className='w-full pl-10 pr-4 py-2.5 rounded-lg 
                        border border-[var(--color-border)]
                        bg-[var(--color-bg-primary)]
                        focus:outline-none
                        text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]
                        focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-200'
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
                    className='flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4 w-full sm:w-auto shrink-0'
                >
                    <ThemeToggle />
                    <SortBy sortBy={sortBy} setSortBy={setSortBy} sortOptions={sortOptions} />
                    <button
                        onClick={handleToggleForm}
                        className='
                        bg-[var(--color-accent)] text-white font-semibold px-4 py-2 text-sm rounded-lg lg:px-6 lg:py-2.5 md:px-6 md:py-2 md:text-base
                        shadow-[var(--shadow-soft)] hover:bg-[var(--color-accent-hover)] transition-all duration-300 hover:shadow-[var(--shadow-strong)] transform hover:-translate-y-0.5
                        '
                    >
                        {showForm ? 'Cancel' : 'Add Bookmark'}
                    </button>
                </div>


            </div>
            {showForm && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 left-0 top-0">
                    <div className="relative mx-auto w-full max-w-lg px-4">
                        <BookmarkForm
                            initialData={initialData}
                            onAdd={initialData ? handleUpdateSubmit : handleAddSubmit}
                            onCancel={handleToggleForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );

}
export default Header;