import React from 'react';
import { useAuth } from '../hooks/useApi';
import styles from './Css/Navbar.module.css';
import mekyekLogo from '../assets/Mekyek.png';
import { FaSearch, FaBell, FaMoon, FaSun, FaEllipsisV, FaCog, FaShieldAlt, FaQuestionCircle, FaSignOutAlt, FaBriefcase } from 'react-icons/fa';

interface NavbarProps {
  onProfileClick?: () => void;
  currentPage?: string;
  onNavClick?: (page: string) => void;
  onDashboardClick?: () => void;
  setCurrentPage?: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick, currentPage = 'Home', onNavClick, onDashboardClick, setCurrentPage }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const { logout, isAuthenticated } = useAuth();
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    }
  };

  const handleNavItemClick = (page: string) => {
    if (onNavClick) {
      onNavClick(page);
    }
  };
  
  const handleSignOut = () => {
    logout();
    if (setCurrentPage) setCurrentPage('Landing');
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <img src={mekyekLogo} alt="Mekyek Logo" className={styles.logoImage} />
          <span className={styles.Mekyek}>Mekyek.</span>
        </div>
        <div className={styles.navItems}>
          <a
            href="#"
            className={currentPage === 'Home' ? styles.Home : styles.navItem}
            onClick={(e) => { e.preventDefault(); handleNavItemClick('Home'); }}
          >
            Home
          </a>
          <a
            href="#"
            className={currentPage === 'News' ? styles.Home : styles.navItem}
            onClick={(e) => { e.preventDefault(); handleNavItemClick('News'); }}
          >
            News
          </a>
          <a
            href="#"
            className={currentPage === 'Community' ? styles.Home : styles.navItem}
            onClick={(e) => { e.preventDefault(); handleNavItemClick('Community'); }}
          >
            Community
          </a>
          <a
            href="#"
            className={currentPage === 'Learn' ? styles.Home : styles.navItem}
            onClick={(e) => { e.preventDefault(); handleNavItemClick('Learn'); }}
          >
            Learn
          </a>
          <a
            href="#"
            className={currentPage === 'Events' ? styles.Home : styles.navItem}
            onClick={(e) => { e.preventDefault(); handleNavItemClick('Events'); }}
          >
            Events
          </a>
          <a
            href="#"
            className={currentPage === 'Work' ? styles.Home : styles.navItem}
            onClick={(e) => { e.preventDefault(); handleNavItemClick('Work'); }}
          >
            Work
          </a>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.search}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.Search}
          />
        </div>
        <div className={styles.pfpAndNotifi}>
          <FaBell className={styles.icon} />
          {isDark ? (
            <FaSun className={styles.icon} style={{ color: '#FFD700', cursor: 'pointer' }} onClick={toggleDarkMode} title="Switch to light mode" />
          ) : (
            <FaMoon className={styles.icon} style={{ color: '#00296B', cursor: 'pointer' }} onClick={toggleDarkMode} title="Switch to dark mode" />
          )}
          <div
            className={styles.pfp}
            onClick={handleProfileClick}
          ></div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <FaEllipsisV
              style={{ fontSize: 24, color: '#00296B', marginLeft: 12, cursor: 'pointer' }}
              onClick={() => setShowOptions((v) => !v)}
              aria-label="More options"
            />
            {showOptions && (
              <div
                ref={optionsRef}
                className={styles.optionsPopup}
                style={{
                  position: 'absolute',
                  top: 36,
                  right: 0,
                  zIndex: 1000,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  padding: '16px 8px',
                  width: 210,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: 0, cursor: 'pointer' }} onClick={() => setShowOptions(false)}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, padding: 4 }}><FaCog style={{ color: '#00296B', fontSize: 22 }} /></span>
                  <span style={{ fontSize: 18, color: '#00296B', fontFamily: 'Segoe UI' }}>Account Settings</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: 0, cursor: 'pointer' }} onClick={() => {
                  setShowOptions(false);
                  if (onDashboardClick) {
                    onDashboardClick();
                  }
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, padding: 4 }}><FaBriefcase style={{ color: '#00296B', fontSize: 22 }} /></span>
                  <span style={{ fontSize: 18, color: '#00296B', fontFamily: 'Segoe UI' }}>Company Dashboard</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: 0, cursor: 'pointer' }} onClick={() => setShowOptions(false)}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 36, padding: 4 }}><FaShieldAlt style={{ color: '#00296B', fontSize: 22 }} /></span>
                  <span style={{ fontSize: 18, color: '#00296B', fontFamily: 'Segoe UI' }}>Privacy</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: 0, cursor: 'pointer' }} onClick={() => setShowOptions(false)}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, padding: 4 }}><FaQuestionCircle style={{ color: '#00296B', fontSize: 22 }} /></span>
                  <span style={{ fontSize: 18, color: '#00296B', fontFamily: 'Segoe UI' }}>Help Center</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 28, padding: 0, cursor: 'pointer' }} onClick={() => setShowOptions(false)}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 28, padding: 4 }}><FaSignOutAlt style={{ color: '#00296B', fontSize: 22 }} /></span>
                  {isAuthenticated && (
                    <button onClick={handleSignOut} className="signout-btn">
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;