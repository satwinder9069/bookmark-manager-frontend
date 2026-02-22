import React from "react";
import Bookmark from "./Bookmark";
import EmptyState from '../ui/EmptyState';

function BookmarkList({bookmarks, loading, onDelete, onEdit, onConfirmDelete, onToggleFavourite, /*onAdd*/}) {
  if(loading) {
        return <p className="text-center text-gray-500 mt-10">Loading bookmarks...</p>
  }
  return(
      <div className="flex-1 p-4 md:p-8 lg:p-12">
        <h2 className="text-2xl font-bold mb-6">My Bookmarks</h2>
          {bookmarks.length > 0 ? (
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {bookmarks.map((bookmark) => (
              <Bookmark
                key={bookmark._id}
                bookmark={bookmark}
                onDelete={onDelete}
                onEdit={onEdit}
                onConfirmDelete={onConfirmDelete}
                onToggleFavourite={onToggleFavourite}
              />
            ))}
          </div>
          ) : (
             <EmptyState />
        )}  
      </div>
  );

}

export default BookmarkList;