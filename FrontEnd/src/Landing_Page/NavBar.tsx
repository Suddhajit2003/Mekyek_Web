import React from 'react';
import styles from './Css/NabBAr.module.css';
import MekyekLogo from '../assets/Mekyek.png';

interface NavBarProps {
  isAbsolute?: boolean;
  onGetStarted?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isAbsolute, onGetStarted }) => {
  return (
    <nav className={
      styles.navbar + ' ' + styles.animateNav + (isAbsolute ? ' ' + styles.absoluteNav : '')
    }>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <img src={MekyekLogo} alt="Mekyek Logo" className={styles.logoImg} />
        </div>
        <span className={styles.brand}>Mekyek</span>
      </div>
      <div className={styles.linksSection}>
        <div className={styles.link}>
          <span className={styles.icon}>
            {/* User SVG */}
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="5" r="3" fill="#00296B"/><rect x="2" y="10" width="12" height="5" rx="2.5" fill="#00296B"/></svg>
          </span>
          <span className={styles.linkText}>Hire a Talent</span>
        </div>
        <div className={styles.link}>
          <span className={styles.icon}>
            {/* Briefcase SVG */}
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="12" height="9" rx="2" fill="#00296B"/><rect x="6" y="2" width="4" height="3" rx="1" fill="#00296B"/></svg>
          </span>
          <span className={styles.linkText}>Find Work</span>
        </div>
      </div>
      <div className={styles.ctaSection}>
        <button className={styles.ctaBtn} onClick={onGetStarted}>Get Started</button>
      </div>
    </nav>
  );
};

export default NavBar;
