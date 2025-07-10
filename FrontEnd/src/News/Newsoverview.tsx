import React, { useState } from 'react';
import styles from './Css/Newsoverview.module.css';
import NewsCard from './NewsCard';
import { useNews, useAuth } from '../hooks/useApi';
import { apiService } from '../api';

interface NewsoverviewProps {
  showCenterContent?: boolean;
  onSearch?: (searchTerm: string) => void;
  onCategorySelect?: (category: string) => void;
  onFiltersApply?: (filters: any) => void;
}

const Newsoverview: React.FC<NewsoverviewProps> = ({ 
  showCenterContent = true, 
  onSearch, 
  onCategorySelect,
  onFiltersApply 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('today');
  const [searchInput, setSearchInput] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedReadingTimes, setSelectedReadingTimes] = useState<string[]>([]);
  const [showToast, setShowToast] = useState('');
  const [readingListCounts, setReadingListCounts] = useState({
    saved: 12,
    readLater: 8,
    history: 45
  });
  const { news, loading, error, refetch, postNews, likeNews, commentNews } = useNews();
  const { user } = useAuth();
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'technology', label: 'Technology', count: 41 },
    { id: 'business', label: 'Business', count: 12 },
    { id: 'career', label: 'Career', count: 8 },
    { id: 'industry', label: 'Industry Updates', count: 32 }
  ];

  const timeFilters = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' }
  ];

  const sourceTypes = [
    { id: 'news', label: 'News Publication' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'company', label: 'Company Updates' },
    { id: 'research', label: 'Research Papers' }
  ];

  const contentFormats = [
    { id: 'articles', label: 'Articles' },
    { id: 'videos', label: 'Videos' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'infographics', label: 'Infographics' }
  ];

  const readingTimes = [
    { id: 'under5', label: 'Under 5 minutes' },
    { id: '5to10', label: '5-10 minutes' },
    { id: '10to20', label: '10-20 minutes' },
    { id: 'over20', label: 'Over 20 minutes' }
  ];

  // Toast functionality
  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(''), 3000);
  };

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
    }
    if (searchInput.trim()) {
      showToastMessage(`Searching for "${searchInput}"`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    if (onSearch) {
      onSearch('');
    }
    showToastMessage('Search cleared');
  };

  // Category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    const category = categories.find(cat => cat.id === categoryId);
    showToastMessage(`Filtering by ${category?.label || 'All'}`);
  };

  // Filter handling
  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleReadingTimeToggle = (timeId: string) => {
    setSelectedReadingTimes(prev => 
      prev.includes(timeId) 
        ? prev.filter(id => id !== timeId)
        : [...prev, timeId]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory,
      timeFilter: selectedTimeFilter,
      sources: selectedSources,
      formats: selectedFormats,
      readingTimes: selectedReadingTimes
    };
    
    if (onFiltersApply) {
      onFiltersApply(filters);
    }
    
    const activeFiltersCount = selectedSources.length + selectedFormats.length + selectedReadingTimes.length;
    showToastMessage(`Applied ${activeFiltersCount} filters`);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTimeFilter('today');
    setSelectedSources([]);
    setSelectedFormats([]);
    setSelectedReadingTimes([]);
    showToastMessage('All filters cleared');
  };

  // Reading list actions
  const handleReadingListAction = (action: string) => {
    switch (action) {
      case 'saved':
        showToastMessage('Opening saved articles');
        break;
      case 'readLater':
        showToastMessage('Opening read later list');
        break;
      case 'history':
        showToastMessage('Opening reading history');
        break;
      default:
        showToastMessage('Feature coming soon!');
    }
  };

  // Featured story actions
  const handleFeaturedStoryAction = (action: string) => {
    switch (action) {
      case 'save':
        setReadingListCounts(prev => ({ ...prev, saved: prev.saved + 1 }));
        showToastMessage('Article saved to reading list');
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'AI Revolution in Workplace',
            text: 'How Machine Learning is Transforming Business Operations',
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          showToastMessage('Article link copied to clipboard');
        }
        break;
      case 'read':
        showToastMessage('Opening full article');
        break;
    }
  };

  // Handle create news
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    if (!newsContent.trim() || !newsImage) {
      setCreateError('All fields are required.');
      return;
    }
    setCreateLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', newsContent);
      if (user) {
        formData.append('firstName', user.firstName || '');
        formData.append('lastName', user.lastName || '');
        formData.append('userPhoto', user.profilePhoto || '');
        formData.append('userId', user._id || '');
      }
      formData.append('file', newsImage);
      await postNews(formData);
      setNewsContent('');
      setNewsImage(null);
      refetch();
      showToastMessage('News posted!');
    } catch (err: any) {
      setCreateError(err.message || 'Failed to post news');
    } finally {
      setCreateLoading(false);
    }
  };

  // Like handler
  const handleLikeNews = async (newsId: string) => {
    if (!user) return;
    try {
      await likeNews(newsId, user._id);
      refetch();
    } catch (err) {
      showToastMessage('Failed to like news');
    }
  };

  // Comment handler
  const handleCommentNews = async (newsId: string, comment: string) => {
    if (!user) return;
    try {
      await commentNews(newsId, user._id, comment, `${user.firstName} ${user.lastName}`);
      refetch();
    } catch (err) {
      showToastMessage('Failed to comment');
    }
  };

  return (
    <div className={styles.newsContainer}>
      {/* Toast Messages */}
      {showToast && (
        <div className={styles.toast}>
          {showToast}
        </div>
      )}

      {/* Create News Form */}
      <section className={styles.createNewsSection}>
        <h2>Create News</h2>
        <form onSubmit={handleCreateNews} className={styles.createNewsForm}>
          <textarea
            placeholder="What's the news?"
            value={newsContent}
            onChange={e => setNewsContent(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setNewsImage(e.target.files?.[0] || null)}
            required
          />
          <button type="submit" disabled={createLoading}>
            {createLoading ? 'Posting...' : 'Post News'}
          </button>
          {createError && <div className={styles.error}>{createError}</div>}
        </form>
      </section>

      {/* Real News List */}
      <section className={styles.newsListSection}>
        <h2>Latest News</h2>
        {loading && <div>Loading news...</div>}
        {error && <div className={styles.error}>Error: {error}</div>}
        {news && news.length > 0 ? (
          <ul className={styles.newsList}>
            {news.map((item) => (
              <li key={item._id} className={styles.newsItem}>
                <NewsCard
                  // Pass real data and handlers
                  category={{ name: 'News', color: 'technology' }}
                  publication={item.author?.firstName + ' ' + item.author?.lastName}
                  date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                  title={item.content}
                  description={item.content}
                  imageUrl={item.newsPhoto || ''}
                  cardIndex={0}
                  initialLikes={item.likes}
                  initialComments={item.comments?.length || 0}
                  onClick={() => {}}
                  // Real like/comment handlers
                  onLike={() => handleLikeNews(item._id)}
                  onComment={(comment) => handleCommentNews(item._id, comment)}
                />
              </li>
            ))}
          </ul>
        ) : !loading && <div>No news found.</div>}
      </section>

      {/* News Categories Section */}
      <div className={styles.newsCategories}>
        <h2 className={styles.categoriesTitle}>News Categories</h2>
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={`${styles.categoryItem} ${selectedCategory === category.id ? styles.categoryActive : ''}`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className={styles.categoryLeft}>
              <div className={styles.categoryIcon}></div>
              <span className={styles.categoryLabel}>{category.label}</span>
            </div>
            <div className={styles.categoryCount}>
              <span>{category.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search Section */}
      {showCenterContent && (
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchBox}>
            <div className={styles.searchIcon}></div>
            <input 
              type="text" 
              placeholder="Search for news topics, articles or sources..."
              className={styles.searchInput}
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
            {searchInput && (
              <button 
                type="button" 
                className={styles.clearButton}
                onClick={handleClearSearch}
              >
                ×
              </button>
            )}
          </form>
        </div>
      )}

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersHeader}>
          <h2 className={styles.filtersTitle}>Filters</h2>
          <button 
            className={styles.clearFiltersButton}
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>
        
        {/* Date Range */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterGroupTitle}>Date Range</h3>
          <div className={styles.timeFilters}>
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                className={`${styles.timeFilter} ${selectedTimeFilter === filter.id ? styles.active : ''}`}
                onClick={() => setSelectedTimeFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Source Type */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterGroupTitle}>Source Type</h3>
          {sourceTypes.map((source) => (
            <div key={source.id} className={styles.checkboxItem}>
              <input 
                type="checkbox" 
                id={source.id} 
                className={styles.checkbox}
                checked={selectedSources.includes(source.id)}
                onChange={() => handleSourceToggle(source.id)}
              />
              <label htmlFor={source.id} className={styles.checkboxLabel}>
                {source.label}
              </label>
            </div>
          ))}
        </div>

        {/* Content Format */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterGroupTitle}>Content Format</h3>
          {contentFormats.map((format) => (
            <div key={format.id} className={styles.checkboxItem}>
              <input 
                type="checkbox" 
                id={format.id} 
                className={styles.checkbox}
                checked={selectedFormats.includes(format.id)}
                onChange={() => handleFormatToggle(format.id)}
              />
              <label htmlFor={format.id} className={styles.checkboxLabel}>
                {format.label}
              </label>
            </div>
          ))}
        </div>

        {/* Reading Time */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterGroupTitle}>Reading Time</h3>
          {readingTimes.map((time) => (
            <div key={time.id} className={styles.checkboxItem}>
              <input 
                type="checkbox" 
                id={time.id} 
                className={styles.checkbox}
                checked={selectedReadingTimes.includes(time.id)}
                onChange={() => handleReadingTimeToggle(time.id)}
              />
              <label htmlFor={time.id} className={styles.checkboxLabel}>
                {time.label}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.filterActions}>
          <button 
            className={styles.applyFiltersButton}
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <div className={styles.activeFiltersCount}>
            {selectedSources.length + selectedFormats.length + selectedReadingTimes.length} filters active
          </div>
        </div>
      </div>

      {/* Featured Story Section */}
      {showCenterContent && (
        <div className={styles.featuredStory}>
          <h2 className={styles.featuredTitle}>Featured Story</h2>
          <div className={styles.storyCard}>
            <div className={styles.storyImage}>
              <div className={styles.imageOverlay}>
                <div className={styles.storyDetails}>
                  <div className={styles.storyHeader}>
                    <span className={styles.featuredBadge}>Featured</span>
                    <span className={styles.storyMeta}>Tech Innovations•May 1, 2025</span>
                  </div>
                  <h3 className={styles.storyHeadline}>
                    AI Revolution in Workplace: How Machine Learning is Transforming Business Operations
                  </h3>
                </div>
                <div className={styles.storyActions}>
                  <button 
                    className={styles.saveIcon}
                    onClick={() => handleFeaturedStoryAction('save')}
                    title="Save article"
                  >
                    <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.36377 20.3304V2.85355C0.36377 2.25278 0.57786 1.73867 1.00604 1.31122C1.43422 0.883764 1.94833 0.669674 2.54837 0.668945H13.4714C14.0721 0.668945 14.5866 0.883036 15.0148 1.31122C15.443 1.7394 15.6567 2.25351 15.656 2.85355V20.3304L8.00987 17.0535L0.36377 20.3304ZM2.54837 16.9988L8.00987 14.6504L13.4714 16.9988V2.85355H2.54837V16.9988Z" fill="white"/>
                    </svg>
                  </button>
                  <button 
                    className={styles.shareIcon}
                    onClick={() => handleFeaturedStoryAction('share')}
                    title="Share article"
                  >
                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.6687 6.0749L9.7217 0.12793V3.5262C3.77473 4.37577 1.22603 8.6236 0.376465 12.8714C2.50038 9.89795 5.47387 8.53864 9.7217 8.53864V12.0219L15.6687 6.0749Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <p className={styles.storyDescription}>
            Artificial intelligence is reshaping how companies operate, from automating routine tasks to providing deep insights through data analysis. Learn how leading organizations are implementing AI strategies.
          </p>
          
          <div className={styles.storyStats}>8 min read•4,328 views•872 shares</div>
          
          <div className={styles.storyTags}>
            <span className={styles.tag}>Artificial Intelligence</span>
            <span className={styles.tag}>Business</span>
            <span className={styles.tag}>Technology</span>
            <span className={styles.tag}>Future of Work</span>
          </div>
          
          <button 
            className={styles.readMoreLink}
            onClick={() => handleFeaturedStoryAction('read')}
          >
            <span>Read full article</span>
            <div className={styles.arrowIcon}></div>
          </button>
        </div>
      )}

      {/* For You Section */}
      <div className={styles.forYouSection}>
        <h2 className={styles.forYouTitle}>For You</h2>
        
        <div 
          className={styles.recommendationItem}
          onClick={() => showToastMessage('Opening: Data Privacy Regulations article')}
        >
          <div className={styles.interestBadge}>Based on your Interest</div>
          <h4 className={styles.recommendationTitle}>
            Data Privacy Regulations: What to Expect in 2026
          </h4>
          <div className={styles.recommendationMeta}>Legal Tech Today•7 min read</div>
        </div>
        
        <div 
          className={styles.recommendationItem}
          onClick={() => showToastMessage('Opening: Leadership Skills article')}
        >
          <div className={styles.trendingBadge}>Trending in your network</div>
          <h4 className={styles.recommendationTitle}>
            Leadership Skills for Managing Remote Teams Effectively
          </h4>
          <div className={styles.recommendationMeta}>Management Quarterly •5 min read</div>
        </div>
        
        <div 
          className={styles.recommendationItem}
          onClick={() => showToastMessage('Opening: Cloud Computing article')}
        >
          <div className={styles.similarBadge}>Similar to what you've read</div>
          <h4 className={styles.recommendationTitle}>
            The Future of Cloud Computing: Edge Technologies on the Rise
          </h4>
          <div className={styles.recommendationMeta}>Tech Insider•6 min read</div>
        </div>
      </div>

      {/* Reading List Section */}
      <div className={styles.readingListSection}>
        <div className={styles.readingListHeader}>
          <h2 className={styles.readingListTitle}>Your Reading List</h2>
          <button 
            className={styles.viewAllLink}
            onClick={() => showToastMessage('Opening complete reading list')}
          >
            View All
          </button>
        </div>
        
        <div 
          className={styles.readingListItem}
          onClick={() => handleReadingListAction('saved')}
        >
          <div className={styles.listItemContent}>
            <h4 className={styles.listItemTitle}>Saved Articles</h4>
            <span className={styles.listItemCount}>{readingListCounts.saved} articles</span>
          </div>
          <div className={styles.listItemArrow}></div>
        </div>
        
        <div 
          className={styles.readingListItem}
          onClick={() => handleReadingListAction('readLater')}
        >
          <div className={styles.listItemContent}>
            <h4 className={styles.listItemTitle}>Read Later</h4>
            <span className={styles.listItemCount}>{readingListCounts.readLater} articles</span>
          </div>
          <div className={styles.listItemArrow}></div>
        </div>
        
        <div 
          className={styles.readingListItem}
          onClick={() => handleReadingListAction('history')}
        >
          <div className={styles.listItemContent}>
            <h4 className={styles.listItemTitle}>Reading History</h4>
            <span className={styles.listItemCount}>{readingListCounts.history} articles read</span>
          </div>
          <div className={styles.listItemArrow}></div>
        </div>
      </div>
    </div>
  );
};

export default Newsoverview;
