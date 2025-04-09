import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaShieldAlt, FaUser, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import './Signup.css'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    

    if (!captcha) return setError('Please complete the reCAPTCHA.');
    if (password !== confirmPass) return setError('Passwords do not match.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');

    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
  
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="brand">
          <FaShieldAlt className="logo-icon" />
          <h1>CyberGuard</h1>
        </div>

        {!success ? (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">
                <FaUser />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPass">
                <FaLock />
              </label>
              <input
                type={showConfirmPass ? 'text' : 'password'}
                id="confirmPass"
                placeholder="Confirm Password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                aria-label={showConfirmPass ? "Hide password" : "Show password"}
              >
                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6LdoTBArAAAAANFra96-56cplc5CgPntUPXs7rf4"
                onChange={(token) => setCaptcha(token)}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="signup-button" 
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : 'Sign Up'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <FaCheckCircle className="success-icon" />
            <p>Signup successful! Redirecting...</p>
          </div>
        )}

        <div className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;