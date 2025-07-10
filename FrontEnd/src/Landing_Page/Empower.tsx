import React, { useState } from 'react';
import styles from './Css/Empower.module.css';

interface EmpowerProps {
  onSearch?: (query: string) => void;
}

const Empower: React.FC<EmpowerProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearch = () => {
    if (onSearch && search.trim()) onSearch(search.trim());
  };
  return (
    <section className={styles.banner + ' ' + styles.animateBanner}>
      <div className={styles.leftContent}>
        <div className={styles.headingSection}>
          <h1 className={styles.heading}>Empower Your Future,<br />One Step at a Time</h1>
          <div className={styles.poweredByAI}>
            <span>Powered By AI</span>
            <span className={styles.sparkleIcon}>
              {/* Sparkle SVG */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4l2.09 6.26L24 12l-5.18 3.74L16 22l-2.82-6.26L8 12l5.91-1.74L16 4z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="16" y1="4" x2="16" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#BEDCFF"/><stop offset="0.5" stopColor="#9ABEFF"/><stop offset="0.7" stopColor="#DBECFF"/><stop offset="1" stopColor="#FCE8A2"/></linearGradient></defs></svg>
            </span>
          </div>
          <p className={styles.subText}>Discover opportunities that align with your skills and aspirations. Connect with leading companies and take your career to new heights.</p>
        </div>
        <div className={styles.searchContent}>
          <span className={styles.searchIcon}>
            {/* Search SVG */}
            <svg width="25" height="25" fill="none"><circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2"/><line x1="18" y1="18" x2="23" y2="23" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <input className={styles.searchInput} placeholder="Search jobs, internships, courses..." value={search} onChange={handleInput} />
          <button className={styles.searchBtn} onClick={handleSearch} disabled={!search.trim()} style={!search.trim() ? {opacity: 0.5, cursor: 'not-allowed'} : {}}>Search</button>
        </div>
      </div>
      <div className={styles.opportunityGrid}>
        <div className={styles.card + ' ' + styles.cardJob + ' ' + styles.cardAnim1}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" stroke="#2563EB" strokeWidth="3"/><path d="M8 16v-1a4 4 0 018 0v1" stroke="#2563EB" strokeWidth="2"/></svg>
          </div>
          <div className={styles.cardText}><div className={styles.cardTitle}>Job Search</div><div className={styles.cardDesc}>Find your perfect role with advanced filters.</div></div>
        </div>
        <div className={styles.card + ' ' + styles.cardInternship + ' ' + styles.cardAnim2}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" fill="none"><rect x="4" y="8" width="16" height="10" rx="3" fill="#FF1D1D"/><rect x="9" y="4" width="6" height="4" rx="2" fill="#FF1D1D"/></svg>
          </div>
          <div className={styles.cardText}><div className={styles.cardTitle}>Internship & Gigs</div><div className={styles.cardDesc}>Connect with industry leaders.</div></div>
        </div>
        <div className={styles.card + ' ' + styles.cardCommunity + ' ' + styles.cardAnim3}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" fill="none"><circle cx="8" cy="10" r="4" fill="#00296B"/><circle cx="16" cy="10" r="4" fill="#00296B"/><rect x="4" y="16" width="16" height="4" rx="2" fill="#00296B"/></svg>
          </div>
          <div className={styles.cardText}><div className={styles.cardTitle}>Community</div><div className={styles.cardDesc}>Personalized career guidance.</div></div>
        </div>
        <div className={styles.card + ' ' + styles.cardEvents + ' ' + styles.cardAnim4}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" fill="none"><rect x="4" y="8" width="16" height="10" rx="3" fill="#008D36"/><path d="M12 4v4" stroke="#008D36" strokeWidth="2"/></svg>
          </div>
          <div className={styles.cardText}><div className={styles.cardTitle}>Events</div><div className={styles.cardDesc}>Learn in-demand skills from experts.</div></div>
        </div>
        <div className={styles.card + ' ' + styles.cardCourses + ' ' + styles.cardAnim5}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" fill="none"><rect x="4" y="8" width="16" height="10" rx="3" fill="#fff"/><rect x="9" y="4" width="6" height="4" rx="2" fill="#fff"/></svg>
          </div>
          <div className={styles.cardText}><div className={styles.cardTitle}>Courses</div><div className={styles.cardDesc}>Enroll in different courses to gain knowledge.</div></div>
        </div>
        <div className={styles.card + ' ' + styles.cardNews + ' ' + styles.cardAnim6}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" fill="none"><rect width="24" height="24" rx="12" fill="#FDC500"/><rect x="6" y="8" width="12" height="2" rx="1" fill="#fff"/><rect x="6" y="12" width="8" height="2" rx="1" fill="#fff"/></svg>
          </div>
          <div className={styles.cardText}><div className={styles.cardTitle}>News & Articles</div><div className={styles.cardDesc}>Top-Notch news to boost your ability thinking.</div></div>
        </div>
      </div>
    </section>
  );
};

export default Empower;
