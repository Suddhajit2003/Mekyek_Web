import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Post from './Home/Post';
import FriendsPage from './Home/FriendsPage';
import FollowingPage from './Home/FollowingPage';
import EventsPage from './Home/EventsPage';
import CommunityPage from './Home/CommunityPage';
import styles from './Css/Home.module.css';

const Home: React.FC = () => {
  console.log('Home component rendering...');
  try {
    return (
      <div className={styles.homeContainer}>
        <div className={styles.feedContainer}>
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
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
