import styles from "./Css/Trusted.module.css";

const testimonials = [
  {
    name: "James Donovan",
    title: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    quote:
      "I found my dream job at a tech startup within two weeks of using mekyek. The personalized job recommendations and interview preparation resources were invaluable.",
  },
  {
    name: "Sarah Lee",
    title: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    quote:
      "The skill development courses helped me pivot my career from traditional marketing to digital marketing. I gained practical skills that immediately improved my job prospects.",
  },
  {
    name: "Raj Kumar",
    title: "HR Manager",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 5,
    quote:
      "As a hiring manager, mekyek has transformed our recruitment process. We've reduced time-to-hire by 40% and improved the quality of candidates significantly.",
  },
];

const Trusted = () => {
  return (
    <section className={styles.trustedSection}>
      <div className={styles.headingGroup}>
        <h2 className={styles.heading}>What Our Users Say</h2>
        <p className={styles.subheading}>
          Hear from professionals who have transformed their careers with our platform.
        </p>
      </div>
      <div className={styles.testimonialRow}>
        {testimonials.map((t, idx) => (
          <div className={styles.testimonialCard} style={{ animationDelay: `${0.1 + idx * 0.15}s` }} key={t.name}>
            <div className={styles.testimonialHeader}>
              <img src={t.avatar} alt={t.name} className={styles.avatar} />
              <div className={styles.userInfo}>
                <div className={styles.userName}>{t.name}</div>
                <div className={styles.userTitle}>{t.title}</div>
              </div>
            </div>
            <div className={styles.ratingRow}>
              {[...Array(t.rating)].map((_, i) => (
                <span className={styles.star} key={i}>
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none"><path d="M17 2l4.09 8.29L30 11.27l-6.55 6.38L25.18 30 17 24.77 8.82 30l1.73-12.35L4 11.27l8.91-1.02L17 2z" fill="#FCD34D"/></svg>
                </span>
              ))}
            </div>
            <div className={styles.quote}>
              "{t.quote}"
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trusted;
