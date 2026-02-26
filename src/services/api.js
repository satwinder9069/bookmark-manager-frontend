const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,

    // bookmark endpoints
    BOOKMARKS: `${API_BASE_URL}/bookmarks`,
    BOOKMARK_BY_ID: (id) => `${API_BASE_URL}/bookmarks/${id}`,
};
console.log("ENV:", import.meta.env.VITE_API_URL);
let onTokenExpired = null;

export const setTokenExpirationHandler = (callback) => {
    onTokenExpired = callback;
}

// Generic API call handler
export const apiCall = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        
        if(response.status === 401) {
            if(onTokenExpired) {
                onTokenExpired();
            }
        }
        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.error('Invalid response from server:', error);
            throw new Error('Invalid response format from server');
        }

        if(!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        if(data.success !== undefined) {
            return data;
        }

        return { success: true, data};
    } catch (error) {
        return {success: false, error: error.message};
    }  
};