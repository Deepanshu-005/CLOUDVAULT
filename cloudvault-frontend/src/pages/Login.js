import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      setMsg('Login successful!');
      localStorage.setItem('token', res.data.token);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="main-title">CLOUDVAULT ☁</h1>
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Login'}
          </button>
          <p>
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')}>Register</span>
          </p>
        </form>
        {msg && (
          <p style={{ color: msg === 'Login successful!' ? 'green' : 'red' }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
