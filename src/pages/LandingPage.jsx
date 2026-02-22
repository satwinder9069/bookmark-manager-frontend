import { useNavigate } from "react-router-dom";
import LandingPageComponent from '../components/ui/LandingPage';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleToggleAuthMode = (mode) => {
        if (mode === 'login') {
            navigate('/login');
        } else if (mode === 'register') {
            navigate('/register');
        }
    };

    return <LandingPageComponent onToggleAuthMode={handleToggleAuthMode} />
};

export default LandingPage;