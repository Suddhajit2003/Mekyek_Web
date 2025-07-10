import styles from "./Css/Footer.module.css";

const Footer = () => (
  <footer className={styles.footerSection}>
    <div className={styles.footerContent}>
      <div className={styles.footerCol + ' ' + styles.aboutCol}>
        <div className={styles.footerTitle}>About Us</div>
        <div className={styles.footerDesc}>
          Connecting professionals, empowering careers, and fostering growth in the digital age.
        </div>
      </div>
      <div className={styles.footerCol + ' ' + styles.quickLinksCol}>
        <div className={styles.footerTitle}>Quick Links</div>
        <div className={styles.footerLink}>News feed</div>
        <div className={styles.footerLink}>Courses</div>
        <div className={styles.footerLink}>Events</div>
        <div className={styles.footerLink}>Jobs</div>
      </div>
      <div className={styles.footerCol + ' ' + styles.resourcesCol}>
        <div className={styles.footerTitle}>Resources</div>
        <div className={styles.footerLink}>Community</div>
        <div className={styles.footerLink}>Learning Center</div>
        <div className={styles.footerLink}>ATS</div>
        <div className={styles.footerLink}>Help Center</div>
      </div>
      <div className={styles.footerCol + ' ' + styles.contactCol}>
        <div className={styles.footerTitle}>Contact Us</div>
        <div className={styles.footerContact}>Email: contact@example.com</div>
        <div className={styles.footerContact}>Phone: +1 234 567 890</div>
        <div className={styles.footerContact}>Address: 123 Business Ave</div>
      </div>
    </div>
    <div className={styles.divider} />
    <div className={styles.footerBottom}>
      <div className={styles.copyright}>
        © 2024 mekyek. All rights reserved.
      </div>
      <div className={styles.policyLinks}>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Cookie Policy</span>
      </div>
      <div className={styles.socialSection}>
        <div className={styles.socialLabel}>Follow Us :</div>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="LinkedIn" className={styles.socialIcon}><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect width="18" height="18" rx="4" fill="#fff"/><path d="M5.5 7.5V12.5" stroke="#003F88" strokeWidth="1.2" strokeLinecap="round"/><circle cx="5.5" cy="5.5" r="1" fill="#003F88"/><path d="M8.5 10V12.5" stroke="#003F88" strokeWidth="1.2" strokeLinecap="round"/><path d="M8.5 9.5C8.5 8.39543 9.39543 7.5 10.5 7.5C11.6046 7.5 12.5 8.39543 12.5 9.5V12.5" stroke="#003F88" strokeWidth="1.2"/></svg></a>
          <a href="#" aria-label="Twitter" className={styles.socialIcon}><svg width="18" height="15" fill="none" viewBox="0 0 18 15"><path d="M18 1.8a7.2 7.2 0 0 1-2.1.6A3.6 3.6 0 0 0 17.5.3a7.2 7.2 0 0 1-2.3.9A3.6 3.6 0 0 0 8.8 4.2c0 .3 0 .6.1.8A10.2 10.2 0 0 1 1.2.6a3.6 3.6 0 0 0 1.1 4.8A3.6 3.6 0 0 1 .7 4.8v.1a3.6 3.6 0 0 0 2.9 3.5c-.2.1-.4.1-.7.1-.2 0-.3 0-.5-.1a3.6 3.6 0 0 0 3.4 2.5A7.2 7.2 0 0 1 0 13.2a10.2 10.2 0 0 0 5.5 1.6c6.6 0 10.2-5.5 10.2-10.2v-.5A7.2 7.2 0 0 0 18 1.8z" fill="#fff"/></svg></a>
          <a href="#" aria-label="Facebook" className={styles.socialIcon}><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect width="18" height="18" rx="4" fill="#fff"/><path d="M12 6.5h-1a1 1 0 0 0-1 1v1h2l-.5 2h-1.5v5h-2v-5H6v-2h1.5v-1a3 3 0 0 1 3-3h1v2z" fill="#003F88"/></svg></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
