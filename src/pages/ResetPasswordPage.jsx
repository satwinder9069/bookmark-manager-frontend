import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { authService } from "../services/authService";
import Toast from "../components/ui/Toast";
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [toast, setToast] = useState({message: '', type: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if(token && email) {
            setResetToken(token);
            setUserEmail(email);
        } else {
            setToast({ message: 'Invalid reset Link', type: 'error'});
        }
    }, [searchParams]);

    const handleResetPassword = async (newPassword) => {
        if(!resetToken || !userEmail) {
            setToast({
                message: 'Invalid reset Link. Please request a new one.',
                type: 'error'
            });
            return;
        }

        setIsLoading(true);

        try {
            const result = await authService.resetPassword(newPassword, resetToken, userEmail);

            if(result.success) {
                setToast({message: 'Password reset successful! Redirecting to login...', type: 'success'});
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setToast({ message: result.error, type: 'error'});
            }
        } catch (error) {
            console.error('Password reset failed.', error);
            setToast({ message: 'Failed to reset password. Server error.', type: 'error'});
        } finally {
            setIsLoading(false);
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

        <ResetPasswordForm 
            onResetPassword={handleResetPassword}
            email={userEmail}
            isLoading={isLoading}
        />
        </>
    );
};

export default ResetPasswordPage;