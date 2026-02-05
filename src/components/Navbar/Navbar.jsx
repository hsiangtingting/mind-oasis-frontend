import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiGrid, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onReset }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();


    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
    logout();
    if (onReset) onReset();
    navigate('/');
    };

    const handleLogoClick = () => {
    if (onReset) onReset();
    navigate('/');
    };


    return (
    <nav className="navbar">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        Mind Oasis
        </div>

        <div className="nav-links">
        <Link
            to="/"
            className={`nav-icon-btn ${isActive('/') ? 'active' : ''}`}
            title="Home"
        >
            <FiHome size={22} strokeWidth={1.1} />
        </Link>

        <Link
            to="/gallery"
            className={`nav-icon-btn ${isActive('/gallery') ? 'active' : ''}`}
            title="Gallery"
        >
            <FiGrid size={22} strokeWidth={1.1}/>
        </Link>

        {user ? (
                    <button className="nav-icon-btn" onClick={handleLogout} title="Logout">
                        <FiLogOut size={22} strokeWidth={1.1} />
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className={`nav-icon-btn ${isActive('/login') ? 'active' : ''}`}
                        title="Account"
                    >
                        <FiUser size={22} strokeWidth={1.1} />
                    </Link>
                )}
        </div>
    </nav>
    );
};

export default Navbar;