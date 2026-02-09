import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                alert("Account created successfully! Please sign in.");
                navigate('/login');
            } else {
                const errorMsg = await response.text();
                alert(errorMsg || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("SignUp failed:", error);
            alert("Connection error. Is the backend running?");
        }
    };

    return (
        <div className="login-container">
            <h2>Join Mind Oasis</h2>
            <p>Begin your journey through visual metaphors and art.</p>

            <form onSubmit={handleSignUp}>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-btn">Create Account</button>
            </form>

            <div className="auth-helper">
                Already have an account? <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
};

export default SignUpPage;