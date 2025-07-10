import React, { useState, useEffect, useMemo } from 'react';
import styles from './Css/WorkOverview.module.css';
import JobDitles from './JobDitles';
import { useJobs, useAuth } from '../hooks/useApi';
import { apiService } from '../api';

interface JobApplication {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  description: string;
  industry: string;
  datePosted: string;
  isRemote: boolean;
  requirements: string[];
  benefits: string[];
}

interface RecommendedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  match: string;
  description: string;
  type: string;
}

interface TipItem {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

interface JobStats {
  applied: number;
  saved: number;
  viewed: number;
  interviews: number;
}

const WorkOverview: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [activeJobFilter, setActiveJobFilter] = useState<string>('All Jobs');
  const [activeViewMode, setActiveViewMode] = useState<string>('Grid');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [selectedLevel, setSelectedLevel] = useState<string>('All Levels');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All Industries');
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [viewedJobs, setViewedJobs] = useState<Set<number>>(new Set());
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Frontend Developer in San Francisco",
    "Remote UX Designer",
    "Product Manager in New York"
  ]);
  const [jobStats, setJobStats] = useState<JobStats>({
    applied: 0,
    saved: 0,
    viewed: 0,
    interviews: 0
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showJobDetails, setShowJobDetails] = useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [activeMode, setActiveMode] = useState<string>('Job');
  const { jobs, loading, error, refetch } = useJobs();

  if (loading) {
    return <div className={styles.loading}>Loading jobs...</div>;
  }
  if (error) {
    return <div className={styles.error}>Error loading jobs: {error}</div>;
  }

  // Mock data for different modes
  // const allJobs: JobApplication[] = [
  //   {
  //     id: 1,
  //     title: "Senior Frontend Developer",
  //     company: "TechCorp Solutions",
  //     location: "San Francisco, CA",
  //     type: "Full-time",
  //     level: "Senior Level",
  //     salary: "$120,000 - $150,000",
  //     industry: "Technology",
  //     datePosted: "2024-01-15",
  //     isRemote: false,
  //     description: "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces, implementing features, and ensuring the overall performance of our web applications. Work with cutting-edge technologies and collaborate with a talented team.",
  //     requirements: ["React", "TypeScript", "5+ years experience", "CSS/SCSS", "Git"],
  //     benefits: ["Health Insurance", "401k", "Flexible Hours", "Remote Work Options", "Professional Development"]
  //   },
  //   {
  //     id: 2,
  //     title: "Product Manager",
  //     company: "InnovateTech",
  //     location: "San Francisco, CA",
  //     type: "Full-time",
  //     level: "Senior Level",
  //     salary: "$120,000 - $150,000",
  //     industry: "Technology",
  //     datePosted: "2024-01-14",
  //     isRemote: true,
  //     description: "We are seeking a Product Manager to drive the development of our digital products. You will work closely with engineering, design, and marketing teams to define product strategy and roadmap. Lead cross-functional teams and make data-driven decisions.",
  //     requirements: ["Product Strategy", "Agile/Scrum", "Analytics", "Leadership", "3+ years experience"],
  //     benefits: ["Stock Options", "Health Insurance", "Unlimited PTO", "Remote Work", "Learning Budget"]
  //   },
  //   {
  //     id: 3,
  //     title: "UX/UI Designer",
  //     company: "DesignHub",
  //     location: "Austin, TX",
  //     type: "Full-time",
  //     level: "Mid Level",
  //     salary: "$85,000 - $110,000",
  //     industry: "Design",
  //     datePosted: "2024-01-13",
  //     isRemote: false,
  //     description: "Join our creative team as a UX/UI Designer to create intuitive and engaging user experiences. You will collaborate with product managers and developers to design user-centered solutions. Work on exciting projects that impact millions of users.",
  //     requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "2+ years experience"],
  //     benefits: ["Creative Environment", "Design Tools Budget", "Conference Attendance", "Health Insurance", "Flexible Schedule"]
  //   }
  // ];

  const allInternships: JobApplication[] = [
    {
      id: 101,
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      type: "Internship",
      level: "Entry Level",
      salary: "$8,000 - $10,000/month",
      industry: "Technology",
      datePosted: "2024-01-15",
      isRemote: false,
      description: "Join Google as a Software Engineering Intern and work on real projects that impact millions of users worldwide. Learn from experienced engineers and contribute to cutting-edge technology solutions.",
      requirements: ["Computer Science major", "Python/Java", "GPA 3.5+", "Problem solving", "Team collaboration"],
      benefits: ["Competitive salary", "Housing allowance", "Free meals", "Mentorship", "Career development"]
    },
    {
      id: 102,
      title: "UX Design Intern",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Internship",
      level: "Entry Level",
      salary: "$7,500 - $9,000/month",
      industry: "Design",
      datePosted: "2024-01-14",
      isRemote: false,
      description: "Work alongside Apple's world-class design team to create beautiful, intuitive user experiences. Contribute to products used by millions of people around the world.",
      requirements: ["Design portfolio", "Figma/Sketch", "User research", "Prototyping", "Creative thinking"],
      benefits: ["Design tools provided", "Creative environment", "Mentorship", "Networking", "Potential full-time offer"]
    },
    {
      id: 103,
      title: "Data Science Intern",
      company: "Microsoft",
      location: "Redmond, WA",
      type: "Internship",
      level: "Entry Level",
      salary: "$8,500 - $10,500/month",
      industry: "Data Science",
      datePosted: "2024-01-13",
      isRemote: true,
      description: "Join Microsoft's data science team to work on machine learning projects and data analysis. Gain hands-on experience with big data technologies and AI/ML algorithms.",
      requirements: ["Statistics/ML coursework", "Python/R", "SQL", "Analytical thinking", "Strong GPA"],
      benefits: ["Remote work option", "Learning resources", "Mentorship", "Competitive pay", "Career growth"]
    }
  ];

  const allProjects: JobApplication[] = [
    {
      id: 201,
      title: "E-commerce Platform Development",
      company: "Freelance Project",
      location: "Remote",
      type: "Project",
      level: "Mid Level",
      salary: "$5,000 - $8,000",
      industry: "Technology",
      datePosted: "2024-01-15",
      isRemote: true,
      description: "Develop a complete e-commerce platform with modern technologies. Build user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
      requirements: ["React/Node.js", "MongoDB/PostgreSQL", "Payment APIs", "3+ years experience", "Portfolio"],
      benefits: ["Flexible timeline", "Remote work", "Creative freedom", "Portfolio piece", "Direct client contact"]
    },
    {
      id: 202,
      title: "Mobile App Design & Development",
      company: "Startup Project",
      location: "Remote",
      type: "Project",
      level: "Senior Level",
      salary: "$10,000 - $15,000",
      industry: "Design",
      datePosted: "2024-01-14",
      isRemote: true,
      description: "Design and develop a mobile app from concept to launch. Work on UI/UX design, frontend development, and backend integration. Lead the entire project lifecycle.",
      requirements: ["React Native/Flutter", "UI/UX design", "API integration", "5+ years experience", "Project management"],
      benefits: ["Equity potential", "Creative control", "Portfolio showcase", "Remote work", "Startup experience"]
    },
    {
      id: 203,
      title: "AI Chatbot Development",
      company: "Tech Consulting",
      location: "Remote",
      type: "Project",
      level: "Mid Level",
      salary: "$6,000 - $9,000",
      industry: "Data Science",
      datePosted: "2024-01-13",
      isRemote: true,
      description: "Build an intelligent chatbot using natural language processing and machine learning. Integrate with existing systems and provide customer support automation.",
      requirements: ["Python", "NLP/ML", "API development", "2+ years experience", "Problem solving"],
      benefits: ["AI/ML experience", "Remote work", "Learning opportunity", "Portfolio project", "Competitive pay"]
    }
  ];

  // Get current data based on active mode
  const getCurrentData = () => {
    switch (activeMode) {
      case 'Job':
        return jobs || []; // Use jobs from backend
      case 'Internship':
        return allInternships;
      case 'Project':
        return allProjects;
      default:
        return jobs || []; // Use jobs from backend
    }
  };

  // Get filter options based on active mode
  const getTypeOptions = () => {
    switch (activeMode) {
      case 'Job':
        return ['All Types', 'Full-time', 'Part-time', 'Contract'];
      case 'Internship':
        return ['All Types', 'Summer Internship', 'Fall Internship', 'Spring Internship', 'Year-round'];
      case 'Project':
        return ['All Types', 'Web Development', 'Mobile App', 'AI/ML', 'Design', 'Consulting'];
      default:
        return ['All Types'];
    }
  };

  const getLevelOptions = () => {
    switch (activeMode) {
      case 'Job':
        return ['All Levels', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
      case 'Internship':
        return ['All Levels', 'Undergraduate', 'Graduate', 'PhD'];
      case 'Project':
        return ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
      default:
        return ['All Levels'];
    }
  };

  const getIndustryOptions = () => {
    switch (activeMode) {
      case 'Job':
        return ['All Industries', 'Technology', 'Design', 'Data Science', 'Marketing', 'Finance'];
      case 'Internship':
        return ['All Industries', 'Technology', 'Design', 'Data Science', 'Business', 'Engineering'];
      case 'Project':
        return ['All Industries', 'Technology', 'Design', 'AI/ML', 'E-commerce', 'Healthcare'];
      default:
        return ['All Industries'];
    }
  };

  const getFilterOptions = () => {
    switch (activeMode) {
      case 'Job':
        return ['All Jobs', 'Saved Jobs', 'Applied Jobs'];
      case 'Internship':
        return ['All Internships', 'Saved Internships', 'Applied Internships'];
      case 'Project':
        return ['All Projects', 'Saved Projects', 'Applied Projects'];
      default:
        return ['All Jobs', 'Saved Jobs', 'Applied Jobs'];
    }
  };

  const recommendedJobs: RecommendedJob[] = [
    {
      id: 101,
      title: "Frontend Developer",
      company: "WebSolutions",
      location: "Remote",
      salary: "$90,000 - $110,000",
      match: "95% Match",
      description: "Perfect match for your React and TypeScript skills.",
      type: "Full-time"
    },
    {
      id: 102,
      title: "UI/UX Designer",
      company: "CreativeMinds",
      location: "Remote",
      salary: "$80,000 - $100,000",
      match: "92% Match",
      description: "Great fit for your design and user research background.",
      type: "Full-time"
    },
    {
      id: 103,
      title: "React Developer",
      company: "AppWorks",
      location: "San Francisco, CA",
      salary: "$100,000 - $120,000",
      match: "88% Match",
      description: "Excellent opportunity to work with cutting-edge React technologies.",
      type: "Full-time"
    }
  ];

  const jobTips: TipItem[] = [
    {
      id: 1,
      title: "Resume Writing Tips",
      description: "Learn how to create a resume that stands out to recruiters and passes ATS systems.",
      category: "Resume",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Interview Preparation",
      description: "Prepare for common interview questions and make a great impression with confidence.",
      category: "Interview",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Career Development",
      description: "Strategies to advance your career and achieve your professional goals effectively.",
      category: "Career",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Salary Negotiation",
      description: "Master the art of salary negotiation and get the compensation you deserve.",
      category: "Negotiation",
      readTime: "7 min read"
    }
  ];

  // Filter jobs based on current filters and search
  const filteredJobs = useMemo(() => {
    return getCurrentData().filter(job => {
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !locationQuery || 
        job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
        (job.isRemote && locationQuery.toLowerCase().includes('remote'));
      
      const matchesType = selectedType === 'All Types' || job.type === selectedType;
      const matchesLevel = selectedLevel === 'All Levels' || job.level === selectedLevel;
      const matchesIndustry = selectedIndustry === 'All Industries' || job.industry === selectedIndustry;
      
      const matchesJobFilter = activeJobFilter === 'All Jobs' || 
        (activeJobFilter === 'Saved Jobs' && savedJobs.has(job.id)) ||
        (activeJobFilter === 'Applied Jobs' && appliedJobs.has(job.id));

      return matchesSearch && matchesLocation && matchesType && matchesLevel && matchesIndustry && matchesJobFilter;
    });
  }, [searchQuery, locationQuery, selectedType, selectedLevel, selectedIndustry, activeJobFilter, savedJobs, appliedJobs, getCurrentData]);

  // Update job stats when jobs change
  useEffect(() => {
    setJobStats({
      applied: appliedJobs.size,
      saved: savedJobs.size,
      viewed: viewedJobs.size,
      interviews: Math.floor(appliedJobs.size * 0.3) // Simulated interview rate
    });
  }, [appliedJobs, savedJobs, viewedJobs]);

  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add to recent searches
    const newSearch = `${searchQuery}${locationQuery ? ` in ${locationQuery}` : ''}`;
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== newSearch);
      return [newSearch, ...filtered].slice(0, 5);
    });
    
    setIsLoading(false);
    setShowSuccessMessage(`Found ${filteredJobs.length} jobs matching your search`);
  };

  const handleApply = (jobId: number, event?: React.MouseEvent) => {
    // Prevent opening job details when clicking apply button (since we're already opening it)
    if (event) {
      event.stopPropagation();
    }
    
    // Only mark as viewed, don't auto-apply
    setViewedJobs(prev => new Set([...prev, jobId]));
    
    // Show job details for apply action
    setSelectedJobId(jobId);
    setShowJobDetails(true);
  };

  const handleSaveJob = (jobId: number, event?: React.MouseEvent) => {
    // Prevent opening job details when clicking save button
    if (event) {
      event.stopPropagation();
    }
    
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
        setShowSuccessMessage('Job removed from saved list');
      } else {
        newSaved.add(jobId);
        setShowSuccessMessage('Job saved successfully!');
      }
      return newSaved;
    });
  };

  const handleViewDetails = (jobId: number, event?: React.MouseEvent) => {
    // Prevent opening job details when clicking view details button (since we're already opening it)
    if (event) {
      event.stopPropagation();
    }
    
    setViewedJobs(prev => new Set([...prev, jobId]));
    
    // Show job details instead of expanding
    setSelectedJobId(jobId);
    setShowJobDetails(true);
  };

  const handleCloseJobDetails = () => {
    setShowJobDetails(false);
    setSelectedJobId(null);
  };

  const handleJobDetailsApply = (jobId: number) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    setViewedJobs(prev => new Set([...prev, jobId]));
    setShowSuccessMessage('Application submitted successfully!');
  };

  const handleJobCardClick = (jobId: number) => {
    setViewedJobs(prev => new Set([...prev, jobId]));
    setSelectedJobId(jobId);
    setShowJobDetails(true);
  };

  const handleViewJob = (jobId: number) => {
    setShowSuccessMessage('Opening job details...');
    console.log('View recommended job:', jobId);
  };

  const handleReadMore = (tipId: number) => {
    setShowSuccessMessage('Opening article...');
    console.log('Read more about tip:', tipId);
  };

  const handleJobFilterChange = (filter: string) => {
    setActiveJobFilter(filter);
  };

  const handleViewModeChange = (mode: string) => {
    setActiveViewMode(mode);
  };

  const handleRecentSearch = (search: string) => {
    const parts = search.split(' in ');
    setSearchQuery(parts[0]);
    if (parts[1]) {
      setLocationQuery(parts[1]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted yesterday';
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Posted ${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
    // Reset filters when changing modes
    setSelectedType('All Types');
    setSelectedLevel('All Levels');
    setSelectedIndustry('All Industries');
    setActiveJobFilter(getFilterOptions()[0]);
  };

  return (
    <div className={styles.workContainer}>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          <span>{showSuccessMessage}</span>
        </div>
      )}

      {/* Job Details Modal */}
      {showJobDetails && selectedJobId && (
        <JobDitles
          jobId={selectedJobId}
          onClose={handleCloseJobDetails}
          onApply={handleJobDetailsApply}
          onSave={handleSaveJob}
          savedJobs={savedJobs}
          appliedJobs={appliedJobs}
        />
      )}

      {/* Search Content */}
      {/* <div className={styles.searchContent}>
        <div className={styles.searchIcon}></div>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for job titles, companies, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button 
          className={`${styles.searchButton} ${isLoading ? styles.loading : ''}`} 
          onClick={handleSearch}
          disabled={isLoading}
        >
          <span className={styles.searchButtonText}>
            {isLoading ? 'Searching...' : 'Search'}
          </span>
        </button>
      </div> */}

      {/* Selection Filters */}
      <div className={styles.selectionSection}>
        <div className={styles.filterGroup}>
          <select 
            className={`${styles.filterCategory} ${styles.filterCategory1}`}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {getTypeOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select 
            className={`${styles.filterCategory} ${styles.filterCategory2}`}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {getLevelOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select 
            className={`${styles.filterCategory} ${styles.filterCategory3}`}
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            {getIndustryOptions().map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <div className={`${styles.filterCategory} ${styles.filterCategory4}`}>
            <input
              type="text"
              className={styles.locationInput}
              placeholder="Search location..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {/* Mode Switcher */}
        <div className={styles.modeSwitcher}>
          {['Job', 'Internship', 'Project'].map(mode => (
            <button 
              key={mode}
              className={`${styles.modeButton} ${activeMode === mode ? styles.activeMode : ''}`}
              onClick={() => handleModeChange(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Jobs Title */}
      <div className={styles.featuredHeader}>
        <h2 className={styles.featuredTitle}>
          {activeMode === 'Job' ? 'Featured Jobs' : 
           activeMode === 'Internship' ? 'Featured Internships' : 'Featured Projects'}
        </h2>
        <span className={styles.jobCount}>
          {filteredJobs.length} {filteredJobs.length === 1 ? 'item' : 'items'} found
        </span>
      </div>

      {/* Job Filter Tabs */}
      <div className={styles.jobFilterTabs}>
        {getFilterOptions().map(filter => (
          <button 
            key={filter}
            className={`${styles.jobFilterTab} ${activeJobFilter === filter ? styles.active : ''}`}
            onClick={() => handleJobFilterChange(filter)}
          >
            <span className={`${styles.jobFilterTabText} ${activeJobFilter === filter ? styles.active : styles.inactive}`}>
              {filter}
              {filter.includes('Saved') && savedJobs.size > 0 && ` (${savedJobs.size})`}
              {filter.includes('Applied') && appliedJobs.size > 0 && ` (${appliedJobs.size})`}
            </span>
          </button>
        ))}
      </div>

      {/* View Mode Tabs */}
      <div className={styles.viewModeTabs}>
        {['Grid', 'List'].map(mode => (
          <button 
            key={mode}
            className={`${styles.viewModeTab} ${activeViewMode === mode ? styles.active : ''}`}
            onClick={() => handleViewModeChange(mode)}
          >
            <span className={`${styles.viewModeTabText} ${activeViewMode === mode ? styles.active : styles.inactive}`}>
              {mode}
            </span>
          </button>
        ))}
      </div>

      {/* Job Posts */}
      <div className={`${styles.jobsGrid} ${activeViewMode === 'List' ? styles.listView : styles.gridView}`}>
        {filteredJobs.length === 0 ? (
          <div className={styles.noJobs}>
            <p>No jobs found matching your criteria.</p>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          filteredJobs.map((job, index) => (
            <div 
              key={job.id} 
              className={`${styles.jobPost} ${styles[`jobPost${(index % 3) + 1}`]} ${expandedJobs.has(job.id) ? styles.expanded : ''}`}
              onClick={() => handleJobCardClick(job.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.jobHeader}>
                <div className={styles.jobTitleSection}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <p className={styles.jobCompany}>{job.company}</p>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobDate}>{formatDate(job.datePosted)}</span>
                    {job.isRemote && <span className={styles.remoteBadge}>Remote</span>}
                  </div>
                </div>
                <button 
                  className={`${styles.saveButton} ${savedJobs.has(job.id) ? styles.saved : ''}`}
                  onClick={(e) => handleSaveJob(job.id, e)}
                  title={savedJobs.has(job.id) ? 'Remove from saved' : 'Save job'}
                >
                  ♡
                </button>
              </div>
              
              <div className={styles.jobDetails}>
                <span className={styles.jobLocation}>{job.location}</span>
                <span className={styles.jobType}>{job.type}</span>
                <span className={styles.jobLevel}>{job.level}</span>
                <span className={styles.jobSalary}>{job.salary}</span>
              </div>
              
              <div className={styles.jobContent}>
                <p className={styles.jobDescription}>
                  {job.description.substring(0, 150)}...
                </p>
                
                <div className={styles.jobActions}>
                  <button 
                    className={styles.viewButton} 
                    onClick={(e) => handleViewDetails(job.id, e)}
                  >
                    <span className={styles.viewButtonText}>View Details</span>
                  </button>
                  <button 
                    className={`${styles.applyButton} ${appliedJobs.has(job.id) ? styles.applied : ''}`} 
                    onClick={(e) => handleApply(job.id, e)}
                    disabled={appliedJobs.has(job.id)}
                  >
                    <span className={styles.applyButtonText}>
                      {appliedJobs.has(job.id) ? 'Applied' : 'Apply'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Dashboard */}
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <h3 className={styles.dashboardTitle}>Your Job Dashboard</h3>
          <div className={styles.dashboardStats}>
            <div className={`${styles.statCard} ${styles.appliedCard}`}>
              <div className={`${styles.statIcon} ${styles.appliedIcon}`}></div>
              <p className={styles.statLabel}>Applied Jobs</p>
              <p className={styles.statNumber}>{jobStats.applied}</p>
            </div>
            <div className={`${styles.statCard} ${styles.savedCard}`}>
              <div className={`${styles.statIcon} ${styles.savedIcon}`}></div>
              <p className={styles.statLabel}>Saved Jobs</p>
              <p className={styles.statNumber}>{jobStats.saved}</p>
            </div>
            <div className={`${styles.statCard} ${styles.viewedCard}`}>
              <div className={`${styles.statIcon} ${styles.viewedIcon}`}></div>
              <p className={styles.statLabel}>Viewed Jobs</p>
              <p className={styles.statNumber}>{jobStats.viewed}</p>
            </div>
            <div className={`${styles.statCard} ${styles.interviewCard}`}>
              <div className={`${styles.statIcon} ${styles.interviewIcon}`}></div>
              <p className={styles.statLabel}>Interviews</p>
              <p className={styles.statNumber}>{jobStats.interviews}</p>
            </div>
          </div>
        </div>
        
        <div className={styles.recentSearches}>
          <h4 className={styles.recentTitle}>Recent Searches</h4>
          {recentSearches.map((search, index) => (
            <div 
              key={index} 
              className={styles.searchItem}
              onClick={() => handleRecentSearch(search)}
            >
              <p className={styles.searchText}>{search}</p>
              <div className={styles.searchIcon2}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className={styles.recommendations}>
        <h3 className={styles.recommendationsTitle}>Recommended For You</h3>
        <div className={styles.recommendationsList}>
          {recommendedJobs.map((job, index) => (
            <div key={job.id} className={styles.recommendationItem}>
              <div className={styles.recommendationHeader}>
                <h4 className={styles.recommendationJobTitle}>{job.title}</h4>
                <div className={styles.matchBadge}>
                  <span className={styles.matchText}>{job.match}</span>
                </div>
              </div>
              <div className={styles.recommendationDetails}>
                <p className={styles.recommendationCompany}>{job.company}</p>
                <p className={styles.recommendationInfo}>{job.location} • {job.salary}</p>
                <p className={styles.recommendationDescription}>{job.description}</p>
                <p className={styles.viewJobLink} onClick={() => handleViewJob(job.id)}>
                  View job →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Search Tips */}
      <div className={styles.tips}>
        <h3 className={styles.tipsTitle}>Job Search Tips</h3>
        <div className={styles.tipsList}>
          {jobTips.map((tip, index) => (
            <div key={tip.id} className={`${styles.tipItem} ${styles[`tipItem${(index % 3) + 1}`]}`}>
              <div className={styles.tipHeader}>
                <h4 className={styles.tipTitle}>{tip.title}</h4>
                <span className={styles.tipCategory}>{tip.category}</span>
              </div>
              <div className={styles.tipContent}>
                <p className={styles.tipDescription}>{tip.description}</p>
                <div className={styles.tipFooter}>
                  <span className={styles.tipReadTime}>{tip.readTime}</span>
                  <p className={styles.tipLink} onClick={() => handleReadMore(tip.id)}>
                    Read More →
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkOverview;
