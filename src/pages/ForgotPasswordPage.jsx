import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService";
import Toast from "../components/ui/Toast";
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState({ message: '', type: ''});
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (email) => {
        setIsLoading(true);
        try {
            const result = await authService.forgotPassword(email);
            if(result.success) {
                setToast({
                    message: 'Password reset Link sent! Please check your email and spam folder.',
                    type: 'success'
                });
            } else {
                setToast({
                    message: result.error, type: 'error'
                });
            }
        } catch (error) {
            console.error('Forgot password failed: ', error);
            setToast({ message: 'Failed to send reset link. Server error.', type:'error'});
        } finally {
            setIsLoading(false);
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
            onClose={() => setToast({message: '', type: ''})}
            />
        )}

        <ForgotPasswordForm onToggleAuthMode={handleToggleAuthMode} onForgotPassword={handleForgotPassword} isLoading={isLoading}/>
        </>
    );
};

export default ForgotPasswordPage;