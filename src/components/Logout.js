import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioId');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Sair
        </button>
    );
};

export default Logout;
