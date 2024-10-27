import React, { useState } from 'react';
import axios from 'axios';
import './Login.js.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    const data = isRegistering ? { email, password, confirmPassword } : { email, password };

    try {
      const response = await axios.post(`http://localhost:8000${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data.message);
      if (!isRegistering) {
        // Redirect to dashboard or handle login success
        console.log('Login Success');
      }
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  const toggleIsRegistering = () => {
    setIsRegistering(!isRegistering);
    setMessage('');
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {isRegistering && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={toggleIsRegistering}>
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
