import React, { useState } from 'react';
import styles from './Css/ComunityOverview.module.css';
import ComunityCard from './ComunityCard';

interface ComunityOverviewProps {
  category?: {
    name: string;
    color: 'business' | 'technology' | 'career';
  };
  publication?: string;
  date?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  cardIndex?: number;
  onClick?: () => void;
  sourceUrl?: string;
  initialLikes?: number;
  initialComments?: number;
  initialShares?: number;
  initialSaves?: number;
}

const ComunityOverview: React.FC<ComunityOverviewProps> = ({
  category = { name: 'Technology', color: 'technology' },
  publication = 'Tech News',
  date = 'Today',
  title = 'AI Revolution in Workplace: How Machine Learning is Transforming Business',
  description = 'Artificial intelligence is reshaping how companies operate, from automating routine tasks to providing deep insights.',
  imageUrl = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  cardIndex = 1,
  initialLikes = 0,
  initialComments = 0,
  initialShares = 0,
  initialSaves = 0
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedReadingTimes, setSelectedReadingTimes] = useState<string[]>([]);
  const [showToast, setShowToast] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const categories = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'trending', label: 'Trending', count: 41 },
    { id: 'saved', label: 'Saved', count: 12 },
    { id: 'featured', label: 'Featured', count: 8 },
    { id: 'recent', label: 'Recent', count: 32 }
  ];

  const activeMembers = [
    { name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', status: 'online' },
    { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80', status: 'online' },
    { name: 'Mike Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80', status: 'online' },
    { name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2870&q=80', status: 'online' },
    { name: 'David Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80', status: 'online' },
    { name: 'Lisa Garcia', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80', status: 'online' },
    { name: 'Tom Anderson', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80', status: 'online' }
  ];

  const trendingTopics = [
    'Remote Work Trends',
    'AI in recruitment',
    'Career Transitions',
    'Tech Layoffs',
    'Salary Negotiations'
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

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const cat = categories.find(c => c.id === categoryId);
    showToastMessage(`Browsing ${cat?.label || 'All'} content`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToastMessage(`Searching for "${searchQuery}"`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    showToastMessage('Search cleared');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    showToastMessage(isSaved ? 'Removed from saved' : 'Saved for later!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href
      }).then(() => {
        showToastMessage('Shared successfully!');
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToastMessage('Link copied to clipboard!');
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToastMessage('Link copied to clipboard!');
      });
    }
  };

  const handleMemberClick = (memberName: string) => {
    showToastMessage(`Opening ${memberName}'s profile`);
  };

  const handleMemberCountClick = () => {
    showToastMessage('Viewing all active members');
  };

  const handleTopicClick = (topic: string) => {
    showToastMessage(`Exploring ${topic} discussions`);
  };

  // Filter handling functions
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
    const activeFiltersCount = selectedSources.length + selectedFormats.length + selectedReadingTimes.length;
    showToastMessage(`Applied ${activeFiltersCount} filters to community content`);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTimeFilter('today');
    setSelectedSources([]);
    setSelectedFormats([]);
    setSelectedReadingTimes([]);
    showToastMessage('All filters cleared');
  };

  return (
    <div className={styles.newsContainer}>
      {/* Toast Messages */}
      {showToast && (
        <div className={styles.toast}>
          {showToast}
        </div>
      )}

      {/* Categories Section */}
      <div className={styles.newsCategories}>
        <h2 className={styles.categoriesTitle}>Browse</h2>
        {categories.map((cat) => (
          <div 
            key={cat.id}
            className={`${styles.categoryItem} ${selectedCategory === cat.id ? styles.categoryActive : ''}`}
            onClick={() => handleCategorySelect(cat.id)}
          >
            <div className={styles.categoryLeft}>
              <div className={styles.categoryIcon}></div>
              <span className={styles.categoryLabel}>{cat.label}</span>
            </div>
            <div className={styles.categoryCount}>
              <span>{cat.count}</span>
            </div>
          </div>
        ))}
      </div>

             {/* Search Section */}
       <div className={styles.searchSection}>
         <form onSubmit={handleSearch} className={styles.searchBox}>
           <div className={styles.searchIcon}></div>
           <input
             type="text"
             placeholder="Search community content, discussions, and topics..."
             value={searchQuery}
             onChange={handleSearchInputChange}
             className={styles.searchInput}
           />
           <button type="submit" className={styles.searchButton}>
             Search
           </button>
           {searchQuery && (
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
                 id={`source-${source.id}`} 
                 className={styles.checkbox}
                 checked={selectedSources.includes(source.id)}
                 onChange={() => handleSourceToggle(source.id)}
               />
               <label htmlFor={`source-${source.id}`} className={styles.checkboxLabel}>
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
                 id={`format-${format.id}`} 
                 className={styles.checkbox}
                 checked={selectedFormats.includes(format.id)}
                 onChange={() => handleFormatToggle(format.id)}
               />
               <label htmlFor={`format-${format.id}`} className={styles.checkboxLabel}>
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
                 id={`time-${time.id}`} 
                 className={styles.checkbox}
                 checked={selectedReadingTimes.includes(time.id)}
                 onChange={() => handleReadingTimeToggle(time.id)}
               />
               <label htmlFor={`time-${time.id}`} className={styles.checkboxLabel}>
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
       <div className={styles.featuredStory}>
        <h2 className={styles.featuredTitle}>Featured</h2>
        <div className={styles.storyCard}>
          <div className={styles.storyImage}>
            <img src={imageUrl} alt={title} />
            <div className={styles.imageOverlay}></div>
          </div>
          <div className={styles.storyDetails}>
            <div className={styles.storyHeader}>
              <div className={styles.featuredBadge}>Featured</div>
              <div className={styles.storyMeta}>{publication} • {date}</div>
            </div>
            <h3 className={styles.storyHeadline}>{title}</h3>
            <p className={styles.storyDescription}>{description}</p>
            <div className={styles.storyActions}>
              <button className={styles.saveIcon} onClick={handleSave}>
                <svg width="18" height="23" viewBox="0 0 18 23" fill="none">
                  <path d="M2 2V21L9 17L16 21V2H2Z" stroke={isSaved ? "#4CAF50" : "#003F88"} strokeWidth="2" fill={isSaved ? "#4CAF50" : "none"}/>
                </svg>
              </button>
              <button className={styles.shareIcon} onClick={handleShare}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect width="18" height="18" rx="2" fill="#003F88"/>
                  <path d="M5 13L13 5M13 5H8M13 5V10" stroke="white" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
            <div className={styles.readMoreLink}>
              <span>Read Full Article</span>
              <div className={styles.arrowIcon}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <ComunityCard />

      {/* Active Members Section */}
      <div className={styles.activeMembersSection}>
        <div className={styles.activeMembersHeader}>
          <h2 className={styles.activeMembersTitle}>Active Members</h2>
        </div>
        <div className={styles.membersContainer}>
          <div className={styles.memberAvatarsGroup}>
            {activeMembers.map((member, index) => (
              <div 
                key={index}
                className={styles.memberAvatar} 
                style={{left: `${index * 24}px`}}
                onClick={() => handleMemberClick(member.name)}
                title={member.name}
              >
                <img src={member.avatar} alt={member.name} />
              </div>
            ))}
          </div>
          <div className={styles.memberCount} onClick={handleMemberCountClick}>+12</div>
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className={styles.trendingTopicsSection}>
        <h2 className={styles.trendingTopicsTitle}>Trending Topics</h2>
        <div className={styles.topicsList}>
          {trendingTopics.map((topic, index) => (
            <div 
              key={index}
              className={styles.topicItem}
              onClick={() => handleTopicClick(topic)}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComunityOverview;
