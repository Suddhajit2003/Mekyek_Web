import React, { useState } from 'react';
import styles from './Css/LoginSignupModal.module.css';
import apiService from '../api';

interface LoginSignupModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  onSwitchToSignup: () => void; // Add this line
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ open, onClose, onLoginSuccess, onSwitchToSignup }) => {
  const [mode, setMode] = useState<'candidate' | 'recruiter'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiService.login(email, password);
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <span className={styles.closeIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="16" fill="#00296B"/><path d="M20.4853 11.5147L11.5147 20.4853M11.5147 11.5147L20.4853 20.4853" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </span>
        </button>
        {/* Title */}
        <div className={styles.title}>Login !</div>
        {/* Toggle */}
        <div className={styles.toggleRow}>
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleButton} ${mode === 'candidate' ? styles.toggleButtonActive : ''}`}
              onClick={() => setMode('candidate')}
            >
              As candidate
            </button>
            <button
              className={`${styles.toggleButton} ${mode === 'recruiter' ? styles.toggleButtonActive : ''}`}
              onClick={() => setMode('recruiter')}
            >
              As recruiter
            </button>
          </div>
        </div>
        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder=""
              autoComplete="email"
            />
          </div>
          {/* Password */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=""
              autoComplete="current-password"
            />
          </div>
          {/* Remember Me & Forgot Password */}
          <div className={styles.rememberRow}>
            <label className={styles.rememberLabel}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className={styles.rememberCheckbox}
              />
              Remember Me
            </label>
            <button type="button" className={styles.forgotButton}>Forget Password ?</button>
          </div>
          {/* Error Message */}
          {error && <div style={{ color: '#e31b23', marginTop: 8, fontSize: 14 }}>{error}</div>}
          {/* Log In Button */}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {/* Or */}
        <div className={styles.orDivider}>
          <span className={styles.orText}>Or</span>
        </div>
        {/* Google Sign In */}
        <button className={styles.googleButton}>
          <span className={styles.googleIcon}>
            <svg width="32" height="32" viewBox="0 0 65 65" fill="none">
              <circle cx="32.5" cy="32.5" r="32.5" fill="#fff"/>
              <g clipPath="url(#clip0_1_2)">
                <path d="M53.64 33.27c0-1.36-.12-2.72-.37-4.04H32.5v7.65h11.91c-.51 2.7-2.06 4.98-4.39 6.52v5.41h7.09c4.15-3.82 6.53-9.45 6.53-15.54z" fill="#4285F4"/>
                <path d="M32.5 56c5.89 0 10.84-1.95 14.45-5.3l-7.09-5.41c-1.97 1.32-4.5 2.1-7.36 2.1-5.66 0-10.46-3.82-12.18-8.96h-7.28v5.62C17.01 52.98 24.32 56 32.5 56z" fill="#34A853"/>
                <path d="M20.32 38.43a13.13 13.13 0 0 1 0-8.43v-5.62h-7.28a23.5 23.5 0 0 0 0 19.67l7.28-5.62z" fill="#FBBC05"/>
                <path d="M32.5 20.92c3.21 0 6.09 1.1 8.36 3.25l6.27-6.27C43.34 14.97 38.39 13 32.5 13c-8.18 0-15.49 3.02-20.46 7.98l7.28 5.62c1.72-5.14 6.52-8.96 12.18-8.96z" fill="#EA4335"/>
              </g>
              <defs>
                <clipPath id="clip0_1_2">
                  <rect width="40" height="40" fill="#fff" transform="translate(13 13)"/>
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className={styles.googleText}>Sign in with Google</span>
        </button>
        {/* Sign Up Link */}
        <div className={styles.signupRow}>
          <span className={styles.signupText}>New User? <button onClick={onSwitchToSignup} className={styles.signupLink}>Sign Up</button></span>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;