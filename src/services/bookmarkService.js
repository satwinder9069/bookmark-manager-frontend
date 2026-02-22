import { apiCall, API_ENDPOINTS } from "./api";

export const bookmarkService = {
    
    // get all bookmarks
    getAll: async (headers) => {
        const result = await apiCall(API_ENDPOINTS.BOOKMARKS, { headers});
        
        if(!result.success) {
            throw new Error(result.error);
        }
        
        return result.data || [];
    },

    // Add bookmark
    create: async (bookmark, headers) => {
        const result = await apiCall(API_ENDPOINTS.BOOKMARKS, {
            method: 'POST',
            headers,
            body: JSON.stringify(bookmark),
        });

        if(!result.success) {
            throw new Error(result.error);
        }
        
        return result.data || result;
    },

    // Update bookmark
    update: async (id, updateData, headers) => {
        const result = await fetch (API_ENDPOINTS.BOOKMARK_BY_ID(id), {
            method: 'PUT',
            headers,
            body: JSON.stringify(updateData),
        });
        if(!result.success) {
            throw new Error(result.error);
        }
        
        return result.data || result;
    },

    // Delete bookmark
    delete: async (id, headers) => {
        const result = await fetch(API_ENDPOINTS.BOOKMARK_BY_ID(id), {
            method: 'DELETE',
            headers,
        });

        if (!result.success) {
            throw new Error(result.error);
        }
        return true;
        
    },

    // Toggle Favorite Bookmark
    toggleFavourite: async (id, isFavourite, headers) => {
        const result = await fetch (API_ENDPOINTS.BOOKMARK_BY_ID, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ isFavourite }),
        });

        if(!result.success) {
            throw new Error(result.error);
        }
        
        return result.data || result;
    },
};