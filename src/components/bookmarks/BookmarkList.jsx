import { motion, AnimatePresence } from "framer-motion";
import Bookmark from "./Bookmark";
import EmptyState from '../ui/EmptyState';

function BookmarkList({ bookmarks, loading, onDelete, onEdit, onConfirmDelete, onToggleFavourite, /*onAdd*/ }) {
  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading bookmarks...</p>
  }
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex-1">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]"
      >
        My Bookmarks
      </motion.h2>
      {bookmarks.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          layout
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {bookmarks.map((bookmark) => (
              <motion.div
                key={bookmark._id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                className="h-full"
              >
                <Bookmark
                  bookmark={bookmark}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onConfirmDelete={onConfirmDelete}
                  onToggleFavourite={onToggleFavourite}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </div>
  );

}

export default BookmarkList;