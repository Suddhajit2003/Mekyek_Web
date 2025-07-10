import React, { useState, useEffect } from 'react';
import { useNews, useAuth } from '../hooks/useApi';
import PostCreation from './PostCreation';
import AnalyticsPopup from './AnalyticsPopup';
import styles from './Css/Post.module.css';
import { 
  FaThumbsUp, 
  FaComment, 
  FaShare, 
  FaEllipsisH,
  FaBookmark,
  FaGlobeAmericas,
  FaUserFriends,
  FaLock,
  FaBriefcase,
  FaChartLine,
  FaCalendarAlt,
  FaTasks,
  FaUsers,
  FaFileAlt,
  FaHeart,
  FaEye,
  FaHandshake,
  FaPaperPlane,
  FaImages,
  FaSmile,
  FaInfo
} from 'react-icons/fa';

// Define proper post type
interface PostType {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
    time: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  visibility?: 'public' | 'connections' | 'private';
  postComments?: PostComment[];
}

// Comment interface
interface PostComment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

// Job Stats interface
interface JobStats {
  applied: number;
  saved: number;
  viewed: number;
  interviews: number;
}

// Enhanced mock data with professional content
const mockPosts: PostType[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      title: 'Senior UX Designer at Google',
      avatar: 'SJ',
      time: '2h'
    },
    content: 'Just wrapped up an incredible workshop on AI-powered design systems!\n\nKey takeaways:\n• AI can accelerate design workflows by 60%\n• User research remains irreplaceable\n• The future is collaborative, not competitive\n\nWhat\'s your experience with AI in design? Drop your thoughts below!\n\n#UXDesign #AIDesign #Innovation',
    image: '/api/placeholder/600/400',
    likes: 234,
    comments: 47,
    shares: 23,
        isLiked: false,
    isSaved: false,
    visibility: 'public',
    postComments: [
      {
        id: 'c1',
        author: { name: 'Mike Chen', avatar: 'MC' },
        content: 'This is so insightful! We\'ve been exploring AI in our design process too. The 60% efficiency gain is remarkable.',
            time: '1h',
        likes: 12,
            isLiked: false
      },
      {
        id: 'c2',
        author: { name: 'Lisa Wang', avatar: 'LW' },
        content: 'Great points! I agree that user research can\'t be replaced. AI should augment, not replace human insight.',
        time: '45min',
        likes: 8,
        isLiked: true
      }
    ]
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      title: 'Engineering Manager at Tesla',
      avatar: 'MC',
      time: '5h'
    },
    content: 'Exciting milestone! Our autonomous driving team just achieved 99.97% accuracy in object detection.\n\nThis journey taught me:\n→ Innovation requires relentless iteration\n→ Diverse teams build better solutions\n→ Safety must always come first\n\nProud of this incredible team and what we\'re building for the future of transportation!\n\n#Innovation #AutonomousDriving #TeamWork',
    image: '/api/placeholder/600/350',
    likes: 892,
    comments: 156,
    shares: 78,
    isLiked: true,
    isSaved: true,
    visibility: 'public',
    postComments: [
      {
        id: 'c3',
        author: { name: 'Alex Rodriguez', avatar: 'AR' },
        content: 'Incredible achievement! The safety-first approach is exactly what the industry needs.',
        time: '2h',
        likes: 34,
        isLiked: false
      }
    ]
  },
  {
    id: '3',
    author: {
      name: 'Emily Rodriguez',
      title: 'VP of Marketing at Spotify',
      avatar: 'ER',
      time: '8h'
    },
    content: 'Big news! We just crossed 500M active users worldwide!\n\nThis achievement reflects:\n✓ The power of music to connect us all\n✓ Our commitment to artist empowerment\n✓ Data-driven personalization at scale\n\nGrateful for our amazing team and the artists who make it all possible. Here\'s to the next chapter!\n\n#Spotify #Music #Milestone #Gratitude',
    likes: 1247,
    comments: 203,
    shares: 95,
        isLiked: false,
    isSaved: false,
    visibility: 'public',
    postComments: []
  },
  {
    id: '4',
    author: {
      name: 'David Kim',
      title: 'Lead Data Scientist at Netflix',
      avatar: 'DK',
      time: '12h'
    },
    content: 'Mind-blowing revelation from our latest recommendation algorithm!\n\nWe discovered that viewer mood prediction improves content engagement by 40%. The key? Analyzing:\n\n• Viewing patterns\n• Time of day preferences  \n• Genre switching behavior\n• Device usage patterns\n\nMachine learning continues to amaze me every day! What\'s the most surprising data insight you\'ve discovered?\n\n#DataScience #MachineLearning #Netflix #Analytics',
    likes: 567,
    comments: 89,
    shares: 34,
    isLiked: true,
    isSaved: true,
    visibility: 'connections',
    postComments: []
  }
];

interface PostProps {
  onPostCreated?: (post: PostType) => void;
}

// Mock data for right sidebar
const trendingNews = [
  { id: 1, title: "AI job market grows 200% in Q2", time: "1h ago" },
  { id: 2, title: "Tech salaries hit record highs despite market shifts", time: "3h ago" },
  { id: 3, title: "Remote work becoming permanent at major tech firms", time: "5h ago" },
  { id: 4, title: "New framework simplifies web development", time: "1d ago" },
  { id: 5, title: "Cybersecurity threats increase by 40%", time: "2d ago" }
];

const peopleYouMayKnow = [
  {
    id: 1,
    avatar: "JD",
    name: "Jennifer Davis",
    title: "Product Manager at Amazon",
    mutual: 12
  },
  {
    id: 2,
    avatar: "RK",
    name: "Robert Kim",
    title: "Senior Developer at Microsoft",
    mutual: 8
  },
  {
    id: 3,
    avatar: "MP",
    name: "Michelle Park",
    title: "UX Designer at Adobe",
    mutual: 5
  },
  {
    id: 4,
    avatar: "TS",
    name: "Thomas Smith",
    title: "Data Scientist at Tesla",
    mutual: 3
  }
];

const Post: React.FC<PostProps> = ({ onPostCreated }) => {
  console.log('Post component rendering...');
  
  const { news, loading, error } = useNews();
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>(mockPosts);
  const [jobStats, setJobStats] = useState<JobStats>({
    applied: 12,
    saved: 8,
    viewed: 45,
    interviews: 3
  });
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showRepostModal, setShowRepostModal] = useState<string | null>(null);
  const [repostComment, setRepostComment] = useState('');
  const [showAnalyticsPopup, setShowAnalyticsPopup] = useState<boolean>(false);

  console.log('Post component state:', { posts: posts.length, user, loading, error });

  useEffect(() => {
    try {
      if (news && news.length > 0) {
        // Transform news data to match our PostType interface
        const transformedPosts = news.map((item: any, index: number) => ({
          id: item.id || `news-${index}`,
          author: {
            name: item.author || 'Anonymous',
            title: item.authorTitle || 'Professional',
            avatar: item.author ? item.author.charAt(0).toUpperCase() : 'A',
            time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently'
          },
          content: item.content || item.title || '',
          image: item.image || undefined,
          likes: item.likes || Math.floor(Math.random() * 100),
          comments: item.comments || Math.floor(Math.random() * 20),
          shares: item.shares || Math.floor(Math.random() * 10),
      isLiked: false,
          isSaved: false,
          visibility: 'public' as const,
          postComments: []
        }));
        setPosts([...transformedPosts, ...mockPosts]);
      }
    } catch (err) {
      console.error('Error processing news data:', err);
    }
  }, [news]);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleCommentToggle = (postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleCommentSubmit = (postId: string) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    const newComment: PostComment = {
      id: Date.now().toString(),
      author: {
        name: user?.name || 'You',
        avatar: user?.name?.charAt(0).toUpperCase() || 'U'
      },
      content: comment,
      time: 'Just now',
      likes: 0,
      isLiked: false
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: post.comments + 1,
            postComments: [...(post.postComments || []), newComment]
          }
        : post
    ));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleRepost = (postId: string) => {
    setShowRepostModal(postId);
  };

  const handleRepostSubmit = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    setShowRepostModal(null);
    setRepostComment('');
  };

  const handleNewPost = (newPost: PostType) => {
    setPosts(prev => [newPost, ...prev]);
    if (onPostCreated) {
      onPostCreated(newPost);
    }
  };

  const handleViewAnalytics = () => {
    setShowAnalyticsPopup(true);
  };

  const handleCloseAnalytics = () => {
    setShowAnalyticsPopup(false);
  };

  const getVisibilityIcon = (visibility: string = 'public') => {
    switch (visibility) {
      case 'public':
        return <FaGlobeAmericas className={styles.visibilityIcon} />;
      case 'connections':
        return <FaUserFriends className={styles.visibilityIcon} />;
      case 'private':
        return <FaLock className={styles.visibilityIcon} />;
      default:
        return <FaGlobeAmericas className={styles.visibilityIcon} />;
    }
  };

  // When there's an error fetching data, we'll log it but still render the component
  // with the mock data so the design can be reviewed.
  if (error) {
    console.warn('API Error:', error, 'Falling back to offline mock data.');
  }

  if (loading) {
  return (
    <div className={styles.container}>
        <div className={styles.loading}>Loading posts...</div>
                </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <div className={styles.leftSidebar}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileBackground}></div>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3 className={styles.profileName}>{user?.name || 'John Smith'}</h3>
            <p className={styles.profileTitle}>{user?.title || 'Software Engineer at Mekyek'}</p>
          </div>
          
          {/* Work Dashboard */}
          <div className={styles.workDashboard}>
            <h4 className={styles.dashboardTitle}>
              <FaBriefcase className={styles.dashboardIcon} />
              Work Dashboard
            </h4>
            <div className={styles.dashboardStatsGrid}>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.appliedIcon}`}><FaTasks /></div>
                <div className={styles.statInfo}>
                  <p className={styles.statNumber}>{jobStats.applied}</p>
                  <p className={styles.statLabel}>Applied</p>
            </div>
          </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.savedIcon}`}><FaBookmark /></div>
                <div className={styles.statInfo}>
                  <p className={styles.statNumber}>{jobStats.saved}</p>
                  <p className={styles.statLabel}>Saved</p>
        </div>
            </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.viewedIcon}`}><FaEye /></div>
                <div className={styles.statInfo}>
                  <p className={styles.statNumber}>{jobStats.viewed}</p>
                  <p className={styles.statLabel}>Viewed</p>
            </div>
            </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIcon} ${styles.interviewIcon}`}><FaHandshake /></div>
                <div className={styles.statInfo}>
                  <p className={styles.statNumber}>{jobStats.interviews}</p>
                  <p className={styles.statLabel}>Interviews</p>
          </div>
          </div>
        </div>
            <div className={styles.dashboardActions}>
              <button className={styles.dashboardAction} onClick={handleViewAnalytics}>
                <FaChartLine className={styles.actionIcon} /> View Analytics
              </button>
                    </div>
                  </div>
                </div>

        {/* Quick Access Card */}
        <div className={styles.quickAccessCard}>
          <div className={styles.quickAccessItem}><FaUsers /> Your community</div>
          <div className={styles.quickAccessItem}><FaCalendarAlt /> Event</div>
          <div className={styles.quickAccessItem}><FaFileAlt /> Your Courses</div>
                      </div>
                      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <PostCreation onPostCreated={handleNewPost} />
        
        {/* Posts Feed */}
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            {/* Post Header */}
            <div className={styles.postHeader}>
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>
                  {post.author.avatar}
              </div>
                <div className={styles.authorDetails}>
                  <h4 className={styles.authorName}>{post.author.name}</h4>
                  <p className={styles.authorTitle}>{post.author.title}</p>
                  <div className={styles.postMeta}>
                    <span className={styles.postTime}>{post.author.time}</span>
                    <span className={styles.separator}>•</span>
                    {getVisibilityIcon(post.visibility)}
            </div>
          </div>
      </div>
              <button className={styles.moreButton}>
                <FaEllipsisH />
              </button>
            </div>
            
            {/* Post Content */}
            <div className={styles.postContent}>
              <p className={styles.postText}>{post.content}</p>
              {post.image && (
                <div className={styles.postImageContainer}>
                  <img 
                    src={post.image} 
                    alt="Post content"
                    className={styles.postImage}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                      e.currentTarget.parentElement!.style.height = '300px';
                      e.currentTarget.parentElement!.style.display = 'flex';
                      e.currentTarget.parentElement!.style.alignItems = 'center';
                      e.currentTarget.parentElement!.style.justifyContent = 'center';
                      e.currentTarget.parentElement!.innerHTML = '<span style="color: #666;">Image content</span>';
                    }}
                  />
            </div>
              )}
          </div>
          
          {/* Post Stats */}
            <div className={styles.postStats}>
              <div className={styles.likesInfo}>
                <div className={styles.likeReactions}>
                  <span className={styles.likeIcon}>👍</span>
                  <span className={styles.likeIcon}>❤️</span>
                  <span className={styles.likeIcon}>🎉</span>
                  <span className={styles.likeIcon}>🚀</span>
            </div>
                <span className={styles.likesCount}>{post.likes.toLocaleString()}</span>
          </div>
              <div className={styles.statsRight}>
                <span className={styles.commentCount} onClick={() => handleCommentToggle(post.id)}>
                  {post.comments} comments
                      </span>
                <span className={styles.shareCount}>{post.shares} reposts</span>
                  </div>
                </div>

            {/* Post Actions */}
            <div className={styles.postActions}>
                      <button 
                className={`${styles.actionButton} ${post.isLiked ? styles.liked : ''}`}
                onClick={() => handleLike(post.id)}
                      >
                <FaThumbsUp className={styles.actionIcon} />
                <span className={styles.actionText}>Like</span>
                      </button>
                <button 
                className={styles.actionButton}
                onClick={() => handleCommentToggle(post.id)}
            >
              <FaComment className={styles.actionIcon} />
              <span className={styles.actionText}>Comment</span>
              </button>
              <button 
                className={styles.actionButton}
                onClick={() => handleRepost(post.id)}
            >
              <FaShare className={styles.actionIcon} />
                <span className={styles.actionText}>Repost</span>
              </button>
                      <button 
                className={`${styles.actionButton} ${post.isSaved ? styles.saved : ''}`}
                onClick={() => handleSave(post.id)}
                      >
                <FaBookmark className={styles.actionIcon} />
                <span className={styles.actionText}>{post.isSaved ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>

            {/* Comments Section */}
            {expandedComments.has(post.id) && (
              <div className={styles.commentsSection}>
                <div className={styles.commentInput}>
                  <div className={styles.commentAvatar}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className={styles.commentInputContainer}>
                    <input
                      type="text"
                  placeholder="Write a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      className={styles.commentInputField}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                    />
                    <div className={styles.commentActions}>
                      <button className={styles.commentActionButton}>
                        <FaImages />
                      </button>
                      <button className={styles.commentActionButton}>
                        <FaSmile />
                      </button>
                <button 
                        className={styles.commentSubmitButton}
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                      >
                        <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
      </div>
            )}
            </div>
        ))}
        </div>

      {/* Right Sidebar */}
      <div className={styles.rightSidebar}>
        {/* Trending News Card */}
        <div className={styles.sidebarCard}>
          <div className={styles.sidebarTitle}>
            <h3>Trending News</h3>
            <button className={styles.infoIcon}>
              <FaInfo />
            </button>
          </div>
          <div className={styles.newsList}>
            {trendingNews.map((news) => (
              <div key={news.id} className={styles.newsItem}>
                <div className={styles.newsBullet}>{news.id}</div>
                <div className={styles.newsContent}>
                  <h4 className={styles.newsTitle}>{news.title}</h4>
                  <p className={styles.newsTime}>{news.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* People You Know Card */}
        <div className={styles.sidebarCard}>
          <div className={styles.sidebarTitle}>
            <h3>People You May Know</h3>
            <button className={styles.infoIcon}>
              <FaInfo />
            </button>
          </div>
          <div className={styles.peopleList}>
            {peopleYouMayKnow.map((person) => (
              <div key={person.id} className={styles.personItem}>
                <div className={styles.personAvatar}>{person.avatar}</div>
                <div className={styles.personInfo}>
                  <h4 className={styles.personName}>{person.name}</h4>
                  <p className={styles.personTitle}>{person.title}</p>
                  <p className={styles.mutualConnections}>{person.mutual} mutual connections</p>
                </div>
                <button className={styles.connectButton}>Connect</button>
              </div>
            ))}
          </div>
          <div className={styles.viewAllSuggestions}>View all suggestions</div>
        </div>
      </div>

      {/* Repost Modal */}
      {showRepostModal && (
        <div className={styles.modalOverlay} onClick={() => setShowRepostModal(null)}>
          <div className={styles.repostModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.repostModalHeader}>
              <h3>Repost to your network</h3>
              <button onClick={() => setShowRepostModal(null)}>×</button>
                    </div>
            <div className={styles.repostModalBody}>
                      <textarea
                placeholder="Add your thoughts..."
                value={repostComment}
                onChange={(e) => setRepostComment(e.target.value)}
                className={styles.repostTextarea}
              />
                    </div>
            <div className={styles.repostModalFooter}>
                <button 
                className={styles.repostSubmitButton}
                onClick={() => handleRepostSubmit(showRepostModal)}
                >
                Repost
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Analytics Popup */}
      <AnalyticsPopup 
        isOpen={showAnalyticsPopup}
        onClose={handleCloseAnalytics}
        jobStats={jobStats}
      />
    </div>
  );
};

export default Post;