import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiGrid } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ onReset }) => {
    const navigate = useNavigate();
    const location = useLocation();


    const isActive = (path) => location.pathname === path;

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

        <Link
            to="/login"
            className={`nav-icon-btn ${isActive('/login') ? 'active' : ''}`}
            title="Account"
        >
            <FiUser size={22} strokeWidth={1.1} />
        </Link>
        </div>
    </nav>
    );
};

export default Navbar;