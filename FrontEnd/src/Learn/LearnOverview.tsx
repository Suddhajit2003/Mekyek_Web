import React, { useState } from 'react';
import styles from './Css/LearnOverview.module.css';

const LearnOverview: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState('');

  const learningPaths = [
    {
      id: 1,
      title: 'AI & Machine Learning',
      description: 'Build cutting-edge AI skills with hands-on projects from Google, IBM, and Stanford',
      courses: '50+ courses',
      icon: '🤖',
      duration: '3-6 months',
      level: 'Beginner to Advanced',
      skills: ['Python', 'TensorFlow', 'Neural Networks', 'Deep Learning'],
      companies: ['Google', 'IBM', 'Stanford'],
      enrollment: '2.1M+ enrolled'
    },
    {
      id: 2,
      title: 'Data Science & Analytics',
      description: 'Master data analysis, visualization, and machine learning for business impact',
      courses: '40+ courses',
      icon: '📊',
      duration: '4-8 months',
      level: 'Beginner to Professional',
      skills: ['Python', 'R', 'SQL', 'Tableau', 'Power BI'],
      companies: ['IBM', 'Google', 'Meta'],
      enrollment: '1.8M+ enrolled'
    },
    {
      id: 3,
      title: 'Professional Development',
      description: 'Advance your career with leadership, project management, and business skills',
      courses: '60+ courses',
      icon: '🎯',
      duration: '2-4 months',
      level: 'All Levels',
      skills: ['Leadership', 'Project Management', 'Communication', 'Strategy'],
      companies: ['Google', 'Microsoft', 'University of Pennsylvania'],
      enrollment: '3.2M+ enrolled'
    }
  ];

  const stats = {
    totalCourses: '10,000+',
    universities: '350+',
    professionals: '100M+',
    certificates: '500+'
  };

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToastMessage(`🔍 Searching for "${searchQuery}" across 10,000+ courses...`);
    } else {
      showToastMessage('⚠️ Please enter a search term');
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleExploreCourses = () => {
    showToastMessage('🚀 Exploring 10,000+ courses from top universities...');
  };

  const handleViewLearningPaths = () => {
    showToastMessage('🎓 Viewing all professional learning paths...');
  };

  const handlePathExplore = (pathTitle: string) => {
    showToastMessage(`✨ Exploring ${pathTitle} - Start your 7-day free trial!`);
  };

  const handleFilter = () => {
    showToastMessage('🎯 Opening advanced filters...');
  };

  const handleSort = () => {
    showToastMessage('📊 Opening sort options...');
  };

  const handleViewAll = () => {
    showToastMessage('🔥 Viewing all learning paths from top companies...');
  };

  return (
    <div className={styles.learnContainer}>
      {/* Toast Messages */}
      {showToast && (
        <div className={styles.toast}>
          {showToast}
        </div>
      )}

      {/* Search Section */}
      <form onSubmit={handleSearch} className={styles.searchContent}>
        <div className={styles.searchIcon}>
          <div className={styles.searchIconVector}></div>
        </div>
        <div className={styles.placeText}>
          <input
            type="text"
            placeholder="What do you want to learn? Try 'Python', 'Data Science', 'AI'..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className={styles.searchInput}
          />
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {/* Filter and Sort Buttons */}
      <button className={styles.filterButton} onClick={handleFilter}>
        Filter
      </button>
      <button className={styles.sortButton} onClick={handleSort}>
        Sort By
      </button>

      {/* Hero Section */}
      <div className={styles.exploreCourses}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Advance Your Career with World-Class Learning
          </h1>
          <p className={styles.heroDescription}>
            Join 100M+ learners worldwide. Access 10,000+ courses, professional certificates, and degrees from top universities and companies like Google, IBM, and Stanford.
          </p>
        </div>
        <div className={styles.heroButtons}>
          <button className={styles.exploreCoursesBtn} onClick={handleExploreCourses}>
            Start Free Trial
          </button>
          <button className={styles.viewLearningPathsBtn} onClick={handleViewLearningPaths}>
            View Learning Paths
          </button>
        </div>
      </div>

      {/* Learning Paths Section */}
      <h2 className={styles.learningPathsTitle}>Professional Learning Paths</h2>
      <button className={styles.viewAllButton} onClick={handleViewAll}>
        view all
      </button>

      {/* Learning Path Cards */}
      {learningPaths.map((path, index) => (
        <div key={path.id} className={`${styles.pathCard} ${styles[`path${index + 1}`]}`}>
          <div className={styles.pathContent}>
            <div className={styles.pathIcon}>
              {path.icon}
            </div>
            <div className={styles.pathInfo}>
              <h3 className={styles.pathTitle}>{path.title}</h3>
              <p className={styles.pathDescription}>{path.description}</p>
            </div>
          </div>
          <div className={styles.pathFooter}>
            <span className={styles.pathCourses}>{path.courses}</span>
            <button 
              className={styles.pathExploreBtn}
              onClick={() => handlePathExplore(path.title)}
            >
              Explore Path
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearnOverview;
