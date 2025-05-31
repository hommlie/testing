import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';

const Signin = ({ switchToSignup }) => {
  const [form, setForm] = useState({ phone: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      window.location.reload();
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="signin-box">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>SIGNIN</h2>
        <div className="signin-inputBox">
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            maxLength="10"
            title="Enter a valid 10-digit phone number"
          />
          <span>Phone Number</span><i></i>
        </div>
        <div className="signin-inputBox">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <span>Password</span><i></i>
        </div>
        <div className="signin-links">
          <a href="#">Forgot Password</a>
        </div>
        <input type="submit" value="Login" className="signin-submit" />
        <p className="switch-auth">
          Don’t have an account? <span className="link" onClick={switchToSignup}>Sign up here</span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
