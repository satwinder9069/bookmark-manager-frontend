import {useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { setTokenExpirationHandler } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [ user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) :null;
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