import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService";
import Toast from "../components/ui/Toast";
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState({ message: '', type: ''});

    const handleRegister = async (userData) => {
        try {
            const result = await authService.register(userData);

            if(result.success) {
                setToast({ message: 'Registration successful!, Please check your email to verify your account.', type: 'success'});
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setToast({ message: result.error, type: 'error'});
            }
        } catch (error) {
            console.log('Registration failed', error);
            setToast({ message: 'Registration failed. Server error.', type: 'error'});
        }
    };

    const handleToggleAuthMode = (mode) => {
        if (mode === 'login') {
            navigate('/login');
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

        <RegisterForm onToggleAuthMode={handleToggleAuthMode} onRegister={handleRegister} />

        </>
    );
};

export default RegisterPage;