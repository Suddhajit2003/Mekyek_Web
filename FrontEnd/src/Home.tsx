import React from 'react';
import Post from './Home/Post';
import styles from './Css/Home.module.css';

const Home: React.FC = () => {
  console.log('Home component rendering...');
  
  try {
    return (
      <div className={styles.homeContainer}>
        <div className={styles.feedContainer}>
          <Post />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error in Home Component</h2>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

export default Home;
