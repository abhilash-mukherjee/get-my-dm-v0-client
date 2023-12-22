import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect(destinationPath : string) {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(destinationPath);
            console.trace();
            console.log('redirected')
        } else {
            setIsAuthChecked(true);
        }
    }, [navigate]);

    return { isAuthChecked };
}