import {useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { setTokenExpirationHandler } from '../services/api';
import { useNavigate } from 'react-router-dom';

const TOKEN_EXPIRY_DAYS = 7;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [ user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');

        if(!savedUser) {
            return null;
        };

        try {
            const parsed = JSON.parse(savedUser);

            if(!parsed.token) {
                console.log('No token found, clearing session');
                localStorage.clear();
                return null;
            }

            try  {
                const tokenParts = parsed.token.split('.');
                const base64Payload = tokenParts[1];

                const decodedPayload = atob(base64Payload);
                const tokenPayload = JSON.parse(decodedPayload);

                const tokenExpiry = tokenPayload.exp * 1000;
                const now = Date.now();

                if (now >= tokenExpiry) {
                    console.log('Token expired, clearing session');
                    localStorage.clear();
                    return null;
                }

                const tokenIssuedAt = tokenPayload.iat * 1000;
                const tokenAge = now - tokenIssuedAt;
                const maxAge = TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

                if (tokenAge > maxAge) {
                    console.log('Token too old, clearing session');
                    localStorage.clear();
                    return null;
                }

            } catch (decodeError) {
                console.error('Invalid token format, clearing session');
                localStorage.clear();
                return null;
            }

            return parsed;

        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.clear();
            return null;
        }
        
    });

    const [loading, setLoading] = useState(false);

    //save user to localStorage whenever it changes
    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    // register token expiration handler
    useEffect(() => {
        setTokenExpirationHandler(() => {
            logout();
        });
    }, []);

    const getAuthHeaders = useMemo(() => {
        if(user?.token) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            };
        }
        return {
            'Content-Type': 'application/json'
        };
    }, [user]);

    const value = {
        user,
        loading,
        setLoading,
        login,
        logout,
        getAuthHeaders,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};