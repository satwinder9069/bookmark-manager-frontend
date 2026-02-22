import React from 'react';
import SidebarLink from '../layout/SidebarLink';
import { FaBookBookmark } from "react-icons/fa6";
import { TbBookmarks, TbBookmarksFilled } from "react-icons/tb";
import {AiOutlineStar, AiFillStar} from "react-icons/ai";
import { BsTags, BsFillTagsFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from '../ui/ThemeToggle';


function Sidebar({ onFilterChange , activeFilter, onLogout}) {
    return (
        <div className='w-64 h-screen sticky top-0 overflow-y-auto bg-white dark:bg-gray-800 p-6 shadow-md flex flex-col' >
            <div className='text-lg font-bold text-black dark:text-white mb-8 flex items-center space-x-2'>
                <FaBookBookmark className='text-blue-600'/>
                <span>Bookmark Manager</span>
                
            </div>

            <nav className='space-y-4 flex-1'>
                <SidebarLink 
                icon={<TbBookmarks className='text-gray-500 text-xl'/>} 
                activeIcon={<TbBookmarksFilled className='text-blue-200 text-xl'/>} 
                text={"All Bookmarks"} 
                active={activeFilter === 'All'} onClick={() => onFilterChange('All')}/>

                <SidebarLink 
                icon={<AiOutlineStar className='text-gray-500 text-xl'/>} 
                activeIcon={<AiFillStar className='text-blue-200 text-xl'/>}
                text={"Favourites"} 
                active={activeFilter === 'Favourites'} onClick={() => onFilterChange('Favourites')} />

                <SidebarLink 
                icon={<BsTags className='text-gray-500 text-xl'/>}
                activeIcon={<BsFillTagsFill className='text-blue-200 text-xl' />}
                text={"Tags"} 
                active={activeFilter === 'Tags'} onClick={() => onFilterChange('Tags')}/>
            </nav>

            <div className='flex-col space-y-4 mt-8'>
                <SidebarLink 
                icon={<FaSignOutAlt />}
                text="Logout"
                active={false}
                onClick={onLogout}
                />
            
                <div className='mt-auto'>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;