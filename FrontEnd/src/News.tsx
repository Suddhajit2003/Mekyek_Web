import React, { useState, useEffect, useMemo } from 'react';
import Newsoverview from './News/Newsoverview';
import NewsCard from './News/NewsCard';
import NewsArticle from './News/NewsArticle';
import styles from './Css/News.module.css';
import { useNews, useAuth } from './hooks/useApi';

// Utility to map backend category to allowed color
function getCategoryColor(category: string | undefined): 'business' | 'technology' | 'career' {
  if (!category) return 'business';
  const cat = category.toLowerCase();
  if (cat.includes('tech')) return 'technology';
  if (cat.includes('career')) return 'career';
  return 'business';
}

const News: React.FC = () => {
  const { news, loading, error, refetch, likeNews, commentNews, getNewsComments } = useNews();
  const { user } = useAuth();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [isViewingArticle, setIsViewingArticle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [commentsCache, setCommentsCache] = useState<{ [newsId: string]: any[] }>({});
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Filter news based on search term
  useEffect(() => {
    if (!news) {
      setFilteredNews([]);
      return;
    }
    if (searchTerm.trim() === '') {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(n =>
        (n.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (n.author?.firstName + ' ' + n.author?.lastName).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  }, [searchTerm, news]);

  // Initialize filtered news when news loads
  useEffect(() => {
    if (news) setFilteredNews(news);
  }, [news]);

  const handleCardClick = async (article: any) => {
    setSelectedArticle(article);
    setIsViewingArticle(true);
    // Optionally fetch comments for this article
    if (!commentsCache[article._id]) {
      setCommentsLoading(true);
      try {
        const comments = await getNewsComments(article._id);
        setCommentsCache(prev => ({ ...prev, [article._id]: comments }));
      } catch {}
      setCommentsLoading(false);
    }
  };

  const handleBackToNews = () => {
    setIsViewingArticle(false);
    setSelectedArticle(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Map backend news to NewsCard props
  const mapNewsToCardProps = (n: any, idx: number) => ({
    category: {
      name: n.category || 'General',
      color: getCategoryColor(n.category),
    },
    publication: n.author ? `${n.author.firstName} ${n.author.lastName}` : 'Unknown',
    date: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : '',
    title: (n.content || '').slice(0, 40) || 'Untitled',
    description: (n.content || '').slice(0, 100) || '',
    imageUrl: n.newsPhoto || '',
    cardIndex: idx + 1,
    onClick: () => handleCardClick(n),
    sourceUrl: '#',
    initialLikes: n.likes ? Number(n.likes) : 0,
    initialComments: Array.isArray(n.comments) ? n.comments.length : 0,
    initialShares: 0,
    initialSaves: 0,
    onLike: user ? (() => likeNews(n._id, user._id)) : undefined,
    onComment: user ? (async (comment: string) => {
      await commentNews(n._id, user._id, comment, user.firstName + ' ' + user.lastName);
      // Refetch comments for this news
      const comments = await getNewsComments(n._id);
      setCommentsCache(prev => ({ ...prev, [n._id]: comments }));
    }) : undefined
  });

  // Map backend news to NewsArticle props
  const mapNewsToArticleProps = (n: any) => ({
    category: {
      name: n.category || 'General',
      color: getCategoryColor(n.category),
    },
    publication: n.author ? `${n.author.firstName} ${n.author.lastName}` : 'Unknown',
    date: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : '',
    title: (n.content || '').slice(0, 40) || 'Untitled',
    description: (n.content || '').slice(0, 100) || '',
    content: n.content || '',
    imageUrl: n.newsPhoto || '',
    readTime: '5 min read', // Optionally calculate
    views: n.views ? String(n.views) : '0',
    shares: n.shares ? String(n.shares) : '0',
    _id: n._id,
  });

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      background: '#F8F9FA',
      paddingTop: '70px'
    }}>
      <Newsoverview showCenterContent={!isViewingArticle} onSearch={handleSearch} />
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>⚠️</div>
          <h3>Error loading news</h3>
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && isViewingArticle && selectedArticle && (
        <NewsArticle article={mapNewsToArticleProps(selectedArticle)} onBack={handleBackToNews} />
      )}
      {!loading && !error && !isViewingArticle && (
        <>
          <div className={styles.Latest_News}>
            Latest News
            {searchTerm && (
              <span className={styles.searchResults}>
                {filteredNews.length} results for "{searchTerm}"
              </span>
            )}
          </div>
          {filteredNews.length > 0 ? (
            filteredNews.map((n, idx) => (
              <NewsCard key={n._id || idx} {...mapNewsToCardProps(n, idx)} />
            ))
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or browse all articles.</p>
              <button 
                className={styles.clearSearchButton}
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;
