import React, { useState } from 'react';
import styles from './Css/NewsArticle.module.css';

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
  };
  onBack: () => void;
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article, onBack }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: {
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        title: "Senior Software Engineer at TCS"
      },
      content: "This trend is concerning. While companies are expanding headcount, the drop in median salaries suggests they're prioritizing cost reduction over talent retention. This could impact long-term innovation and employee satisfaction.",
      timestamp: "2h ago",
      likes: 24,
      isLiked: false,
      replies: [
        {
          id: 11,
          user: {
            name: "Priya Sharma",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b6c00e87?w=40&h=40&fit=crop&crop=face",
            title: "HR Manager at Infosys"
          },
          content: "You're right about the talent retention concern. However, this strategy might be necessary for companies to remain competitive in the global market while maintaining profitability.",
          timestamp: "1h ago",
          likes: 8,
          isLiked: true,
          replies: []
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Amit Patel",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        title: "Product Manager at Wipro"
      },
      content: "The hiring of more freshers at lower salaries is a double-edged sword. While it helps companies cut costs, it also means investing more in training and development. The real challenge is maintaining quality while scaling.",
      timestamp: "3h ago",
      likes: 31,
      isLiked: true,
      replies: []
    },
    {
      id: 3,
      user: {
        name: "Sneha Reddy",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        title: "Data Analyst at Tech Mahindra"
      },
      content: "As someone working in TechM, I can confirm that the focus has shifted towards automation and AI-driven processes. This naturally reduces the demand for mid-level roles, explaining the salary trends mentioned in the article.",
      timestamp: "4h ago",
      likes: 18,
      isLiked: false,
      replies: []
    },
    {
      id: 4,
      user: {
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        title: "Startup Founder"
      },
      content: "This presents an opportunity for startups to attract experienced talent who might be looking for better compensation and growth prospects. The IT services model is evolving, and adaptation is key.",
      timestamp: "5h ago",
      likes: 42,
      isLiked: false,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const relatedArticles = [
    {
      title: "IT jobs FY24 review: Headcount crashes by 63,759 in TCS, Infosys, and Wipro",
      publication: "Livemint",
      timeAgo: "1y ago",
      description: "India's top IT companies have reported a decrease in their total employee headcount for the fiscal year 2023-24."
    },
    {
      title: "Wage costs in IT giants inch up in Q4",
      publication: "Livemint", 
      timeAgo: "1y ago",
      description: "TCS, Infosys, and Wipro have seen an increase in employee wage costs as a percentage of revenue."
    },
    {
      title: "Startup Salaries Soar as CTOs Earn 27x More Than Entry-Level Employees",
      publication: "OutlookIndia",
      timeAgo: "3m ago", 
      description: "India's startup ecosystem emphasizes technology leadership, with CTOs earning the highest among C-suite roles."
    }
  ];

  const handleLikeComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prev => prev.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId 
              ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
              : reply
          )
        };
      } else if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const comment: Comment = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        title: "Professional"
      },
      content: newComment,
      timestamp: "now",
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleAddReply = (parentId: number) => {
    if (replyContent.trim() === '') return;

    const reply: Comment = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        title: "Professional"
      },
      content: replyContent,
      timestamp: "now",
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments(prev => prev.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    setReplyContent('');
    setReplyingTo(null);
  };

  const getTotalComments = () => {
    return comments.reduce((total, comment) => total + 1 + comment.replies.length, 0);
  };

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
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" alt="Your avatar" />
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
                disabled={newComment.trim() === ''}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.userInfo}>
                  <img src={comment.user.avatar} alt={comment.user.name} className={styles.commentAvatar} />
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
              
              <div className={styles.commentFooter}>
                <button 
                  className={`${styles.likeButton} ${comment.isLiked ? styles.liked : ''}`}
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 8.5C1.5 6.5 2.5 5.5 4 5.5C4.8 5.5 5.5 6 6 6.5C6.5 6 7.2 5.5 8 5.5C9.5 5.5 10.5 6.5 10.5 8.5C10.5 10.5 6 14 6 14S1.5 10.5 1.5 8.5Z" stroke="currentColor" strokeWidth="1.5" fill={comment.isLiked ? "currentColor" : "none"}/>
                  </svg>
                  <span>{comment.likes}</span>
                </button>
                
                <button 
                  className={styles.replyButton}
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H2C1.5 2 1 2.5 1 3V11C1 11.5 1.5 12 2 12H3V14L6 12H14C14.5 12 15 11.5 15 11V3C15 2.5 14.5 2 14 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  Reply
                </button>
              </div>

              {/* Reply Input */}
              {replyingTo === comment.id && (
                <div className={styles.replyInputSection}>
                  <div className={styles.replyInputContainer}>
                    <textarea
                      className={styles.replyInput}
                      placeholder={`Reply to ${comment.user.name}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={2}
                    />
                    <div className={styles.replyActions}>
                      <button 
                        className={styles.cancelReplyButton}
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        className={styles.postReplyButton}
                        onClick={() => handleAddReply(comment.id)}
                        disabled={replyContent.trim() === ''}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className={styles.repliesSection}>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className={styles.replyItem}>
                      <div className={styles.commentHeader}>
                        <div className={styles.userInfo}>
                          <img src={reply.user.avatar} alt={reply.user.name} className={styles.commentAvatar} />
                          <div className={styles.userDetails}>
                            <h4 className={styles.userName}>{reply.user.name}</h4>
                            <p className={styles.userTitle}>{reply.user.title}</p>
                          </div>
                        </div>
                        <span className={styles.commentTimestamp}>{reply.timestamp}</span>
                      </div>
                      
                      <div className={styles.commentContent}>
                        <p>{reply.content}</p>
                      </div>
                      
                      <div className={styles.commentFooter}>
                        <button 
                          className={`${styles.likeButton} ${reply.isLiked ? styles.liked : ''}`}
                          onClick={() => handleLikeComment(reply.id, true, comment.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 8.5C1.5 6.5 2.5 5.5 4 5.5C4.8 5.5 5.5 6 6 6.5C6.5 6 7.2 5.5 8 5.5C9.5 5.5 10.5 6.5 10.5 8.5C10.5 10.5 6 14 6 14S1.5 10.5 1.5 8.5Z" stroke="currentColor" strokeWidth="1.5" fill={reply.isLiked ? "currentColor" : "none"}/>
                          </svg>
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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