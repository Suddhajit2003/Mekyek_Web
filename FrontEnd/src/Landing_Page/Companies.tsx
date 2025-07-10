import styles from "./Css/Trusted.module.css";

const Companies = () => (
  <section className={styles.companiesSection}>
    <div className={styles.headingGroup}>
      <h2 className={styles.heading}>Trusted by Leading Companies</h2>
      <p className={styles.subheading}>
        Join thousands of businesses that use our platform to find and hire top talent.
      </p>
      <div className={styles.subheading2}>Trusted By Industry Veterans</div>
    </div>
    <div className={styles.logosRow}>
      {/* Logos would go here, but are hidden (display: none) as per design */}
    </div>
  </section>
);

export default Companies; 