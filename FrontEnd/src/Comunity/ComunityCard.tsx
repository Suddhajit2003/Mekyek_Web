import React, { useState } from 'react';
import styles from './Css/ComunityCard.module.css';

const ComunityCard: React.FC = () => {
  const [selectedDiscoverCategory, setSelectedDiscoverCategory] = useState('all');
  const [showToast, setShowToast] = useState('');

  const discoverCategories = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'latest', label: 'Latest' }
  ];

  const articles = [
    {
      id: 1,
      date: 'May 13, 2025',
      title: 'Remote Work Trends: Companies Adopting Hybrid',
      description: 'As the world adjusts to new work norms, major corporations are...',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      position: 'left-top'
    },
    {
      id: 2,
      date: 'May 12, 2025',
      title: 'Quantum Computing Breakthrough: New Chip',
      description: 'Scientists have developed a revolutionary chip architecture that...',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      position: 'right-top'
    },
    {
      id: 3,
      date: 'May 13, 2025',
      title: 'Salary Negotiation Strategies for 2025: How to',
      description: 'With changing economic conditions, effective negotiation tactics have...',
      image: 'https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      position: 'left-bottom'
    },
    {
      id: 4,
      date: 'May 12, 2025',
      title: 'Industry 4.0 Implementation: ...',
      description: 'Leading manufacturers reveal how smart factory technologies have...',
      image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      position: 'right-bottom'
    }
  ];

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleDiscoverCategoryClick = (categoryId: string) => {
    setSelectedDiscoverCategory(categoryId);
    const category = discoverCategories.find(c => c.id === categoryId);
    showToastMessage(`Browsing ${category?.label} articles`);
  };

  const handleArticleClick = (articleTitle: string) => {
    showToastMessage(`Reading: ${articleTitle}`);
  };

  const handleJoinCommunity = (articleTitle: string) => {
    showToastMessage(`Joined community: ${articleTitle}`);
  };

  return (
    <div className={styles.container}>
      {/* Toast Messages */}
      {showToast && (
        <div className={styles.toast}>
          {showToast}
        </div>
      )}

      {/* Discover Section */}
      <div className={styles.discoverSection}>
        <h2 className={styles.discoverTitle}>Discover</h2>
        <div className={styles.discoverTabs}>
          {discoverCategories.map((category) => (
            <div
              key={category.id}
              className={`${styles.discoverTab} ${selectedDiscoverCategory === category.id ? styles.discoverTabActive : ''}`}
              onClick={() => handleDiscoverCategoryClick(category.id)}
            >
              {category.label}
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      {articles.map((article) => (
        <div key={article.id} className={`${styles.articleCard} ${styles[article.position]}`}>
          <div 
            className={styles.articleImage}
            style={{
              backgroundImage: `linear-gradient(170.44deg, rgba(0, 0, 0, 0) 8.93%, rgba(0, 0, 0, 0.95) 106.83%), url(${article.image})`
            }}
          ></div>
          <div className={styles.articleContent}>
            <div className={styles.articleInfo}>
              <div className={styles.articleDate}>{article.date}</div>
              <div className={styles.articleTitle}>{article.title}</div>
              <div className={styles.articleDescription}>{article.description}</div>
            </div>
            <div className={styles.frontButtons}>
              <button 
                className={styles.readMoreButton}
                onClick={() => handleArticleClick(article.title)}
              >
                <span>Read More</span>
              </button>
              <button 
                className={styles.joinButtonFront}
                onClick={() => handleJoinCommunity(article.title)}
              >
                <span>Join</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComunityCard;
