import React, { useState } from 'react'
import './Signup.css'
import {  useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function





  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await fetch('http://localhost:2000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log(data);
      

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred.')
      }

      setSuccess('Registration successful!')
      setError('')

      // Reset form
      setUsername('')
      setPassword('')
      setConfirmPassword('')

      navigate('/login');
    } catch (err) {
      setError(err.message)
      setSuccess('')
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
