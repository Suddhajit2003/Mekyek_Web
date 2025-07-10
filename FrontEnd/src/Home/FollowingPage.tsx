import React from 'react';
import styles from './Css/Post.module.css';
import { useNavigate } from 'react-router-dom';

const mockFollowing = [
  { name: 'Anna Lee', title: 'Content Creator at YouTube', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'John Smith', title: 'Tech Blogger', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Priya Patel', title: 'Entrepreneur', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Carlos Gomez', title: 'Fitness Coach', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
  { name: 'Sophia Turner', title: 'Photographer', avatar: 'https://randomuser.me/api/portraits/women/72.jpg' },
];

export default function FollowingPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.friendsPageContainer}>
      <div className={styles.friendsPageHeader}>
        <h2>Following</h2>
        <button className={styles.quickAccessButton} onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className={styles.friendsGrid}>
        {mockFollowing.map((f, i) => (
          <div className={styles.friendCard} key={i}>
            <div className={styles.friendAvatar} style={{ backgroundImage: `url(${f.avatar})` }} />
            <div className={styles.friendInfo}>
              <div className={styles.friendName}>{f.name}</div>
              <div className={styles.friendTitle}>{f.title}</div>
            </div>
            <div className={styles.friendActions}>
              <button className={styles.friendActionBtnSecondary}>Unfollow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 