import React, { useRef, useState } from 'react';
import styles from './Css/Cunnectus.module.css';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface CunnectusProps {
  open: boolean;
  onClose: () => void;
}

const Cunnectus: React.FC<CunnectusProps> = ({ open, onClose }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const name = nameRef.current?.value.trim() || '';
    const email = emailRef.current?.value.trim() || '';
    const message = messageRef.current?.value.trim() || '';
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        created: Timestamp.now(),
      });
      setLoading(false);
      onClose();
      // Scroll to Empower section after closing
      setTimeout(() => {
        const empowerSection = document.querySelector('section[class*="Empower"]') || document.querySelector('section');
        if (empowerSection) empowerSection.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } catch (err) {
      setError('Failed to send. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <div className={styles.container}>
          <div className={styles.leftPanel}>
            <h3 className={styles.contactTitle}>Contact Us</h3>
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <span className={styles.icon}>{/* Address SVG */}</span>
                23 Avenue de Paris<br/>75021 Paris
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>{/* Email SVG */}</span>
                hello@mekyekmartin.com
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>{/* User SVG */}</span>
                mike@martin
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>{/* Phone SVG */}</span>
                +33615931144
              </div>
              <div className={styles.socials}>
                {/* Social SVGs */}
                <span className={styles.social}><svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="9" fill="#fff" fillOpacity="0.1"/><path d="M6 9v3h2v-3H6zm4 0v3h2v-3h-2z" fill="#fff"/></svg></span>
                <span className={styles.social}><svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="9" fill="#fff" fillOpacity="0.1"/><path d="M9 6v6m3-3H6" stroke="#fff" strokeWidth="2"/></svg></span>
                <span className={styles.social}><svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="9" fill="#fff" fillOpacity="0.1"/><path d="M6 12l6-6M6 6l6 6" stroke="#fff" strokeWidth="2"/></svg></span>
              </div>
            </div>
          </div>
          <div className={styles.rightPanel}>
            <div className={styles.formCard}>
              <h3 className={styles.getInTouch}>Get in Touch</h3>
              <p className={styles.formSubtext}>Feel free to drop us a line below!</p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} type="text" placeholder="Your Name" ref={nameRef} disabled={loading} />
                <input className={styles.input} type="email" placeholder="Your Email" ref={emailRef} disabled={loading} />
                <textarea className={styles.textarea} placeholder="Your Message" ref={messageRef} disabled={loading} />
                {error && <div style={{ color: '#d32f2f', marginBottom: 8, textAlign: 'center', fontSize: '0.98rem' }}>{error}</div>}
                <button className={styles.sendBtn} type="submit" disabled={loading}>{loading ? 'Sending...' : 'SEND'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cunnectus;
