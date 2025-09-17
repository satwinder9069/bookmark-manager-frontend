import { useState, useEffect} from "react";

import BookmarkForm from "./BookmarkForm";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BookmarkList from "./BookmarkList";
import Confirmation from "./components/Confirmation";
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm';
import Toast from './components/Toast';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm'; 
import { FaBars } from "react-icons/fa";

function App() {

  const API_URL = `${import.meta.env.VITE_API_URL}/bookmarks`;
  const AUTH_URL = `${import.meta.env.VITE_API_URL}/auth`;
  //1
  const [bookmarks, setBookmarks] = useState([]);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [deletingBookmarkId , setDeletingBookmarkId] = useState(null);
  const [loading , setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [tags, setTags] = useState([]);
  const [isSidebarOpen , setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('dateDesc');
  const [authMode, setAuthMode] = useState('landing');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [toast, setToast] = useState({message: '', type: ''});
  const [resetToken, setResetToken] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authHeaders = user ? {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
  } : {
    'Content-Type': 'application/json',
  };
  
  
  useEffect(() => {
    if(toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  },[toast]);

  useEffect(() => {
        const path = window.location.pathname;
        if (path === '/reset-password') {
            const queryParams = new URLSearchParams(window.location.search);
            const tokenFromUrl = queryParams.get('token');
            const emailFromUrl = queryParams.get('email');

            if (tokenFromUrl && emailFromUrl) {
                // This now correctly calls the 'setResetToken' function from our useState hook.
                setResetToken(tokenFromUrl);
                setUserEmail(emailFromUrl);
            }
            setAuthMode('resetPassword');
        }
  }, []); // The empty array [] ensures this runs only once when the page first loads
  //4
  useEffect(() => {
    const fetchBookmarks = async () => {
  
      try {
        setLoading(true);
        const res = await fetch(API_URL, {headers: authHeaders});

        const data = await res.json();
        setBookmarks(data);

        const allTags = data.flatMap(bookmark => bookmark.tags).filter(tag => tag);
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);

      } catch(error) {
        console.error('Failed to fetch the bookmarks: ', error);
        
      } finally {
        setLoading(false);
      }
    };
    if(user){
      fetchBookmarks();
    }
    
  }, [user]);

  //2
    const addBookmark = async (newBookmark) => {
      try {
          console.log("Adding bookmark:", newBookmark);
        const res = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(newBookmark)
        });

        console.log("Add bookmark response status:", res.status);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to add bookmark. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Bookmark added, response data:", data);

        setBookmarks(prev => [...prev, data]);

        // update tags from the new bookmark
        setTags((prevTags) => {
          const newTags = [...new Set([...prevTags, ...(data.tags || [])])];
          return newTags;
        });

        setToast({message: 'Bookmarks added successfully', type: 'success'});
        
      } catch(error) {
        console.error('Failed to add bookmark:', error);
        
      } finally {
        setLoading(false);
      }
   };
  
  //4
  const handleUpdate = async (id, updateData) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: authHeaders,
          body: JSON.stringify(updateData),
      });
      const data = await res.json();
      setBookmarks(bookmarks.map((bookmark) => (bookmark._id === id ? data : bookmark)));
      setEditingBookmark(null);
      setToast({message: 'Bookmarks updated successfully.', type: 'success'});
      
    } catch(error) {
      console.error('Failed to update bookmark:', error);

    } finally {
      setLoading(false);
    }
  };

  //5
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
      setToast({message: 'Bookmark deleted successfully!', type: 'success'});
      setDeletingBookmarkId(null);
    } catch(error) {
      console.error('Failed to delete bookmark: ', error);
    }
  };
  
  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setToast({message: '', type: ''});
  };

  const handleCancelEdit = () => {
    setEditingBookmark(null);
    setToast({message: '', type: ''});
  };

  const handleCancelDelete = () => {
    setDeletingBookmarkId(null);
    
  };

  const handleConfirmDelete = (id) => {
    setDeletingBookmarkId(id);
  };

  const handleToggleFavourite = async (id, isFavourite) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ isFavourite}),
      });
      const data = await res.json();
      setBookmarks(bookmarks.map((bookmark) =>
        bookmark._id === id ? data : bookmark
      )
    );
    } catch (error) {
      console.error('Failed to toggle favourite: ', error);
    }

  };

  const handleRegister = async (userData) => {
    console.log("handleRegister called with", userData);
    try {
      const res = await fetch(`${AUTH_URL}/register`,{
        method:'POST',
        headers: authHeaders,
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log('Registered user: ',data);
      if(res.ok){
        setAuthMode('login');
        setToast({message: 'Registration successful! Please log in.', type: 'success'});
      } else {
        setToast({message: data.message , type: 'error'});
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setToast({message: 'Registration failed. Server error.', type: 'error'});
    }
  };

  const handleLogin = async (userData) => {
    try {
      const res = await fetch(`${AUTH_URL}/login`,{
        method:'POST',
        headers: authHeaders,
        body:JSON.stringify(userData),
      });
      const data = await res.json();
      console.log('Logged in user: ',data);
      
      if(res.ok && data.token){
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); //save user data
        setAuthMode('main');
        setToast({message: 'Login successful!', type: 'success'});
      }else {
        setToast({message: data.message ||'Login failed. Please check your credentials.', type: 'error'});

      }
    } catch (error){
      console.error('Login failed:', error);
      setToast({message: 'Login failed. Server error', type: 'error'});
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAuthMode('login');
    setToast({message: 'You have been logged out.', type: 'success'});
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${AUTH_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if( res.ok && data.resetUrl){
        setToast({ 
          message: `${data.message} Please check your spam folder if you don't see it.`, 
          type: 'success' 
        })
            
      } else {
            setToast({ message: data.message || 'Failed to send reset link.', type: 'error' });
        }
    } catch (error) {
        console.error('Forgot password failed:', error);
        setToast({ message: 'Failed to send reset link. Server error.', type: 'error' });
   
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (newPassword) => {
    if (!resetToken || !userEmail) {
      setToast({ 
        message: 'Your session has expired. Please request a new password reset link.', 
        type: 'error' 
      });
      return;
    }
    setIsLoading(true);

    // The payload correctly uses the state variables
    const payload = {
      password: newPassword,
      resetToken: resetToken,
      userEmail: userEmail
    };

    try {
      const res = await fetch(`${AUTH_URL}/reset-password`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      });
      const data = await res.json();
          
      if (res.ok) {
        setToast({message: data.message || "Password reset successfully!", type: 'success'});
        // Clear React State
        setResetToken(null);
        setUserEmail('');
        setAuthMode('login');

      } else {
        setToast({message: data.message || 'Failed to reset password.', type: 'error'});
      }
      } catch (error) {
          console.error('Password reset failed:', error);
          setToast({message: 'Failed to reset password. Server error.', type: 'error'});
      } finally {
        setLoading(false);
      }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    if(window.innerWidth <768) {
      setIsSidebarOpen(false);
    }
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearchItem = 
      bookmark.name.toLowerCase().includes(searchItem.toLowerCase()) || 
      bookmark.url.toLowerCase().includes(searchItem.toLowerCase()) ||
      bookmark.tags && bookmark.tags.some(tag => tag.toLowerCase().includes(searchItem.toLowerCase()));

      if (activeFilter === 'All') {
        return matchesSearchItem;

      } else if (activeFilter === 'Favourites') {
        
        return matchesSearchItem && bookmark.isFavourite;

      } else if (activeFilter === 'Tags') {
        
        return matchesSearchItem && (bookmark.tags && bookmark.tags.length > 0);
      }
      return matchesSearchItem && (bookmark.tags && bookmark.tags.includes(activeFilter));

  });

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  
  let sortedBookmarks = [...filteredBookmarks];

  if (sortBy === 'nameAsc') {
    sortedBookmarks.sort((a,b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameDesc') {
    sortedBookmarks.sort((a,b) => b.name.localeCompare(a.name));
  } else if(sortBy === 'dateDesc') {
    sortedBookmarks.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if(sortBy === 'dateAsc') {
    sortedBookmarks.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  //3
  return (

    <div className="flex min-h-screen bg-gray-200 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      
      {user && (
        <>
          {isSidebarOpen && (
            <div
              className="md:hidden fixed inset-0 z-20 bg-gray-900 bg-opacity-50"
              onClick={handleToggleSidebar}
            />
          )}
          <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30`} role="navigation">
            <Sidebar 
              onFilterChange={handleFilterChange} 
              activeFilter={activeFilter} 
              tags={tags}
              onLogout={handleLogout}
              user={user}
            />
          </div>
        </>
      )}

      {/* Hamburger Menu Button */}
      <div className={`flex-1 ${user ? 'p-4 md:p-8 lg:p-12' : ''}relative z-10`}>
        <button
          onClick={handleToggleSidebar}
          aria-expanded={isSidebarOpen}
          className="md:hidden p-2 mb-4 text-gray-700 dark:text-gray-300"
        >
          <FaBars />

        </button>
        
        {toast?.message && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: '', type: '' })}
          />
        )}
        {!user ? (
          authMode === 'landing' ? (
              <LandingPage onToggleAuthMode={setAuthMode} />
          ) : authMode === 'register' ? (
              <RegisterForm onToggleAuthMode={setAuthMode} onRegister={handleRegister} />
          ) : authMode === 'login' ? (
              <LoginForm onToggleAuthMode={setAuthMode} onLogin={handleLogin} />
          ) : authMode === 'forgotPassword' ? (
              <ForgotPasswordForm onToggleAuthMode={setAuthMode} onForgotPassword={handleForgotPassword} />
          ) : authMode === 'resetPassword' ? (
              <ResetPasswordForm onResetPassword={handleResetPassword} email={userEmail} isLoading={isLoading} />
          ) : null
        ) : (
          <>
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
            bookmarks={sortedBookmarks} //changed this from this bookmarks={filteredBookmarks}
            loading={loading}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onConfirmDelete={handleConfirmDelete}
            onToggleFavourite={handleToggleFavourite}
            
          />

          {editingBookmark && (
            <div className="fixed inset-0 bg-gray-600  bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
              <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
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
              message={"Are you sure you want to delete this bookmark?"}
              onConfirm={() => handleDelete(deletingBookmarkId)}
              onCancel={handleCancelDelete}
            />
          )}
          </>
        )}

      </div>
    </div>
  );
}
export default App;
