import React , {useEffect} from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

function Toast({message, type , onClose, duration= 3000}) {
    const toastClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    const iconClasses = {
        success: <FaCheckCircle />,
        error: <FaTimesCircle />,
        info: <FaInfoCircle />,
    };

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white font-semibold flex items-center space-x-2 transition-opacity duration-300 ${toastClasses[type]}`}
            role="alert"
        >
            {iconClasses[type]}
            <span>{message}</span>
            <button className="ml-4 font-bold focus:outline-none" onClick={onClose}>
                <FaTimesCircle />
            </button>

        </div>
    );
}

export default Toast;