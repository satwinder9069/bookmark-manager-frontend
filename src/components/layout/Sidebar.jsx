import React from 'react';
import SidebarLink from '../layout/SidebarLink';
import { FaBookBookmark } from "react-icons/fa6";
import { TbBookmarks, TbBookmarksFilled } from "react-icons/tb";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsTags, BsFillTagsFill, BsHash } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar({ onFilterChange, activeFilter, onLogout, tags = [] }) {
    return (
        <div className='w-64 h-screen sticky top-0 overflow-y-auto bg-[var(--color-bg-secondary)] p-6 flex flex-col' >
            <div className='text-lg font-bold text-[var(--color-text-primary)] mb-8 flex items-center space-x-2'>
                <FaBookBookmark className='text-[var(--color-accent)]' />
                <span>Bookmark Manager</span>

            </div>

            <nav className='space-y-4 flex-1'>
                <SidebarLink
                    icon={<TbBookmarks className='text-gray-500 text-xl' />}
                    activeIcon={<TbBookmarksFilled className='text-blue-200 text-xl' />}
                    text={"All Bookmarks"}
                    active={activeFilter === 'All'} onClick={() => onFilterChange('All')} />

                <SidebarLink
                    icon={<AiOutlineStar className='text-gray-500 text-xl' />}
                    activeIcon={<AiFillStar className='text-blue-200 text-xl' />}
                    text={"Favourites"}
                    active={activeFilter === 'Favourites'} onClick={() => onFilterChange('Favourites')} />

                <SidebarLink
                    icon={<BsTags className='text-gray-500 text-xl' />}
                    activeIcon={<BsFillTagsFill className='text-blue-200 text-xl' />}
                    text={"Tags"}
                    active={activeFilter === 'Tags'} onClick={() => onFilterChange('Tags')} />

                {tags.length > 0 && (
                    <div className="pt-2 pb-1">
                        <p className="px-4 text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
                            Your Tags
                        </p>
                        <div className="space-y-1">
                            {tags.map((tag) => (
                                <SidebarLink
                                    key={tag}
                                    icon={<BsHash className='text-gray-400 text-lg' />}
                                    activeIcon={<BsHash className='text-[var(--color-accent)] text-lg' />}
                                    text={tag}
                                    active={activeFilter === tag}
                                    onClick={() => onFilterChange(tag)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <div className='mt-auto flex-col space-y-4 pt-8 border-t border-[var(--color-border)]'>
                <SidebarLink
                    icon={<FaSignOutAlt className='text-red-500/80 text-xl' />}
                    text="Logout"
                    active={false}
                    onClick={onLogout}
                />
            </div>
        </div>
    );
}

export default Sidebar;