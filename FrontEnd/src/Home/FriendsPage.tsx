import React from 'react';
import styles from './Css/Post.module.css';
import { useNavigate } from 'react-router-dom';

const mockFriends = [
  { name: 'Emily Rodriguez', title: 'Marketing Director at TechCorp', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1dd?auto=format&fit=crop&w=687&q=80' },
  { name: 'David Kim', title: 'Product Manager at StartupX', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1170&q=80' },
  { name: 'Lisa Chen', title: 'Data Scientist at AnalyticsPro', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1170&q=80' },
  { name: 'Sarah Johnson', title: 'Senior UX Designer at Google', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Michael Chen', title: 'Engineering Manager at Tesla', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
];

export default function FriendsPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.friendsPageContainer}>
      <div className={styles.friendsPageHeader}>
        <h2>Your Friends</h2>
        <button className={styles.quickAccessButton} onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className={styles.friendsGrid}>
        {mockFriends.map((f, i) => (
          <div className={styles.friendCard} key={i}>
            <div className={styles.friendAvatar} style={{ backgroundImage: `url(${f.avatar})` }} />
            <div className={styles.friendInfo}>
              <div className={styles.friendName}>{f.name}</div>
              <div className={styles.friendTitle}>{f.title}</div>
            </div>
            <div className={styles.friendActions}>
              <button className={styles.friendActionBtn}>Message</button>
              <button className={styles.friendActionBtnSecondary}>Unfriend</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 