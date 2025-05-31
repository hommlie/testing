import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';


const Signup = ({ switchToSignin, onSignupSuccess }) => {
  const [form, setForm] = useState({
    phoneNumber: '',
    otp: '',
    password: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const cleaned = value.replace(/\D/g, '');
      const formatted = cleaned.length > 3
        ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}${cleaned.length > 6 ? `-${cleaned.slice(6, 10)}` : ''}`
        : cleaned;
      setForm(prev => ({ ...prev, [name]: formatted }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSendOtp = async () => {
    const phoneDigits = form.phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return alert("Please enter a valid 10-digit phone number");
    }

    setLoading(true);
    try {
      await axios.post('/api/auth/send-otp', {
        phoneNumber: phoneDigits
      });
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.otp.match(/^[0-9]{6}$/)) {
      return alert("Please enter a valid 6-digit OTP");
    }

    setLoading(true);
    try {
      await axios.post('/api/auth/verify-otp', {
        phoneNumber: form.phoneNumber.replace(/\D/g, ''),
        otp: form.otp,
        password: form.password
      });
      onSignupSuccess();
    } catch (err) {
      alert(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-illustration">
          <img src="/images/boximg.png" alt="Mobile verification" className="illustration-image" />

          <h2>Welcome to Hommlie</h2>
          <p>Your home services, simplified</p>
        </div>

        <div className="auth-form">
          <div className="form-header">
            <h1>Create Account</h1>
            <p>Enter your phone number to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-group">
                <div className="country-code">
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  maxLength="14"
                  disabled={otpSent || loading}
                  className="phone-input"
                />
                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="action-button secondary"
                    disabled={form.phoneNumber.replace(/\D/g, '').length !== 10 || loading}
                  >
                    {loading ? (
                      <span className="button-loader"></span>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                disabled={otpSent || loading}
                className="otp-input"
              />
              {form.password && (
                <div className="hint-text" style={{ marginTop: '0.5rem' }}>
                  {form.password.length < 8 ? (
                    <span style={{ color: 'red' }}>Password must be at least 8 characters</span>
                  ) : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password) ? (
                    <span style={{ color: 'green' }}>Strong password</span>
                  ) : (
                    <span style={{ color: '#f59e0b' }}>Include both letters and numbers</span>
                  )}
                </div>
              )}
            </div>

            {otpSent && (
              <>
                <div className="input-field">
                  <label htmlFor="otp">Verification Code</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    disabled={loading}
                    className="otp-input"
                  />
                  <p className="hint-text">
                    Code sent to +91 {form.phoneNumber}
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="resend-link"
                    >
                      Resend code
                    </button>
                  </p>
                </div>

                <button
                  type="submit"
                  className="action-button primary"
                  disabled={!form.otp || form.otp.length !== 6 || loading}
                >
                  {loading ? (
                    <span className="button-loader"></span>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>
              </>
            )}

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <button type="button" className="text-button" onClick={switchToSignin}>
                  Sign in
                </button>
              </p>
              <p className="legal-text">
                By continuing, you agree to our <a href="/terms">Terms</a> and{' '}
                <a href="/privacy">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
