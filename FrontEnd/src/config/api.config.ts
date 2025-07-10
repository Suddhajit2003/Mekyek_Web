// API Configuration
export const API_CONFIG = {
  // Base URL for your backend API
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com/api' 
    : 'http://localhost:5000',
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      GOOGLE_LOGIN: '/auth/google',
    },
    
    // Profile
    PROFILE: {
      UPDATE: '/profile/update',
      GET: '/profile/get',
      GET_ALL: '/profile/getAll',
      FRIEND_STATUS: '/profile/friend-status',
      FRIEND_REQUESTS: '/profile/friend-requests',
      ADD_FRIEND: '/profile/add-friend',
      ACCEPT_FRIEND: '/profile/accept-friend',
      REJECT_FRIEND: '/profile/reject-friend',
      FRIENDS: '/profile/friends',
    },
    
    // Posts
    POSTS: {
      NEWS: '/posts/news',
      EVENTS: '/posts/events',
      JOBS: '/posts/jobs',
      LIKE_NEWS: '/posts/like-news',
      COMMENT_NEWS: '/posts/comment-news',
      COMMENTS: '/posts/comments',
    },
    
    // Feeds
    FEEDS: {
      GET: '/feeds/getFeeds',
      POST: '/feeds/post',
      LIKE: '/feeds/like',
      COMMENT: '/feeds/comment',
      COMMENTS: '/feeds/comments',
    },
    
    // Community
    COMMUNITY: {
      GET: '/community/get',
      CREATE: '/community/create',
      POST: '/community/post',
      LIKE: '/community/like',
      COMMENT: '/community/comment',
      COMMENTS: '/community/comments',
    },
    
    // Company
    COMPANY: {
      REGISTER: '/company/register',
      GET: '/company/get',
      GET_COMPANY: '/company/getCompany',
      TEAM_MEMBERS: '/company/team-members',
      DOCUMENTS: '/company/documents',
    },
    
    // ATS (Applicant Tracking System)
    ATS: {
      COMPANY_JOBS: '/ats/get-company-jobs',
      APPLICANTS: '/ats/applicants',
      ALL_POSTS: '/ats/get-all-posts',
    },
  },
  
  // Error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'Requested resource not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    TIMEOUT: 'Request timeout. Please try again.',
    UNKNOWN_ERROR: 'An unknown error occurred.',
  },
  
  // HTTP Status codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  
  // Local storage keys
  STORAGE_KEYS: {
    TOKEN: 'token',
    USER_DATA: 'userData',
    REFRESH_TOKEN: 'refreshToken',
  },
  
  // File upload settings
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  
  // Rate limiting
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
  },
  
  // Feature flags
  FEATURES: {
    ENABLE_GOOGLE_LOGIN: true,
    ENABLE_FILE_UPLOAD: true,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_REAL_TIME_CHAT: false,
  },
};

export default API_CONFIG; 