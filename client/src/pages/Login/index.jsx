import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password }), // Match with your backend's expected request body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred.');
      }

      // Handle successful login, e.g., store token, redirect user
      localStorage.setItem('token', data.token); // Store the token in local storage or session storage
      setSuccess('Login successful!');
      setError('');

      // Redirect to another page, e.g., dashboard or home
      navigate('/home'); // Change this to your desired route

    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="error">{JSON.stringify(error)}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
