import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/gallery";

    const handleLogin = async (e) => {
        e.preventDefault();


        console.log("Logging in with:", email);
        const mockUser = { name: "Explorer", email: email };
        const mockToken = "fake-jwt-token";

        login(mockUser, mockToken);
        navigate(from, { replace: true });
    };

    return (
        <div className="login-container">
            <h2>Welcome Back to Mind Oasis</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-btn">Enter Oasis</button>
            </form>
        </div>
    );
};

export default LoginPage;