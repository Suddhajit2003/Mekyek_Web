import React, { useState } from 'react';
import styles from './Css/NewsCard.module.css';



interface NewsCardProps {
  category: {
    name: string;
    color: 'business' | 'technology' | 'career';
  };
  publication: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  cardIndex: number;
  onClick?: () => void;
  sourceUrl?: string;
  initialLikes?: number;
  initialComments?: number;
  initialShares?: number;
  initialSaves?: number;
}

const NewsCard: React.FC<NewsCardProps> = ({
  category,
  publication,
  date,
  title,
  description,
  imageUrl,
  cardIndex,
  onClick,
  sourceUrl = '#',
  initialLikes = 0,
  initialComments = 0,
  initialShares = 0,
  initialSaves = 0
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [commentsCount, setCommentsCount] = useState(initialComments);
  const [sharesCount, setSharesCount] = useState(initialShares);
  const [savesCount, setSavesCount] = useState(initialSaves);
  const [showToast, setShowToast] = useState('');
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const reportReasons = [
    "Spam or misleading content",
    "Inappropriate content",
    "Copyright violation", 
    "False information",
    "Harassment or bullying",
    "Other"
  ];

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    showToastMessage(isLiked ? 'Unliked' : 'Liked!');
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToastMessage('Comments feature coming soon!');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href
      }).then(() => {
        setSharesCount(prev => prev + 1);
        showToastMessage('Shared successfully!');
      }).catch(() => {
        handleCopyLink();
      });
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setSharesCount(prev => prev + 1);
      showToastMessage('Link copied to clipboard!');
    }).catch(() => {
      showToastMessage('Failed to copy link');
    });
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRepostModal(true);
  };

  const handleRepostConfirm = (withComment: boolean) => {
    setShowRepostModal(false);
    showToastMessage(withComment ? 'Reposted with comment!' : 'Reposted successfully!');
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const handleReportSubmit = (reason: string) => {
    setShowReportModal(false);
    showToastMessage('Report submitted. Thank you for your feedback.');
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    setSavesCount(prev => isSaved ? prev - 1 : prev + 1);
    showToastMessage(isSaved ? 'Removed from saved' : 'Saved for later!');
  };

  const handleViewSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(sourceUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div 
        className={`${styles.newsCard} ${styles[`card${cardIndex}`]}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {/* Toast Message */}
        {showToast && (
          <div className={styles.toast}>
            {showToast}
          </div>
        )}

        {/* Header Section */}
        <div className={styles.header}>
          <div className={`${styles.categoryTag} ${styles[category.color]}`}>
            <span>{category.name}</span>
          </div>
          <div className={styles.publicationInfo}>
            {publication} • {date}
            <button className={styles.moreOptions} onClick={(e) => { e.stopPropagation(); handleReport(); }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="3" r="1.5" fill="#6E6E6E"/>
                <circle cx="8" cy="8" r="1.5" fill="#6E6E6E"/>
                <circle cx="8" cy="13" r="1.5" fill="#6E6E6E"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <div className={styles.newsImage}>
            <img src={imageUrl} alt={title} />
          </div>
          <div className={styles.textContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
        </div>

        {/* Interaction Section */}
        <div className={styles.interactionSection}>
          <div className={styles.interactions}>
            <div 
              className={`${styles.interactionItem} ${isLiked ? styles.liked : ''}`}
              onClick={handleLike}
            >
              <svg className={styles.likeIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 9.5C2 7.5 3.5 6 5.5 6C6.5 6 7.5 6.5 8 7.5C8.5 6.5 9.5 6 10.5 6C12.5 6 14 7.5 14 9.5C14 12 8 16 8 16S2 12 2 9.5Z" stroke={isLiked ? "#E91E63" : "#003F88"} strokeWidth="2" fill={isLiked ? "#E91E63" : "none"}/>
              </svg>
              <span>{likesCount > 0 ? likesCount : 'Like'}</span>
            </div>
            <div 
              className={styles.interactionItem}
              onClick={handleComment}
            >
              <svg className={styles.commentIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2H2C1.5 2 1 2.5 1 3V12C1 12.5 1.5 13 2 13H4V16L8 13H16C16.5 13 17 12.5 17 12V3C17 2.5 16.5 2 16 2Z" stroke="#003F88" strokeWidth="2" fill="none"/>
              </svg>
              <span>{commentsCount > 0 ? commentsCount : 'Comment'}</span>
            </div>
            <div 
              className={styles.interactionItem}
              onClick={handleShare}
            >
              <svg className={styles.shareIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" rx="2" fill="#003F88"/>
                <path d="M5 13L13 5M13 5H8M13 5V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{sharesCount > 0 ? sharesCount : 'Share'}</span>
            </div>
            <div 
              className={styles.interactionItem}
              onClick={handleRepost}
            >
              <svg className={styles.reportIcon} width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="11" rx="1" fill="#003F88"/>
                <path d="M4 7L7 5L7 6H11V8H7V9L4 7ZM14 4L11 6L11 5H7V3H11V2L14 4Z" fill="white"/>
              </svg>
              <span>Repost</span>
            </div>
            <div 
              className={`${styles.interactionItem} ${isSaved ? styles.saved : ''}`}
              onClick={handleSave}
            >
              <svg className={styles.saveIcon} width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2V21L9 17L16 21V2H2Z" stroke={isSaved ? "#4CAF50" : "#003F88"} strokeWidth="2" fill={isSaved ? "#4CAF50" : "none"}/>
              </svg>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </div>
          </div>
          <div 
            className={styles.viewSource}
            onClick={handleViewSource}
          >
            View Source
          </div>
        </div>


      </div>

      {/* Repost Modal */}
      {showRepostModal && (
        <div className={styles.modalOverlay} onClick={() => setShowRepostModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Repost this article</h3>
              <button onClick={() => setShowRepostModal(false)}>×</button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.repostPreview}>
                <div className={styles.previewCard}>
                  <h4>{title}</h4>
                  <p>{description}</p>
                  <span>{publication}</span>
                </div>
              </div>
              <textarea 
                placeholder="Add your thoughts (optional)..." 
                className={styles.repostComment}
              />
            </div>
            <div className={styles.modalActions}>
              <button 
                className={styles.repostBtn}
                onClick={() => handleRepostConfirm(false)}
              >
                Repost
              </button>
              <button 
                className={styles.repostWithCommentBtn}
                onClick={() => handleRepostConfirm(true)}
              >
                Repost with Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className={styles.modalOverlay} onClick={() => setShowReportModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Report this content</h3>
              <button onClick={() => setShowReportModal(false)}>×</button>
            </div>
            <div className={styles.modalContent}>
              <p>Help us understand what's wrong with this content:</p>
              <div className={styles.reportReasons}>
                {reportReasons.map((reason, index) => (
                  <button 
                    key={index}
                    className={styles.reportReason}
                    onClick={() => handleReportSubmit(reason)}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;
