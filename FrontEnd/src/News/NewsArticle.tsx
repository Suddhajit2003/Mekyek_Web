import React, { useState, useEffect } from 'react';
import styles from './Css/NewsArticle.module.css';
import { useNews, useAuth } from '../hooks/useApi';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
}

interface NewsArticleProps {
  article: {
    category: {
      name: string;
      color: 'business' | 'technology' | 'career';
    };
    publication: string;
    date: string;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    readTime: string;
    views: string;
    shares: string;
    _id?: string;
  };
  onBack: () => void;
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article, onBack }) => {
  const { getNewsComments, commentNews } = useNews();
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const relatedArticles: any[] = [];

  // Fetch comments on mount/article change
  useEffect(() => {
    if (!article._id) return;
    setCommentsLoading(true);
    setCommentsError(null);
    getNewsComments(article._id)
      .then(setComments)
      .catch(e => setCommentsError(e.message || 'Failed to load comments'))
      .finally(() => setCommentsLoading(false));
  }, [article._id]);

  // Post a new comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !user || !article._id) return;
    try {
      await commentNews(article._id, user._id, newComment, user.firstName + ' ' + user.lastName);
      setNewComment('');
      // Refetch comments
      const updated = await getNewsComments(article._id);
      setComments(updated);
    } catch (e: any) {
      setCommentsError(e.message || 'Failed to post comment');
    }
  };

  // UI expects: id, user: {name, avatar, title}, content, timestamp, likes, isLiked, replies
  // Backend: userId, comment, userName, createdAt
  const mapBackendComment = (c: any) => ({
    id: c._id || c.userId || Math.random(),
    user: {
      name: c.userName || 'User',
      avatar: '', // Optionally map from user info if available
      title: '',
    },
    content: c.comment,
    timestamp: new Date(c.createdAt).toLocaleString(),
    likes: 0,
    isLiked: false,
    replies: [], // No replies in backend model
  });

  const mappedComments = Array.isArray(comments) ? comments.map(mapBackendComment) : [];

  const getTotalComments = () => mappedComments.length;

  return (
    <div className={styles.articleContainer}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#003F88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to News
      </button>

      {/* Main Article */}
      <div className={styles.mainArticle}>
        {/* Article Header */}
        <div className={styles.articleHeader}>
          <div className={`${styles.categoryTag} ${styles[article.category.color]}`}>
            {article.category.name}
          </div>
          <div className={styles.articleMeta}>
            <span className={styles.publication}>{article.publication}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.date}>{article.date}</span>
          </div>
        </div>

        {/* Article Title */}
        <h1 className={styles.articleTitle}>{article.title}</h1>

        {/* Article Image */}
        <div className={styles.articleImageContainer}>
          <img src={article.imageUrl} alt={article.title} className={styles.articleImage} />
        </div>

        {/* Article Content */}
        <div className={styles.articleContent}>
          <p className={styles.articleDescription}>{article.description}</p>
          <div className={styles.articleBody}>
            <p>{article.content}</p>
          </div>
        </div>

        {/* Article Stats */}
        <div className={styles.articleStats}>
          <span>{article.readTime}</span>
          <span className={styles.separator}>•</span>
          <span>{article.views} views</span>
          <span className={styles.separator}>•</span>
          <span>{article.shares} shares</span>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button className={styles.viewSourceButton}>View Source</button>
        </div>
      </div>

      {/* Comments Section */}
      <div className={styles.commentsSection}>
        <div className={styles.commentsHeader}>
          <h2 className={styles.commentsTitle}>Comments</h2>
          <span className={styles.commentsCount}>{getTotalComments()}</span>
        </div>

        {/* Add Comment */}
        <div className={styles.addCommentSection}>
          <div className={styles.userAvatar}>
            <img src={user?.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'} alt="Your avatar" />
          </div>
          <div className={styles.commentInputContainer}>
            <textarea
              className={styles.commentInput}
              placeholder="Share your thoughts on this news..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className={styles.commentActions}>
              <button 
                className={styles.postButton}
                onClick={handleAddComment}
                disabled={newComment.trim() === '' || !user}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className={styles.commentsList}>
          {commentsLoading && <div>Loading comments...</div>}
          {commentsError && <div className={styles.error}>{commentsError}</div>}
          {mappedComments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.userInfo}>
                  <img src={comment.user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'} alt={comment.user.name} className={styles.commentAvatar} />
                  <div className={styles.userDetails}>
                    <h4 className={styles.userName}>{comment.user.name}</h4>
                    <p className={styles.userTitle}>{comment.user.title}</p>
                  </div>
                </div>
                <span className={styles.commentTimestamp}>{comment.timestamp}</span>
              </div>
              <div className={styles.commentContent}>
                <p>{comment.content}</p>
              </div>
              {/* No like/reply UI for now, as backend does not support */}
            </div>
          ))}
        </div>
      </div>

      {/* Related News Section */}
      <div className={styles.relatedNews}>
        <h2 className={styles.relatedTitle}>Related News</h2>
        {relatedArticles.map((related, index) => (
          <div key={index} className={styles.relatedItem}>
            <div className={styles.relatedContent}>
              <h3 className={styles.relatedItemTitle}>{related.title}</h3>
              <div className={styles.relatedMeta}>
                <span className={styles.relatedPublication}>{related.publication}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.relatedTime}>{related.timeAgo}</span>
              </div>
              <p className={styles.relatedDescription}>{related.description}</p>
            </div>
            <button className={styles.relatedViewSource}>View Source</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticle; 