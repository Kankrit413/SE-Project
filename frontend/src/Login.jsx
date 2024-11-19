import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Special case for admin login without API request
            if (username === 'admin' && password === 'kmutt123') {
                localStorage.setItem('username', username);
                navigate('/admin'); // Redirect to Admin dashboard
                return;
            }

            // General user login via API
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            if (response.status === 200) {
                localStorage.setItem('username', username);
                navigate('/Home'); // Redirect to the home page
            }
        } catch (error) {
            alert('Invalid username or password. Please try again.'); // Inform the user of a failed login attempt
        }
    };

    return (
        <div style={{ margin: '2rem', textAlign: 'center' }}>
            <h2>Welcome to the Login Page</h2>
            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007BFF',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Don’t have an account? <Link to="/register" style={{ color: '#007BFF' }}>Register here</Link>.
            </p>
        </div>
    );
};

export default Login;