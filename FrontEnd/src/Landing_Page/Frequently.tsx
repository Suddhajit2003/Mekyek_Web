import { useState } from "react";
import styles from "./Css/Frequently.module.css";

const faqs = [
  {
    question: "What is mekyek ?",
    answer:
      "Mekyek is a platform that connects ambitious professionals with forward-thinking companies to create meaningful career opportunities.",
  },
  {
    question: "Who's using mekyek ?",
    answer:
      "Professionals seeking jobs and companies looking to hire top talent use mekyek to accelerate their career journey or recruitment process.",
  },
  {
    question: "What types of jobs are available ?",
    answer:
      "Mekyek offers a wide range of job opportunities across industries, including tech, marketing, HR, finance, and more.",
  },
  {
    question: "How can companies post job openings ?",
    answer:
      "Companies can easily post job openings by creating an account and following the guided job posting process on our platform.",
  },
];

const Frequently = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className={styles.faqSection}>
      <div className={styles.headingGroup}>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <p className={styles.subheading}>
          Find answers to common questions about our platform and services.
        </p>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq, idx) => (
          <div
            className={
              styles.faqItem +
              " " +
              (openIdx === idx ? styles.faqOpen : "")
            }
            key={faq.question}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            tabIndex={0}
            role="button"
            aria-expanded={openIdx === idx}
          >
            <div className={styles.faqRow}>
              <div className={styles.faqQuestion}>{faq.question}</div>
              <div className={styles.faqIcon}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ transform: openIdx === idx ? "rotate(180deg)" : "rotate(90deg)", transition: "transform 0.3s" }}
                >
                  <path
                    d="M3 5l4 4 4-4"
                    stroke="#00296B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div
              className={styles.faqAnswer}
              style={{
                maxHeight: openIdx === idx ? 200 : 0,
                opacity: openIdx === idx ? 1 : 0,
                transition: "max-height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s"
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.faqFooter}>
        <div className={styles.faqHelp}>Still have questions? We're here to help.</div>
        <a href="#contact" className={styles.faqCtaBtn}>Contact Support</a>
      </div>
    </section>
  );
};

export default Frequently;
