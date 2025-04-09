import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      return setError('Email is required');
    }

    if (!captcha) {
      return setError('Please complete the reCAPTCHA verification');
    }
    
    setLoading(true);
    setTimeout(() => {
      setMessage(`Password reset link would be sent to ${email} in a real application`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container">
      <div className="forgot-password-container">
        <div className="brand">
          <i className="fas fa-shield-alt logo-icon"></i>
          <h1>CyberGuard</h1>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email"><i className="fas fa-envelope"></i></label>
            <input
              type="email"
              id="email"
              placeholder="Enter your registered email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6LdoTBArAAAAANFra96-56cplc5CgPntUPXs7rf4"
              onChange={(token) => setCaptcha(token)}
            />
          </div>

          {error && <div className="input-error">{error}</div>}
          {message && <div className="input-success">{message}</div>}

          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Sending...</span>
              </>
            ) : 'Send Reset Link'}
          </button>
        </form>

        <div className="links-container">
          <Link to="/" className="back-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;