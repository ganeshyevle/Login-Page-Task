import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaShieldAlt, FaUser, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    setError('');
    
    if (!email.trim()) {
      setError('Username is required');
      return false;
    } else if (email.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Invalid email format');
        return false;
      }
    }

    if (!password) {
      setError('Password is required');
      return false;
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (!captcha) {
      setError('Please verify that you are not a robot.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
    
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="brand">
          <FaShieldAlt className="logo-icon" />
          <h1>CyberGuard</h1>
        </div>

        {!success ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">
                <FaUser />
              </label>
              <input
                type="text"
                id="email"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <FaLock />
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <div className="input-error">{error}</div>}

            <div className="options-group">
              <label className="remember-me">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>


            </div>

            <ReCAPTCHA
              sitekey="6LdoTBArAAAAANFra96-56cplc5CgPntUPXs7rf4"
              onChange={(token) => setCaptcha(token)}
              className="g-recaptcha"
            />

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <FaCheckCircle />
            <p>Login successful!</p>
          </div>
        )}

        <div className="signup-link">
          <p>Don't have an account? <a href="/signup" className="forgot-password">Sign up</a></p>
        </div>

        <div className="security-info">
          <FaLock />
          <p>Protected by CyberGuard Security</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
