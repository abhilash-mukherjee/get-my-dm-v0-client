import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect() {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('./chats');
        } else {
            setIsAuthChecked(true);
        }
    }, [navigate]);

    return { isAuthChecked };
}