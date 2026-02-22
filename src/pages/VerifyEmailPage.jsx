import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import Toast from "../components/ui/Toast";

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [searchParams] = useSearchParams();
    const [toast, setToast] = useState({ message: '', type: ''});
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            const email = searchParams.get('email');

            if(!token || !email) {
                setToast({ message: 'Invalid verification link', type: 'error'});
                setVerifying(false);
                return;
            }


            try {
                const result = await authService.verifyEmail(token, email);

                if(result.success) {
                    setToast({ message: 'Email verified successfully! Redirecting to dashboard...', type: 'success'});
                    login(result.data);
                    setTimeout(() => navigate('/dashboard'), 2000);
                } else {
                    setToast({ message: result.error || 'Verification failed', type: 'error'});
                }
            } catch (error) {
                console.error('Verification failed', error);
                setToast({ message: 'Verification failed. Please try again.', type: 'error'});
            } finally {
                setVerifying(false);
            }
        };

        verifyEmail();

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full text-center">
            {verifying ? (
                <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"> </div>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Verifying your email...</h2>
                <p className="text-gray-600 dark:text-gray-400">Please wait</p>
                </>
            ) : (
                <>
                {toast.message && (
                    <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ message: '', type: ''})}
                    />
                )}
                </>
            )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;