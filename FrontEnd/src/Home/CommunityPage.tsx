import React from 'react';
import styles from './Css/Post.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaComments, FaBell, FaCog } from 'react-icons/fa';

const mockJoinedCommunities = [
  {
    id: 1,
    name: "Tech Professionals Network",
    description: "Connect with software engineers, designers, and tech leaders",
    memberCount: 1247,
    activityLevel: "High",
    lastActivity: "2 hours ago",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    isAdmin: false
  },
  {
    id: 2,
    name: "Startup Founders Club",
    description: "A community for entrepreneurs to share ideas and get mentorship",
    memberCount: 892,
    activityLevel: "Medium",
    lastActivity: "1 day ago",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    isAdmin: true
  },
  {
    id: 3,
    name: "UX/UI Designers",
    description: "Share design inspiration, tools, and best practices",
    memberCount: 2156,
    activityLevel: "High",
    lastActivity: "30 minutes ago",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    isAdmin: false
  },
  {
    id: 4,
    name: "Remote Work Community",
    description: "Tips, tools, and support for remote workers worldwide",
    memberCount: 3421,
    activityLevel: "Medium",
    lastActivity: "3 hours ago",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    isAdmin: false
  },
  {
    id: 5,
    name: "Data Science Hub",
    description: "Machine learning, AI, and data analytics discussions",
    memberCount: 1567,
    activityLevel: "High",
    lastActivity: "1 hour ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    isAdmin: false
  }
];

export default function CommunityPage() {
  const navigate = useNavigate();
  
  const getActivityColor = (level: string) => {
    switch (level) {
      case 'High':
        return '#10b981';
      case 'Medium':
        return '#f59e0b';
      case 'Low':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={styles.friendsPageContainer}>
      <div className={styles.friendsPageHeader}>
        <h2>My Communities</h2>
        <button className={styles.quickAccessButton} onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className={styles.friendsGrid}>
        {mockJoinedCommunities.map((community) => (
          <div className={styles.friendCard} key={community.id}>
            <div 
              className={styles.friendAvatar} 
              style={{ 
                backgroundImage: `url(${community.image})`,
                borderRadius: '12px',
                width: '100%',
                height: '160px',
                marginBottom: '16px'
              }} 
            />
            <div className={styles.friendInfo}>
              <div className={styles.friendName}>
                {community.name}
                {community.isAdmin && (
                  <span style={{ 
                    marginLeft: '8px', 
                    fontSize: '0.7rem', 
                    backgroundColor: '#0077b5', 
                    color: 'white', 
                    padding: '2px 6px', 
                    borderRadius: '4px' 
                  }}>
                    Admin
                  </span>
                )}
              </div>
              <div className={styles.friendTitle}>{community.description}</div>
              
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                  <FaUsers style={{ color: '#0077b5' }} />
                  {community.memberCount.toLocaleString()} members
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                  <FaComments style={{ color: '#0077b5' }} />
                  Last activity: {community.lastActivity}
                </div>
              </div>
            </div>
            <div className={styles.friendActions}>
              <div 
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  backgroundColor: getActivityColor(community.activityLevel) + '20',
                  color: getActivityColor(community.activityLevel),
                  border: `1px solid ${getActivityColor(community.activityLevel)}`
                }}
              >
                {community.activityLevel} Activity
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className={styles.friendActionBtn}>
                  <FaBell style={{ marginRight: '6px' }} />
                  Notifications
                </button>
                {/* {community.isAdmin && (
                  <button className={styles.friendActionBtnSecondary}>
                    <FaCog style={{ marginRight: '6px' }} />
                    Manage
                  </button>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 