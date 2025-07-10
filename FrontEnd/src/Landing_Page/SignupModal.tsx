import React, { useState } from 'react';
import styles from './Css/LoginSignupModal.module.css'; // Reuse styles for now
import apiService from '../api';

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  onSignupSuccess?: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, onClose, onSignupSuccess, onSwitchToLogin }) => {
  const [mode, setMode] = useState<'candidate' | 'recruiter'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiService.signup({ email, password, firstName, lastName });
      if (onSignupSuccess) onSignupSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <span className={styles.closeIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="16" fill="#00296B"/><path d="M20.4853 11.5147L11.5147 20.4853M11.5147 11.5147L20.4853 20.4853" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </span>
        </button>
        <div className={styles.title}>Sign Up!</div>
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              className={styles.input}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder=""
              autoComplete="given-name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              className={styles.input}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder=""
              autoComplete="family-name"
            />
          </div>
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
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=""
              autoComplete="new-password"
            />
          </div>
          {error && <div style={{ color: '#e31b23', marginTop: 8, fontSize: 14 }}>{error}</div>}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className={styles.signupRow}>
          <span className={styles.signupText}>Already have an account? <button onClick={onSwitchToLogin} className={styles.signupLink}>Log In</button></span>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;