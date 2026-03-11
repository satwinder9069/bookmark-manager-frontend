/* global chrome */ 
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { authService } from "../services/authService";
import Toast from "../components/ui/Toast";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [toast, setToast] = useState({ message: '', type: ''});

    const handleLogin = async (userData) => {
        try {
            const result = await authService.login(userData);
            if(result.success) {
                login(result.data);

                const extensionId = `${import.meta.env.VITE_EXTENSION_ID}`; 

                if (window.chrome?.runtime?.sendMessage) {
                    chrome.runtime.sendMessage(
                        extensionId,
                        { type: 'SYNC_TOKEN', token: result.data.token },
                        (response) => {
                            if (chrome.runtime.lastError) {
                                console.log('Extension sync failed:', chrome.runtime.lastError);
                            } else {
                                console.log('Token synced to extension successfully');
                            }
                        }
                    );
                } 

                setToast({ message: 'Login Successfull', type: 'success' });
                setTimeout(() => navigate('/dashboard'), 1000);
            } else {
                setToast({ message: result.error, type: 'error'});
            }
        } catch(error) {
            console.error('Login failed', error);
            setToast({ message: 'Login failed, Server error', type: 'error'});
        }
    };

    const handleToggleAuthMode = (mode) => {
        if (mode === 'register') {
            navigate('/register');
        } else if(mode === 'forgotPassword') {
            navigate('/forgot-password');
        }
    };

    return (
        <>
        {toast.message && (
            <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: '', type: ''})}
            />
        )}
        <LoginForm onToggleAuthMode={handleToggleAuthMode} onLogin={handleLogin} />
        </>
    );
};

export default LoginPage;