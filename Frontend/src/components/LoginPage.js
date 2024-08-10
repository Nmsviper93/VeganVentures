import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../Services/axiosInstance';
import { useHistory } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const validateForm = () => {
        if (!username || !password) {
            setError('Username and password are required');
            return false;
        }
        if (!isLogin && !email) {
            setError('Email is required');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        
        try {
            console.log("Submitting form...");
            console.log("Form data:", { username, email, password });
            console.log("Endpoint:", isLogin ? '/auth/login' : '/auth/register');
            
            let response;
            // handle login
            if (isLogin) {
                console.log('Attempting to log in with:', { username, password });
                response = await axiosInstance.post('/auth/login', { username, password });
                // localStorage.setItem('token', response.data.token);
                console.log('Login successful:', response.data);
                history.push('/home');
            } else {
                // handle create profile
                console.log('Attempting to create profile with:', { username, email, password });
                response = await axiosInstance.post('/auth/register', { username, email, password });
                // localStorage.setItem('token', response.data.token);
                console.log('Profile created:', response.data);
                history.push('/home');
            }

            // store token in localStorage
            localStorage.setItem('authToken', response.data.token);

            // redirect to profile page
            history.push('/profile');
        } catch (error) {
            console.error('Error during submission:', error);
            setError('An error occurred, please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>{isLogin ? 'Login' : 'Create Profile'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                {!isLogin && (
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                )}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Create Profile'}</button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create Profile' : 'Login'}
                </button>
            </form>
                {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
