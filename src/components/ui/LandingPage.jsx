import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaRegHeart } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { TbBookmarks, TbBookmarksFilled } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import ThemeToggle from "../ThemeToggle";

function LandingPage({ onToggleAuthMode }) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden transition-colors duration-500 font-sans selection:bg-[var(--color-accent)] selection:text-white">

      {/* Background glowing orbs (Glassmorphism effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)] opacity-20 dark:opacity-30 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4f46e5] dark:bg-[#7c3aed] opacity-20 dark:opacity-30 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      {/* Navbar Minimal */}
      <nav className="relative z-20 flex justify-between items-center px-6 py-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-2xl font-bold tracking-tight"
        >
          <TbBookmarksFilled className="text-[var(--color-accent)] text-3xl" />
          <span>Bookmark Manager</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-6"
        >
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <button
            onClick={() => onToggleAuthMode('login')}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-medium transition-all duration-300 px-5 py-2.5 rounded-xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] hover:shadow-[var(--shadow-soft)]"
          >
            Log in
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 md:pt-32 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >


          {/* Headline */}
          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-tertiary)] dark:from-white dark:to-gray-400"
          >
            Your Web, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">
              Beautifully Organized.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeIn}
            className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            Stop losing your favorite links in a sea of tabs. Save, search, and manage your bookmarks with an incredibly fast, premium glassmorphic interface.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeIn}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onToggleAuthMode('register')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-xl font-semibold shadow-[0_0_30px_rgba(99,102,241,0.4)] dark:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <span>Get Started for Free</span>
              <FaArrowRight className="text-sm" />
            </button>

          </motion.div>
        </motion.div>

        {/* Mockup Preview (Decorative) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
          className="mt-20 relative w-full max-w-5xl mx-auto hidden sm:block"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent z-10 bottom-0 h-40 mt-auto" />
          <div className="rounded-t-2xl border border-[var(--color-border)] border-b-0 bg-[var(--color-bg-secondary)]/50 backdrop-blur-xl shadow-2xl overflow-hidden p-2">
            <div className="h-6 w-full flex items-center space-x-2 px-4 border-b border-[var(--color-border)] pb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            {/* Realistic Dashboard Mockup */}
            <div className="h-[32rem] w-full bg-[var(--color-bg-primary)] flex text-left rounded-b-xl overflow-hidden border-t border-[var(--color-border)] pointer-events-none select-none">

              {/* Sidebar Mock (Matches Sidebar.jsx) */}
              <div className="w-64 bg-[var(--color-bg-secondary)] p-6 hidden sm:flex flex-col border-r border-[var(--color-border)] shrink-0">
                <div className="text-lg font-bold text-[var(--color-text-primary)] mb-8 flex items-center space-x-2">
                  <FaBookBookmark className="text-blue-600 shrink-0" />
                  <span className="truncate">Bookmark Manager</span>
                </div>
                <nav className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-[var(--color-accent)] text-white shadow-md rounded-xl transition-all duration-200">
                    <TbBookmarksFilled className="text-blue-200 text-xl shrink-0" />
                    <span className="font-semibold text-base truncate">All Bookmarks</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] rounded-xl transition-all duration-200">
                    <AiOutlineStar className="text-gray-500 text-xl shrink-0" />
                    <span className="font-medium text-base truncate">Favourites</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] rounded-xl transition-all duration-200">
                    <BsTags className="text-gray-500 text-xl shrink-0" />
                    <span className="font-medium text-base truncate">Tags</span>
                  </div>
                </nav>
              </div>

              {/* Main Content Mock (Matches DashboardPage.jsx layout) */}
              <div className="flex-1 p-4 md:p-6 lg:p-10 flex flex-col relative z-10 w-full overflow-hidden bg-[var(--color-bg-primary)]">

                {/* Header Mock (Matches Header.jsx) */}
                <div className="bg-[var(--color-bg-secondary)] p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-soft)] mb-6 shrink-0 transition-all duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center">
                    <div className="relative flex items-center">
                      <IoSearch className="w-5 h-5 absolute ml-3 text-[var(--color-text-tertiary)]" />
                      <div className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-tertiary)] text-sm">
                        Search bookmarks, tags, URLs...
                      </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                      <div className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)]">Newest</div>
                      <div className="bg-blue-600 text-white font-semibold px-4 py-2 text-sm md:text-base lg:px-6 rounded-md shadow-md">Add Bookmark</div>
                    </div>
                  </div>
                </div>

                {/* Grid Mock (Matches BookmarkList.jsx) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">

                  {/* Card 1: Coursera (Matches Bookmark.jsx) */}
                  <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 rounded-2xl shadow-[var(--shadow-soft)] flex flex-col justify-between h-full group">
                    <div className="flex-1">
                      <div className="text-[var(--color-accent)] font-semibold text-lg line-clamp-2">Coursera | Build Skills with Online Courses</div>
                      <div className="mt-3">
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">Learn online and earn valuable credentials from top universities like Yale, Michigan, Stanford, and leading companies.</p>
                      </div>

                      <div className="mt-3 bg-[var(--color-bg-tertiary)] p-3 rounded-xl border border-[var(--color-border)]">
                        <p className="text-[var(--color-text-secondary)] text-sm italic line-clamp-2">"Finish the React advanced patterns course this weekend."</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)] text-xs font-medium px-2.5 py-1 rounded-full">courses</span>
                        <span className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)] text-xs font-medium px-2.5 py-1 rounded-full">study</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex space-x-2">
                        <div className="bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-lg text-xs font-medium">Edit</div>
                        <div className="bg-[var(--color-bg-tertiary)] text-[var(--color-error)] px-3 py-1.5 rounded-lg text-xs font-medium">Delete</div>
                      </div>
                      <div className="text-red-500 bg-red-50 dark:bg-red-500/10 p-2 rounded-full transition-all duration-300">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: GeeksForGeeks (Matches Bookmark.jsx) */}
                  <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 rounded-2xl shadow-[var(--shadow-soft)] flex flex-col justify-between h-full group hidden sm:flex">
                    <div className="flex-1">
                      <div className="text-[var(--color-accent)] font-semibold text-lg line-clamp-2">GeeksforGeeks | A computer science portal</div>
                      <div className="mt-3">
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles.</p>
                      </div>

                      <div className="mt-3 bg-[var(--color-bg-tertiary)] p-3 rounded-xl border border-[var(--color-border)]">
                        <p className="text-[var(--color-text-secondary)] text-sm italic line-clamp-2">"Reference for Graph traversal algorithms."</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)] text-xs font-medium px-2.5 py-1 rounded-full">dsa</span>
                        <span className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)] text-xs font-medium px-2.5 py-1 rounded-full">programming</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex space-x-2">
                        <div className="bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-lg text-xs font-medium">Edit</div>
                        <div className="bg-[var(--color-bg-tertiary)] text-[var(--color-error)] px-3 py-1.5 rounded-lg text-xs font-medium">Delete</div>
                      </div>
                      <div className="text-[var(--color-text-tertiary)] p-2 rounded-full transition-all duration-300">
                        <FaRegHeart className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Anime Site (Matches Bookmark.jsx) */}
                  <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 rounded-2xl shadow-[var(--shadow-soft)] flex flex-col justify-between h-full group hidden lg:flex">
                    <div className="flex-1">
                      <div className="text-[var(--color-accent)] font-semibold text-lg line-clamp-2">Crunchyroll - Watch Popular Anime</div>
                      <div className="mt-3">
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">Stream the world's largest anime library. Watch over 1,000 titles - from past seasons to new episodes fresh from Japan.</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)] text-xs font-medium px-2.5 py-1 rounded-full">anime</span>
                        <span className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)] text-xs font-medium px-2.5 py-1 rounded-full">entertainment</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex space-x-2">
                        <div className="bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-lg text-xs font-medium">Edit</div>
                        <div className="bg-[var(--color-bg-tertiary)] text-[var(--color-error)] px-3 py-1.5 rounded-lg text-xs font-medium">Delete</div>
                      </div>
                      <div className="text-[var(--color-text-tertiary)] p-2 rounded-full transition-all duration-300">
                        <FaRegHeart className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}

export default LandingPage;