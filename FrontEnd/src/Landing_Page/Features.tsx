import { useState, useEffect, useRef } from "react";
import styles from "./Css/Features.module.css";

const features = [
  {
    key: "dreamJob",
    title: "Find Your Dream Job",
    desc:
      "Discover opportunities that match your skills, experience, and career aspirations with our intelligent job matching system.",
    bullets: [
      "Advanced filters for precise job searches",
      "Personalized job recommendations",
      "Salary insights and company reviews",
      "One-click application process",
    ],
    cta: "Explore Jobs",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ctaLink: "#",
  },
  {
    key: "skillDev",
    title: "Skill Development",
    desc:
      "Enhance your skills with curated learning paths, expert resources, and hands-on projects tailored to your career goals.",
    bullets: [
      "Curated courses and certifications",
      "Skill assessments and progress tracking",
      "Mentorship from industry experts",
      "Interactive learning community",
    ],
    cta: "Start Learning",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    ctaLink: "#",
  },
  {
    key: "careerGrowth",
    title: "Career Growth",
    desc:
      "Unlock your potential with personalized career guidance, growth plans, and networking opportunities.",
    bullets: [
      "Personalized career roadmaps",
      "Growth tracking and analytics",
      "Networking with professionals",
      "Exclusive webinars and events",
    ],
    cta: "Grow Now",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    ctaLink: "#",
  },
  {
    key: "interviewPrep",
    title: "Interview Prep.",
    desc:
      "Ace your interviews with mock sessions, feedback, and resources to boost your confidence and performance.",
    bullets: [
      "Mock interviews with experts",
      "Feedback and improvement tips",
      "Interview question banks",
      "Resume and portfolio reviews",
    ],
    cta: "Prepare Now",
    img: "/src/assets/Interview.png",
    ctaLink: "#",
  },
];

const tabLabels = [
  "Find your dream Job",
  "Skill Development",
  "Career Growth",
  "Interview Prep."
];

const AUTO_SLIDE_INTERVAL = 4000;

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [pendingTab, setPendingTab] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTabClick = (idx: number) => {
    if (idx === activeTab || animating) return;
    setDirection(idx > activeTab ? 'right' : 'left');
    setAnimating(true);
    setPendingTab(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => {
      setAnimating(false);
      setActiveTab(idx);
      setPendingTab(null);
    }, 400); // match CSS animation duration
  };

  // Determine which feature to show (active or pending during animation)
  const showTab = pendingTab !== null ? pendingTab : activeTab;

  // Auto-slide effect
  useEffect(() => {
    if (animating || isHovered) return;
    timerRef.current = setInterval(() => {
      if (!animating && !isHovered) {
        const nextTab = (activeTab + 1) % features.length;
        setDirection('right');
        setAnimating(true);
        setPendingTab(nextTab);
        setTimeout(() => {
          setAnimating(false);
          setActiveTab(nextTab);
          setPendingTab(null);
        }, 400);
      }
    }, AUTO_SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTab, animating, isHovered]);

  // Pause on hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <section
      className={styles.featuresSection}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.headingGroup}>
        <h2 className={styles.heading}>Discover Our Features</h2>
        <p className={styles.subheading}>
          Everything you need to accelerate your career journey and find the perfect opportunity.
        </p>
      </div>
      <div className={styles.ctaTabs}>
        {tabLabels.map((label, idx) => (
          <button
            key={label}
            className={
              idx === activeTab ? styles.ctaTabActive : styles.ctaTab
            }
            onClick={() => handleTabClick(idx)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.featureContentRow}>
        <div
          className={
            styles.featureCard +
            " " +
            styles.animatedCard +
            (animating
              ? direction === 'right'
                ? ' ' + styles.slideOutLeft
                : ' ' + styles.slideOutRight
              : pendingTab !== null
                ? direction === 'right'
                  ? ' ' + styles.slideInRight
                  : ' ' + styles.slideInLeft
                : '')
          }
          key={features[showTab].key}
        >
          <div className={styles.featureCardText}>
            <h3 className={styles.featureTitle}>{features[showTab].title}</h3>
            <p className={styles.featureDesc}>{features[showTab].desc}</p>
            <ul className={styles.featureBullets}>
              {features[showTab].bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <a
              href={features[showTab].ctaLink}
              className={styles.featureCtaBtn}
            >
              {features[showTab].cta}
            </a>
          </div>
        </div>
        <div
          className={
            styles.featureImageWrap +
            (animating
              ? direction === 'right'
                ? ' ' + styles.slideOutLeft
                : ' ' + styles.slideOutRight
              : pendingTab !== null
                ? direction === 'right'
                  ? ' ' + styles.slideInRight
                  : ' ' + styles.slideInLeft
                : '')
          }
        >
          <img
            src={features[showTab].img}
            alt={features[showTab].title}
            className={styles.featureImage}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
