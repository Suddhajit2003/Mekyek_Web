import React from 'react';
import styles from './Css/Post.module.css';

const SimplePost: React.FC = () => {
  console.log('SimplePost component rendering...');
  
  return (
    <div className={styles.container}>
      <div className={styles.leftSidebar}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              <div className={styles.avatarCircle}>JS</div>
            </div>
            <div className={styles.profileInfo}>
              <h3>John Smith</h3>
              <p>Software Engineer</p>
            </div>
          </div>
        </div>
        
        <div className={styles.workDashboard}>
          <h3>Work Dashboard</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h4>12</h4>
              <p>Applied Jobs</p>
            </div>
            <div className={styles.statCard}>
              <h4>8</h4>
              <p>Saved Jobs</p>
            </div>
            <div className={styles.statCard}>
              <h4>45</h4>
              <p>Viewed Jobs</p>
            </div>
            <div className={styles.statCard}>
              <h4>3</h4>
              <p>Interviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.postCreationCard}>
          <div className={styles.postInput}>
            <div className={styles.avatarCircle}>JS</div>
            <input 
              type="text" 
              placeholder="Share what's on your mind..."
              readOnly
            />
          </div>
        </div>

        <div className={styles.postCard}>
          <div className={styles.postHeader}>
            <div className={styles.avatarCircle}>SA</div>
            <div className={styles.postInfo}>
              <h4>Sarah Anderson</h4>
              <p>Product Manager • 2h</p>
            </div>
          </div>
          <div className={styles.postContent}>
            <p>Excited to announce our new product launch! 🚀</p>
          </div>
          <div className={styles.postActions}>
            <button>Like</button>
            <button>Comment</button>
            <button>Share</button>
          </div>
        </div>
      </div>

      <div className={styles.rightSidebar}>
        <div className={styles.trendingSection}>
          <h3>🔥 Top Trending</h3>
          <div className={styles.trendingItem}>
            <p>Tech news update</p>
            <span>15,892 readers</span>
          </div>
          <div className={styles.trendingItem}>
            <p>Market analysis</p>
            <span>8,567 readers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePost; 