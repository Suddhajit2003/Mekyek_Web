import React, { useState, useEffect } from 'react';
import Newsoverview from './News/Newsoverview';
import NewsCard from './News/NewsCard';
import NewsArticle from './News/NewsArticle';
import styles from './Css/News.module.css';

interface NewsData {
  category: { name: string; color: 'business' | 'technology' | 'career' };
  publication: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  cardIndex: number;
  content: string;
  readTime: string;
  views: string;
  shares: string;
}

const News: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsData | null>(null);
  const [isViewingArticle, setIsViewingArticle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState<NewsData[]>([]);

  const getSourceUrl = (publication: string): string => {
    const sourceUrls: { [key: string]: string } = {
      'Business Insider': 'https://www.businessinsider.com',
      'Science Today': 'https://www.sciencedaily.com',
      'Career Insights': 'https://www.linkedin.com/pulse',
      'Tech Innovations': 'https://techcrunch.com',
      'Management Quarterly': 'https://hbr.org',
      'Legal Tech Today': 'https://www.law.com',
      'Tech Insider': 'https://www.theverge.com'
    };
    return sourceUrls[publication] || 'https://news.google.com';
  };

  const newsData: NewsData[] = [
    {
      category: { name: 'Business', color: 'business' as const },
      publication: 'Business Insider',
      date: 'April 30, 2025',
      title: 'Remote Work Trends: Companies Adopting Hybrid Models for Post-Pandemic Era',
      description: 'As the world adjusts to new work norms, major corporations are implementing flexible policies',
      content: 'In FY25, major corporations worldwide have been implementing comprehensive hybrid work models that combine remote and in-office work arrangements. This shift represents a fundamental change in how businesses operate in the post-pandemic era. Companies are investing in digital infrastructure, collaborative tools, and new management practices to support distributed teams. The trend is driven by employee demands for flexibility, cost savings on office space, and access to global talent pools. Research shows that 73% of companies plan to maintain hybrid options permanently, with 41% of employees preferring a mix of remote and office work. This transformation is reshaping corporate culture, performance metrics, and employee engagement strategies across industries.',
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
      readTime: '8 min read',
      views: '4,328',
      shares: '872',
      cardIndex: 1
    },
    {
      category: { name: 'Technology', color: 'technology' as const },
      publication: 'Science Today',
      date: 'April 29, 2025',
      title: 'Quantum Computing Breakthrough: New Chip Design Promises Stable Qubits',
      description: 'Scientists have developed a revolutionary chip architecture that could solve one of quantum computing\'s biggest challenges',
      content: 'Researchers at leading technology institutes have achieved a major breakthrough in quantum computing with the development of a new chip architecture that significantly improves qubit stability. The innovation addresses one of the field\'s most persistent challenges: quantum decoherence, which causes qubits to lose their quantum properties rapidly. The new design utilizes advanced error correction techniques and novel materials to extend coherence times by up to 1000%. This development could accelerate the timeline for practical quantum computing applications in cryptography, drug discovery, and complex optimization problems. Industry experts predict this breakthrough could bring quantum advantage closer to reality for commercial applications.',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center',
      readTime: '6 min read',
      views: '2,945',
      shares: '534',
      cardIndex: 2
    },
    {
      category: { name: 'Career', color: 'career' as const },
      publication: 'Career Insights',
      date: 'April 28, 2025',
      title: 'Salary Negotiation Strategies for 2025: How to Maximize Your Compensation Package',
      description: 'With changing economic conditions, effective negotiation tactics have evolved. Learn the latest strategies',
      content: 'The landscape of salary negotiation has evolved significantly in 2025, with new strategies emerging to address changing economic conditions and workplace dynamics. Modern negotiation approaches focus on total compensation packages rather than just base salary, including equity, benefits, professional development opportunities, and flexible work arrangements. Key strategies include thorough market research using AI-powered salary tools, building compelling value propositions based on measurable achievements, and timing negotiations strategically. The rise of remote work has also created opportunities to negotiate for geographical pay premiums and location-independent compensation. Successful negotiators now leverage data analytics, industry benchmarks, and demonstrate ROI to secure optimal packages in competitive job markets.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
      readTime: '5 min read',
      views: '1,856',
      shares: '298',
      cardIndex: 3
    }
  ];

  // Filter news based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredNews(newsData);
    } else {
      const filtered = newsData.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.publication.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  }, [searchTerm]);

  // Initialize filtered news
  useEffect(() => {
    setFilteredNews(newsData);
  }, []);

  const handleCardClick = (article: NewsData) => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setSelectedArticle(article);
      setIsViewingArticle(true);
      setIsLoading(false);
    }, 300);
  };

  const handleBackToNews = () => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setIsViewingArticle(false);
      setSelectedArticle(null);
      setIsLoading(false);
    }, 200);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      background: '#F8F9FA',
      paddingTop: '70px'  // Add space for the fixed navbar
    }}>
      {/* Always show sidebar components */}
      <Newsoverview showCenterContent={!isViewingArticle} onSearch={handleSearch} />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
          <p>Loading...</p>
        </div>
      )}
      
      {/* Conditional center content */}
      {isViewingArticle && selectedArticle ? (
        <NewsArticle article={selectedArticle} onBack={handleBackToNews} />
      ) : (
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
            filteredNews.map((news, index) => (
              <NewsCard
                key={index}
                category={news.category}
                publication={news.publication}
                date={news.date}
                title={news.title}
                description={news.description}
                imageUrl={news.imageUrl}
                cardIndex={news.cardIndex}
                onClick={() => handleCardClick(news)}
                sourceUrl={getSourceUrl(news.publication)}
                initialLikes={Math.floor(Math.random() * 500) + 50}
                initialComments={Math.floor(Math.random() * 100) + 10}
                initialShares={Math.floor(Math.random() * 200) + 20}
                initialSaves={Math.floor(Math.random() * 150) + 15}
              />
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
