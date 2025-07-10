import React, { useState, useEffect, useCallback } from 'react';
import { useFeeds, useAuth } from '../hooks/useApi';
import PostCreation from './PostCreation';
import AnalyticsPopup from './AnalyticsPopup';
import styles from './Css/Post.module.css';
import {
  FaThumbsUp, FaComment, FaShare, FaEllipsisH, FaBookmark, FaGlobeAmericas,
  FaUserFriends, FaLock, FaBriefcase, FaChartLine, FaCalendarAlt, FaTasks,
  FaUsers, FaFileAlt, FaHeart, FaEye, FaHandshake, FaPaperPlane, FaImages,
  FaSmile, FaInfo
} from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

const trendingNews = [
  { id: 1, title: "AI job market grows 200% in Q2", time: "1h ago" },
  { id: 2, title: "Tech salaries hit record highs despite market shifts", time: "3h ago" },
  { id: 3, title: "Remote work becoming permanent at major tech firms", time: "5h ago" },
  { id: 4, title: "New framework simplifies web development", time: "1d ago" },
  { id: 5, title: "Cybersecurity threats increase by 40%", time: "2d ago" }
];

const peopleYouMayKnow = [
  { id: 1, avatar: "JD", name: "Jennifer Davis", title: "Product Manager at Amazon", mutual: 12 },
  { id: 2, avatar: "RK", name: "Robert Kim", title: "Senior Developer at Microsoft", mutual: 8 },
  { id: 3, avatar: "MP", name: "Michelle Park", title: "UX Designer at Adobe", mutual: 5 },
  { id: 4, avatar: "TS", name: "Thomas Smith", title: "Data Scientist at Tesla", mutual: 3 }
];

interface JobStats {
  applied: number;
  saved: number;
  viewed: number;
  interviews: number;
}

interface PostProps {
  onNavigate: (page: string) => void;
}

const Post: React.FC<PostProps> = ({ onNavigate }) => {
  const { feeds, loading, error, postFeed, likeFeed, commentFeed, refetch } = useFeeds();
  const { user } = useAuth();
  const [jobStats] = useState<JobStats>({ applied: 12, saved: 8, viewed: 45, interviews: 3 });
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showRepostModal, setShowRepostModal] = useState<string | null>(null);
  const [repostComment, setRepostComment] = useState('');
  const [showAnalyticsPopup, setShowAnalyticsPopup] = useState<boolean>(false);
  // const navigate = useNavigate();

  // Logging for debugging
  useEffect(() => {
    if (feeds) console.log('[Feeds] Loaded:', feeds);
    if (error) console.error('[Feeds] Error:', error);
  }, [feeds, error]);

  // Defensive check for user
  if (!user) {
    console.error('[Home/Post] No user found in auth state.');
  }

  // Handle new post creation
  const handleNewPost = useCallback(async (formData: FormData) => {
    try {
      await postFeed(formData);
      refetch();
      console.log('[Feeds] Post created');
    } catch (err) {
      console.error('[Feeds] Post creation failed:', err);
      alert('Failed to create post');
    }
  }, [postFeed, refetch]);

  // Handle like
  const handleLike = useCallback(async (feedId: string) => {
    if (!user) return;
    try {
      await likeFeed(feedId, user._id);
      refetch();
      console.log('[Feeds] Liked feed:', feedId);
    } catch (err) {
      console.error('[Feeds] Like failed:', err);
      alert('Failed to like post');
    }
  }, [likeFeed, user, refetch]);

  // Handle comment
  const handleCommentSubmit = useCallback(async (feedId: string) => {
    if (!user) return;
    const comment = commentInputs[feedId]?.trim();
    if (!comment) return;
    try {
      await commentFeed(feedId, user._id, comment, `${user.firstName} ${user.lastName}`);
      setCommentInputs(prev => ({ ...prev, [feedId]: '' }));
      refetch();
      console.log('[Feeds] Commented on feed:', feedId);
    } catch (err) {
      console.error('[Feeds] Comment failed:', err);
      alert('Failed to comment');
    }
  }, [commentFeed, user, commentInputs, refetch]);

  const handleCommentToggle = (feedId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(feedId)) newSet.delete(feedId);
      else newSet.add(feedId);
      return newSet;
    });
  };

  const handleSave = (feedId: string) => {
    // Implement save logic if backend supports it
    alert('Save feature coming soon!');
  };

  const handleRepost = (feedId: string) => setShowRepostModal(feedId);
  const handleRepostSubmit = (feedId: string) => {
    setShowRepostModal(null);
    setRepostComment('');
    alert('Repost feature coming soon!');
  };

  const handleViewAnalytics = () => setShowAnalyticsPopup(true);
  const handleCloseAnalytics = () => setShowAnalyticsPopup(false);

  const getVisibilityIcon = (visibility: string = 'public') => {
    switch (visibility) {
      case 'public': return <FaGlobeAmericas className={styles.visibilityIcon} />;
      case 'connections': return <FaUserFriends className={styles.visibilityIcon} />;
      case 'private': return <FaLock className={styles.visibilityIcon} />;
      default: return <FaGlobeAmericas className={styles.visibilityIcon} />;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error loading posts: {error}</div>
        <button onClick={refetch} className={styles.retryButton}>Retry</button>
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
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" className={styles.avatarImg} />
              ) : (
                user?.firstName?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <h3 className={styles.profileName}>{user ? `${user.firstName || 'User'} ${user.lastName || ''}` : 'John Smith'}</h3>
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
          <div className={styles.quickAccessItem} onClick={() => onNavigate('Community')}><FaUsers /> Your community</div>
          <div className={styles.quickAccessItem} onClick={() => onNavigate('Events')}><FaCalendarAlt /> Event</div>
          <div className={styles.quickAccessItem}><FaFileAlt /> Your Courses</div>
          <div className={styles.quickAccessItem} onClick={() => onNavigate('Friends')}><FaUserFriends /> Your Friend</div>
          <div className={styles.quickAccessItem} onClick={() => onNavigate('Following')}><FaHeart /> Following</div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <PostCreation onPostCreated={handleNewPost} />
        {/* Posts Feed */}
        {feeds && feeds.length > 0 ? feeds.map((feed) => (
          <div key={feed._id} className={styles.postCard}>
            {/* Post Header */}
            <div className={styles.postHeader}>
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>
                  {feed.author?.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className={styles.authorDetails}>
                  <h4 className={styles.authorName}>{feed.author?.firstName} {feed.author?.lastName}</h4>
                  {/* feed.author.title is not present in Feed interface, so we use a fallback or remove */}
                  {/* <p className={styles.authorTitle}>{feed.author?.title || ''}</p> */}
                  <div className={styles.postMeta}>
                    <span className={styles.postTime}>{feed.createdAt ? new Date(feed.createdAt).toLocaleString() : ''}</span>
                    {/* <span className={styles.separator}>•</span> */}
                    {/* feed.visibility is not present in Feed interface, so we remove the icon */}
                    {/* {getVisibilityIcon(feed.visibility)} */}
                  </div>
                </div>
              </div>
              <button className={styles.moreButton}><FaEllipsisH /></button>
            </div>
            {/* Post Content */}
            <div className={styles.postContent}>
              <p className={styles.postText}>{feed.content}</p>
              {feed.image && (
                <div className={styles.postImageContainer}>
                  <img
                    src={feed.image}
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
                <span className={styles.likesCount}>{feed.likes?.toLocaleString() || 0}</span>
              </div>
              <div className={styles.statsRight}>
                <span className={styles.commentCount} onClick={() => handleCommentToggle(feed._id)}>
                  {feed.comments?.length || 0} comments
                </span>
                {/* feed.shares is not present in Feed interface, so we remove or default to 0 */}
                {/* <span className={styles.shareCount}>{feed.shares || 0} reposts</span> */}
              </div>
            </div>
            {/* Post Actions */}
            <div className={styles.postActions}>
              <button className={styles.actionButton} onClick={() => handleLike(feed._id)}>
                <FaThumbsUp className={styles.actionIcon} />
                <span className={styles.actionText}>Like</span>
              </button>
              <button className={styles.actionButton} onClick={() => handleCommentToggle(feed._id)}>
                <FaComment className={styles.actionIcon} />
                <span className={styles.actionText}>Comment</span>
              </button>
              <button className={styles.actionButton} onClick={() => handleRepost(feed._id)}>
                <FaShare className={styles.actionIcon} />
                <span className={styles.actionText}>Repost</span>
              </button>
              <button className={styles.actionButton} onClick={() => handleSave(feed._id)}>
                <FaBookmark className={styles.actionIcon} />
                <span className={styles.actionText}>Save</span>
              </button>
            </div>
            {/* Comments Section */}
            {expandedComments.has(feed._id) && (
              <div className={styles.commentsSection}>
                <div className={styles.commentInput}>
                  <div className={styles.commentAvatar}>
                    {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className={styles.commentInputContainer}>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[feed._id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [feed._id]: e.target.value }))}
                      className={styles.commentInputField}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(feed._id)}
                    />
                    <div className={styles.commentActions}>
                      <button className={styles.commentActionButton}><FaImages /></button>
                      <button className={styles.commentActionButton}><FaSmile /></button>
                      <button
                        className={styles.commentSubmitButton}
                        onClick={() => handleCommentSubmit(feed._id)}
                        disabled={!commentInputs[feed._id]?.trim()}
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Render comments */}
                <div className={styles.commentsList}>
                  {feed.comments && feed.comments.length > 0 ? feed.comments.map((c: any, idx: number) => (
                    <div key={idx} className={styles.commentItem}>
                      <div className={styles.commentAvatar}>{c.userName?.charAt(0).toUpperCase() || 'U'}</div>
                      <div className={styles.commentContent}>
                        <span className={styles.commentAuthor}>{c.userName}</span>
                        <span className={styles.commentText}>{c.comment}</span>
                        <span className={styles.commentTime}>{c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}</span>
                      </div>
                    </div>
                  )) : <div className={styles.noComments}>No comments yet.</div>}
                </div>
              </div>
            )}
          </div>
        )) : <div>No posts found.</div>}
      </div>

      {/* Right Sidebar */}
      <div className={styles.rightSidebar}>
        {/* Trending News Card */}
        <div className={styles.sidebarCard}>
          <div className={styles.sidebarTitle}>
            <h3>Trending News</h3>
            <button className={styles.infoIcon}><FaInfo /></button>
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
            <button className={styles.infoIcon}><FaInfo /></button>
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
                <button className={styles.connectButton}>Friend +</button>
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