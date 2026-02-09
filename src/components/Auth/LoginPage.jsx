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


        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                login(userData, userData.token);
                localStorage.setItem('token', userData.token);

                if (localStorage.getItem('pending_journal')) {
                    navigate('/journal', {replace: true});
                } else {
                    navigate(from, { replace: true });
                }
            } else {
                const errorMsg = await response.text();
                alert(errorMsg || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Connection error. Is backend running?");
        }
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
                <button type="submit" className="login-btn">Sign In</button>
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>
                        New here? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: '#007bff' }}>Create an account</span>
                    </p>
            </form>
        </div>
    );
};

export default LoginPage;