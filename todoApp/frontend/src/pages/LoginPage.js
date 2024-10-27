import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.js.css';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const toggleRegistering = () => setIsRegistering(!isRegistering);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (password === confirmPassword) {
          const response = await axios.post('http://localhost:8000/register', { email, password, confirmPassword }, {
            headers: { 'Content-Type': 'application/json' },
          });
          alert(response.data.message);
          if (response.status === 201) {
            await axios.post('http://localhost:8000/api/email/send-registration', { email }, {
              headers: { 'Content-Type': 'application/json' },
            });
            setIsRegistering(false);
          }
        } else {
          alert('Passwords do not match');
        }
      } else {
        const response = await axios.post('http://localhost:8000/login', { email, password }, {
          headers: { 'Content-Type': 'application/json' },
        });
        alert(response.data.message);
        if (response.status === 200) {
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      alert(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <button type="button" onClick={toggleRegistering}>
          {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
