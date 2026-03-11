import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Toast from "../components/ui/Toast";
import Header from "../components/layout/Header";
import BookmarkList from "../components/bookmarks/BookmarkList";
import BookmarkForm from "../components/bookmarks/BookmarkForm";
import Confirmation from "../components/ui/Confirmation";
import { FaBars } from "react-icons/fa";
import { bookmarkService } from "../services/bookmarkService";

const DashboardPage = () => {
    const { user, logout, getAuthHeaders } = useAuth();

    const [bookmarks, setBookmarks] = useState([]);
    const [editingBookmark, setEditingBookmark] = useState(null);
    const [deletingBookmarkId, setDeletingBookmarkId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [tags, setTags] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sortBy, setSortBy] = useState('dateDesc');
    const [toast, setToast] = useState({ message: '', type: '' });
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => {
                setToast({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                setLoading(true);
                const data = await bookmarkService.getAll(getAuthHeaders);

                setBookmarks(data);

                const allTags = data.flatMap(bookmark => bookmark.tags || []).filter(tag => tag);

                const uniqueTags = [...new Set(allTags)];
                setTags(uniqueTags);
            } catch (error) {
                console.error('Failed to fetch bookmarks: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchBookmarks();
        }
    }, [user]);

    // Add bookmarks
    const addBookmark = async (newBookmark) => {
        try {
            const data = await bookmarkService.create(newBookmark, getAuthHeaders);

            setBookmarks(prev => [...prev, data]);
            setTags(prevTags => [...new Set([...prevTags, ...(data.tags || [])])]);

            setToast({ message: 'Bookmark added successfully', type: 'success' });
        } catch (error) {
            console.error('Failed to add bookmark: ', error);
            setToast({ message: 'Failed to add bookmark', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Update bookmarks
    const handleUpdate = async (id, updateData) => {
        try {
            const data = await bookmarkService.update(id, updateData, getAuthHeaders);

            setBookmarks(bookmarks.map(bookmark => (bookmark._id === id ? data : bookmark)));
            setEditingBookmark(null);

            setToast({ message: 'Bookmark updated successfully', type: 'success' });
        } catch (error) {
            console.error('Failed to update bookmark: ', error);
            setToast({ message: 'Failed to update bookmark', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Delete bookmarks
    const handleDelete = async (id) => {
        try {
            await bookmarkService.delete(id, getAuthHeaders);

            setBookmarks(bookmarks.filter(bookmark => (bookmark._id !== id)));
            setToast({ message: 'Bookmark deleted successfully', type: 'success' });
            setDeletingBookmarkId(null);

        } catch (error) {
            console.error('Failed to delete bookmark: ', error);
            setToast({ message: 'Failed to delete bookmark: ', type: 'error' });
        }
    };

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
        setIsSidebarOpen(false);
    };

    const handleConfirmLogout = () => {
        setShowLogoutConfirm(false);
        logout();
        setToast({ message: 'You have been logged out', type: 'success' });
    };

    const handleCancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const handleEdit = (bookmark) => {
        setEditingBookmark(bookmark);
    };

    const handleCancelEdit = () => {
        setEditingBookmark(null);
    };

    const handleConfirmDelete = (id) => {
        setDeletingBookmarkId(id);
    };

    const handleCancelDelete = () => {
        setDeletingBookmarkId(null);
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    // Favourit bookmarks
    const handleToggleFavourite = async (id, isFavourite) => {
        try {
            const data = await bookmarkService.toggleFavourite(id, isFavourite, getAuthHeaders);

            setBookmarks(bookmarks.map(bookmark => (bookmark._id === id ? data : bookmark)));
        } catch (error) {
            console.error('Failed to toggle favourite: ', error);
        }
    };

    // sidebar
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const filteredBookmarks = bookmarks.filter(bookmark => {
        const matchesSearchItem =
            (bookmark.name.toLowerCase().includes(searchItem.toLowerCase())) ||
            (bookmark.url.toLowerCase().includes(searchItem.toLowerCase())) ||
            (bookmark.tags.some(tag => tag && tag.toLowerCase().includes(searchItem.toLowerCase())));

        if (activeFilter === 'All') {
            return matchesSearchItem;
        } else if (activeFilter === 'Favourites') {
            return matchesSearchItem && bookmark.isFavourite === true;
        } else if (activeFilter === 'Tags') {
            return matchesSearchItem && bookmark.tags && bookmark.tags.length > 0;
        }

        // Exact tag match
        return matchesSearchItem && bookmark.tags && bookmark.tags.includes(activeFilter);
    });

    let sortedBookmarks = [...filteredBookmarks];
    if (sortBy === 'nameAsc') {
        sortedBookmarks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameDesc') {
        sortedBookmarks.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'dateDesc') {
        sortedBookmarks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'dateAsc') {
        sortedBookmarks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return (
        <div className="flex min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300">
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 z-20 bg-gray-900 bg-opacity-50"
                    onClick={handleToggleSidebar}
                />
            )}

            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30 border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-[var(--shadow-soft)]`}>
                <Sidebar
                    onFilterChange={handleFilterChange}
                    activeFilter={activeFilter}
                    tags={tags}
                    onLogout={handleLogoutClick}
                    user={user}
                />
            </div>
            <div className="flex-1 p-4 md:p-6 lg:p-10 relative z-10 w-full overflow-y-auto">
                <button
                    onClick={handleToggleSidebar}
                    className="md:hidden p-2 mb-4 text-gray-700 dark:text-gray-300"
                >
                    <FaBars />
                </button>

                {toast.message && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast({ message: '', type: '' })}
                    />
                )}

                <Header
                    onSearch={setSearchItem}
                    onAdd={addBookmark}
                    onUpdate={handleUpdate}
                    initialData={editingBookmark}
                    onCancel={handleCancelEdit}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                <BookmarkList
                    bookmarks={sortedBookmarks}
                    loading={loading}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onConfirmDelete={handleConfirmDelete}
                    onToggleFavourite={handleToggleFavourite}
                />

                {editingBookmark && (
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 left-0 top-0">
                        <div className="relative mx-auto w-full max-w-lg px-4 my-6">
                            <BookmarkForm
                                initialData={editingBookmark}
                                onAdd={handleUpdate}
                                onCancel={handleCancelEdit}
                            />
                        </div>
                    </div>
                )}

                {deletingBookmarkId && (
                    <Confirmation
                        message="Are you sure you want to delete this bookmark?"
                        onConfirm={() => handleDelete(deletingBookmarkId)}
                        onCancel={handleCancelDelete}
                        confirmText="Delete"
                        confirmColor="red"
                    />
                )}

                {showLogoutConfirm && (
                    <Confirmation
                        message={"Are you sure you want to logout?"}
                        onConfirm={handleConfirmLogout}
                        onCancel={handleCancelLogout}
                        confirmText="Logout"
                        confirmColor="blue"
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;