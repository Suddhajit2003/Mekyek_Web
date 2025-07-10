import React, { useEffect, useRef, useState } from "react";
import styles from "./Css/Businesses.module.css";

const stats = [
  {
    icon: (
      <span className={styles.iconCircle}>
        {/* User Icon */}
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          <ellipse cx="11" cy="8" rx="8" ry="8" fill="#003F88" />
          <rect y="18" width="22" height="10" rx="5" fill="#000" />
        </svg>
      </span>
    ),
    value: "100%+",
    desc: "Increase in qualified applicants for businesses using our platform",
  },
  {
    icon: (
      <span className={styles.iconCircle}>
        {/* Briefcase Icon */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="7" width="16" height="12" rx="3" fill="#00296B" />
          <rect x="7" y="3" width="8" height="4" rx="2" fill="#00296B" />
        </svg>
      </span>
    ),
    value: "50k+",
    desc: "Job opportunities from verified companies across industries",
  },
  {
    icon: (
      <span className={styles.iconCircle}>
        {/* Group Icon */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="7" cy="9" r="3" fill="#00296B" />
          <circle cx="15" cy="9" r="3" fill="#00296B" />
          <ellipse cx="11" cy="15" rx="7" ry="4" fill="#00296B" />
        </svg>
      </span>
    ),
    value: "75%",
    desc: "Of users find their ideal job within 30 days of active searching",
  },
];

const Businesses: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.businessesSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.headingGroup}>
        <h2 className={styles.heading}>Empowering Businesses and Talent</h2>
        <p className={styles.subheading}>
          We connect ambitious professionals with forward-thinking companies to create meaningful career opportunities and drive business growth.
        </p>
      </div>
      <div className={styles.statsRow}>
        {stats.map((stat, idx) => (
          <div className={styles.statCard} key={idx}>
            {stat.icon}
            <div className={styles.statTextGroup}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statDesc}>{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Businesses;
