import { API_ENDPOINTS, apiCall } from "./api";

export const authService = {
    register: async (userData) => {
        return await apiCall(API_ENDPOINTS.REGISTER, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });
    },

    login: async (userData) => {
        return await apiCall(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });
    },

    verifyEmail: async (token, email) => {
        return await apiCall(`${API_ENDPOINTS.VERIFY_EMAIL}?token=${token}&email=${email}`, {
            method: 'GET',
        });
    },

    forgotPassword: async (email) => {
        return await apiCall(API_ENDPOINTS.FORGOT_PASSWORD, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        });
    },

    resetPassword: async (password, resetToken, userEmail) => {
        return await apiCall(API_ENDPOINTS.RESET_PASSWORD, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ password, resetToken, userEmail})
        });
    }
};