import React, { useState } from 'react';
import Post from './Home/Post';
import FriendsPage from './Home/FriendsPage';
import FollowingPage from './Home/FollowingPage';
import EventsPage from './Home/EventsPage';
import CommunityPage from './Home/CommunityPage';
import styles from './Css/Home.module.css';

const TABS = [
  { key: 'feed', label: 'Feed', component: <Post /> },
  { key: 'friends', label: 'Friends', component: <FriendsPage /> },
  { key: 'following', label: 'Following', component: <FollowingPage /> },
  { key: 'events', label: 'Events', component: <EventsPage /> },
  { key: 'community', label: 'Community', component: <CommunityPage /> },
];

const Home: React.FC = () => {
  const [tab, setTab] = useState('feed');

  // Handler to allow Post to trigger tab changes
  const handleNavigate = (page: string) => {
    switch (page.toLowerCase()) {
      case 'community':
        setTab('community');
        break;
      case 'events':
        setTab('events');
        break;
      case 'friends':
        setTab('friends');
        break;
      case 'following':
        setTab('following');
        break;
      default:
        setTab('feed');
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tabBar}>
        {TABS.map(t => (
          <button
            key={t.key}
            className={tab === t.key ? styles.activeTab : styles.tab}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.feedContainer}>
        {tab === 'feed' && <Post onNavigate={handleNavigate} />}
        {tab === 'friends' && <FriendsPage />}
        {tab === 'following' && <FollowingPage />}
        {tab === 'events' && <EventsPage />}
        {tab === 'community' && <CommunityPage />}
      </div>
    </div>
  );
};

export default Home;
