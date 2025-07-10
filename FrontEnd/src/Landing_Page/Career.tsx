import styles from "./Css/Career.module.css";

const Career = () => (
  <section className={styles.careerSection}>
    <div className={styles.headingGroup}>
      <h2 className={styles.heading}>Ready to Accelerate Your Career?</h2>
      <p className={styles.subheading}>
        Join thousands of professionals who are discovering new opportunities and advancing their careers every day.
      </p>
    </div>
    <button className={styles.ctaBtn}>Get Started-Its free</button>
  </section>
);

export default Career;
