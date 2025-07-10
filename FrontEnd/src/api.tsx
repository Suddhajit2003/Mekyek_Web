import axios from 'axios';
import { API_CONFIG } from './config/api.config';
import type { AxiosInstance, AxiosResponse } from 'axios';

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: string;
  dob?: string;
  phoneNumber?: number;
  gender?: string;
  country?: string;
  about?: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  skills?: Skills;
  certificate?: Certificate[];
  friends?: Friend[];
  pendingFriends?: PendingFriend[];
  // Added for compatibility with PostCreation.tsx
  name?: string;
  title?: string;
  avatar?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  jobType: string;
}

export interface Education {
  name: string;
  stream: string;
  endDate: string;
}

export interface Skills {
  technicalKnowledge: {
    language: string[];
    framework: string[];
  };
  coreKnowledge: string[];
  languages: { name: string; level: string }[];
}

export interface Certificate {
  name: string;
  issuedBy: string;
  courseType: string;
  duration: string;
  description: string;
}

export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  company: string;
  title: string;
}

export interface PendingFriend {
  userId: string;
  status: string;
  connectionDate: Date;
}

export interface News {
  _id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    _id: string;
  };
  newsPhoto?: string;
  likes: number;
  likeBy: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Event {
  _id: string;
  eventType: string;
  eventName: string;
  eventImage?: string;
  location: string;
  date: string;
  time: string;
  author: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    _id: string;
  };
  createdAt: string;
}

export interface Job {
  _id: string;
  role: string;
  company: {
    companyName: string;
    companyLogo: string;
    companyEmail: string;
    companyId: string;
  };
  location: string;
  salary: string;
  experience: string;
  jobType: string;
  employmentType: string;
  industryType: string;
  department: string;
  roleCategory: string;
  jobDescription: string;
  qualifications: string;
  jobBenefits: string;
  postedOn: string;
}

export interface Feed {
  _id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    _id: string;
  };
  image?: string;
  likes: number;
  likeBy: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  userId: string;
  comment: string;
  userName: string;
  createdAt: Date;
}

export interface Community {
  _id: string;
  name: string;
  description: string;
  // category: string;
  members: CommunityMember[];
  posts: CommunityPost[];
  createdAt?: Date;
}

export interface CommunityMember {
  userId: string;
  role: string;
  // joinedAt: Date;
}

export interface CommunityPost {
  _id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    _id: string;
  };
  image?: string | null;
  likes: number;
  likeBy: string[];
  comments: Comment[];
  createdAt: Date;
}

export interface Company {
  _id: string;
  companyName: string;
  companyLogo: string;
  companyEmail: string;
  // companyDescription: string;
  companyWebsite: string;
  companyAddress: string;
  // companyPhone: string;
  // companyIndustry: string;
  // companySize: string;
  // foundedYear: string;
  userId: string;
}

export interface CompanyJob {
  _id: string;
  jobId: string;
  companyId: string;
  title: string;
  jobType: string;
  applicants: number;
  postedOn: Date;
  postedBy: string;
  location: string;
  rejected: string[];
  onHold: string[];
  interviewPending: string[];
  interviewPassed: string[];
  hired: string[];
  totalCandidates: string[];
  activeCandidates: string[];
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_CONFIG.STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message ||
      API_CONFIG.ERROR_MESSAGES.UNKNOWN_ERROR;

    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., show login modal or redirect to landing page)
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userData');
      // TODO: Trigger login modal or redirect to landing page here
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Utility function to map backend comment to frontend Comment interface
function mapBackendCommentToFrontend(comment: any): Comment {
  return {
    userId: comment.commenter ?? comment.userId, // fallback if already mapped
    comment: comment.comment,
    userName: comment.userName,
    createdAt: new Date(comment.createdAt),
  };
}

// API Class
class ApiService {
  // Authentication APIs
  async login(email: string, password: string, remember = false): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, password });
      if (response.data.success) {
        this.setSession(response.data.token, response.data.user, remember);
        return { user: response.data.user, token: response.data.token };
      }
      throw new Error(response.data.message);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async signup(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }, remember = false): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, userData);
      if (response.data.success) {
        this.setSession(response.data.token, response.data.user, remember);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        return { user: response.data.user, token: response.data.token };
      }
      throw new Error(response.data.message);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  }

  async googleLogin(code: string): Promise<{ user: User; token: string }> {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.AUTH.GOOGLE_LOGIN}?code=${code}`);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        return { user: response.data.user, token: response.data.token };
      }
      throw new Error(response.data.message);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  }

  // Profile APIs
  async updateProfile(profileData: FormData): Promise<User> {
    try {
      const response = await api.post('/profile/update', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  async getProfile(userId: string): Promise<User> {
    try {
      const response = await api.get(`/profile/get?_id=${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  }

  async getAllProfiles(): Promise<User[]> {
    try {
      const response = await api.get('/profile/getAll');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get profiles');
    }
  }

  // Friend APIs
  async getFriendStatus(currentUserId: string, friendId: string): Promise<{ status: string }> {
    try {
      const response = await api.get(`/profile/friend-status?currentUserId=${currentUserId}&friendId=${friendId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get friend status');
    }
  }

  async getFriendRequests(userId: string): Promise<Friend[]> {
    try {
      const response = await api.get(`/profile/friend-requests?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get friend requests');
    }
  }

  async addFriend(currentUserId: string, friendId: string): Promise<{ message: string }> {
    try {
      const response = await api.post('/profile/add-friend', { currentUserId, friendId });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add friend');
    }
  }

  async acceptFriend(currentUserId: string, friendId: string): Promise<{ message: string }> {
    try {
      const response = await api.post('/profile/accept-friend', { currentUserId, friendId });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to accept friend');
    }
  }

  async rejectFriend(currentUserId: string, friendId: string): Promise<{ message: string }> {
    try {
      const response = await api.post('/profile/reject-friend', { currentUserId, friendId });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reject friend');
    }
  }

  async getFriends(userId: string): Promise<Friend[]> {
    try {
      const response = await api.get(`/profile/friends?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get friends');
    }
  }

  // News APIs
  async getNews(): Promise<News[]> {
    console.log('[API Call] getNews');
    try {
      const response = await api.get('/posts/news');
      console.log('[API Success] getNews', response.data);
      // Defensive: handle both array and {success, news} shape
      if (Array.isArray(response.data)) return response.data;
      if (response.data.news && Array.isArray(response.data.news)) return response.data.news;
      if (response.data.News && Array.isArray(response.data.News)) return response.data.News;
      return [];
    } catch (error: any) {
      console.error('[API Error] getNews', error);
      throw new Error(error.response?.data?.message || 'Failed to get news');
    }
  }

  async postNews(newsData: FormData): Promise<News> {
    console.log('[API Call] postNews');
    try {
      const response = await api.post('/posts/news', newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('[API Success] postNews', response.data);
      if (response.data.success && response.data.news) {
        return response.data.news;
      } else if (response.data.News) {
        return response.data.News;
      } else if (response.data.news) {
        return response.data.news;
      } else {
        throw new Error(response.data.message || 'Failed to create news');
      }
    } catch (error: any) {
      console.error('[API Error] postNews', error);
      throw new Error(error.response?.data?.message || 'Failed to post news');
    }
  }

  async likeNews(newsId: string, userId: string): Promise<News> {
    console.log('[API Call] likeNews', { newsId, userId });
    try {
      const response = await api.post('/posts/news/like', { newsId, userId });
      console.log('[API Success] likeNews', response.data);
      if (response.data.success && response.data.News) {
        return response.data.News;
      } else if (response.data.news) {
        return response.data.news;
      } else {
        throw new Error(response.data.message || 'Failed to like news');
      }
    } catch (error: any) {
      console.error('[API Error] likeNews', error);
      throw new Error(error.response?.data?.message || 'Failed to like news');
    }
  }

  async commentNews(newsId: string, userId: string, comment: string, userName: string): Promise<News> {
    console.log('[API Call] commentNews', { newsId, userId, comment, userName });
    try {
      const response = await api.post('/posts/news/commentPost', {
        newsId,
        userId,
        comment,
        userName
      });
      console.log('[API Success] commentNews', response.data);
      if (response.data.success && response.data.News) {
        return response.data.News;
      } else if (response.data.news) {
        return response.data.news;
      } else {
        throw new Error(response.data.message || 'Failed to comment on news');
      }
    } catch (error: any) {
      console.error('[API Error] commentNews', error);
      throw new Error(error.response?.data?.message || 'Failed to comment on news');
    }
  }

  async getNewsComments(newsId: string): Promise<Comment[]> {
    try {
      const response = await api.get(`/posts/news/getComments?newsId=${newsId}`);
      // Defensive: handle both {comments: []} and array
      if (Array.isArray(response.data)) return response.data;
      if (response.data.comments && Array.isArray(response.data.comments)) return response.data.comments.map(mapBackendCommentToFrontend);
      return [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get comments');
    }
  }

  // Events APIs
  async getEvents(): Promise<Event[]> {
    try {
      const response = await api.get('/posts/events');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get events');
    }
  }

  async getEventById(eventId: string): Promise<Event> {
    try {
      const response = await api.get(`/posts/events/${eventId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get event');
    }
  }

  async postEvent(eventData: FormData): Promise<Event> {
    try {
      const response = await api.post('/posts/events', eventData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.event;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to post event');
    }
  }

  // Jobs APIs
  async getJobs(): Promise<Job[]> {
    try {
      const response = await api.get('/posts/jobs');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get jobs');
    }
  }

  async getJobById(jobId: string): Promise<Job> {
    try {
      const response = await api.get(`/posts/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get job');
    }
  }

  async postJob(jobData: Job): Promise<{ job: Job; companyJob: CompanyJob }> {
    try {
      const response = await api.post('/posts/job', jobData);
      return { job: response.data.job, companyJob: response.data.companyJob };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to post job');
    }
  }

  // Feeds APIs
  async getFeeds(): Promise<Feed[]> {
    try {
      const response = await api.get('/feeds/getFeeds');
      if (response.data.success) {
        return response.data.feeds;
      }
      throw new Error(response.data.message || 'Failed to get feeds');
    } catch (error: any) {
      console.error('[API Error] getFeeds', error);
      throw new Error(error.response?.data?.message || 'Failed to get feeds');
    }
  }

  async postFeed(feedData: FormData): Promise<Feed> {
    try {
      const response = await api.post('/feeds/post', feedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        return response.data.feed;
      }
      throw new Error(response.data.message || 'Failed to post feed');
    } catch (error: any) {
      console.error('[API Error] postFeed', error);
      throw new Error(error.response?.data?.message || 'Failed to post feed');
    }
  }

  async likeFeed(feedId: string, userId: string): Promise<Feed> {
    try {
      const response = await api.post('/feeds/like', { feedId, userId });
      if (response.data.success) {
        return response.data.feed;
      }
      throw new Error(response.data.message || 'Failed to like feed');
    } catch (error: any) {
      console.error('[API Error] likeFeed', error);
      throw new Error(error.response?.data?.message || 'Failed to like feed');
    }
  }

  async commentFeed(feedId: string, userId: string, comment: string, userName: string): Promise<Feed> {
    try {
      const response = await api.post('/feeds/commentPost', { feedId, userId, comment, userName });
      if (response.data.success) {
        return response.data.feed;
      }
      throw new Error(response.data.message || 'Failed to comment on feed');
    } catch (error: any) {
      console.error('[API Error] commentFeed', error);
      throw new Error(error.response?.data?.message || 'Failed to comment on feed');
    }
  }

  async getFeedComments(feedId: string): Promise<Comment[]> {
    try {
      const response = await api.get(`/feeds/getComments?feedId=${feedId}`);
      if (response.data.success) {
        return (response.data.comments || []).map(mapBackendCommentToFrontend);
      }
      throw new Error(response.data.message || 'Failed to get feed comments');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get feed comments');
    }
  }

  // Community APIs
  async getCommunities(): Promise<Community[]> {
    try {
      const response = await api.get('/community/get');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get communities');
    }
  }

  async getCommunityById(communityId: string): Promise<Community> {
    try {
      const response = await api.get(`/community/get?id=${communityId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get community');
    }
  }

  async getCommunityByUserId(userId: string): Promise<Community[]> {
    try {
      const response = await api.get(`/community/get?_id=${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user communities');
    }
  }

  async createCommunity(communityData: FormData): Promise<Community> {
    try {
      const response = await api.post('/community/create', communityData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.community;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create community');
    }
  }
  async createCommunityPost(postData: {
    communityId: string;
    content: string;
    author: {
      firstName: string;
      lastName: string;
      profilePhoto: string;
      _id: string;
    };
  }): Promise<CommunityPost> {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.COMMUNITY.POST, postData);
      return response.data.post;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create community post');
    }
  }

  async likeCommunityPost(postId: string, communityId: string, userId: string): Promise<CommunityPost> {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.COMMUNITY.LIKE, {
        postId,
        communityId,
        userId
      });
      return response.data.post;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to like community post');
    }
  }

  async commentCommunityPost(postId: string, communityId: string, userId: string, comment: string, userName: string): Promise<CommunityPost> {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.COMMUNITY.COMMENT, {
        postId,
        communityId,
        userId,
        comment,
        userName
      });
      return response.data.post;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to comment on community post');
    }
  }

  async getCommunityPostComments(postId: string, communityId: string): Promise<Comment[]> {
    try {
      const response = await api.get(
        `${API_CONFIG.ENDPOINTS.COMMUNITY.COMMENTS}?postId=${postId}&communityId=${communityId}`
      );
      return (response.data.comments || []).map(mapBackendCommentToFrontend);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get community post comments');
    }
  }

  // Company APIs
  async registerCompany(companyData: FormData): Promise<{ company: Company; companyToken: string; companyID: string }> {
    try {
      const response = await api.post('/company/register', companyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return {
        company: response.data.company,
        companyToken: response.data.companyToken,
        companyID: response.data.companyID,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to register company');
    }
  }

  async getCompanyByUserId(userId: string): Promise<Company> {
    try {
      const response = await api.get(`/company/get?userId=${userId}`);
      return response.data.company;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get company');
    }
  }

  async getCompanyById(companyId: string): Promise<Company> {
    try {
      const response = await api.get(`/company/getCompany?_id=${companyId}`);
      return response.data.company;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get company');
    }
  }

  // ATS APIs
  async getCompanyJobs(companyId: string, jobType: string = 'All'): Promise<CompanyJob[]> {
    try {
      const response = await api.get(`/ats/get-company-jobs?companyId=${companyId}&jobType=${jobType}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get company jobs');
    }
  }

  async getApplicants(jobId: string): Promise<User[]> {
    try {
      const response = await api.get(`/ats/applicants?jobId=${jobId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get applicants');
    }
  }

  async getAllPosts(companyId: string): Promise<{ posts: (Feed | Event | News)[] }> {
    try {
      const response = await api.get(`/ats/get-all-posts?companyId=${companyId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get all posts');
    }
  }

  // Utility methods
  logout(): void {
    // Clear both storages
    localStorage.removeItem(API_CONFIG.STORAGE_KEYS.TOKEN);
    localStorage.removeItem('userData');
    sessionStorage.removeItem(API_CONFIG.STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem('userData');
    // TODO: Trigger login modal or redirect to landing page here
    // window.location.href = '/';
  }

  getStorage() {
    // Prefer localStorage if both have a token, else use whichever has a token
    if (localStorage.getItem('token')) return localStorage;
    if (sessionStorage.getItem('token')) return sessionStorage;
    return localStorage; // fallback
  }
  setSession(token: string, user: any, remember: boolean) {
    // Always clear both storages before setting new session
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('userData', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const storage = this.getStorage();
    const userData = storage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  getAuthToken(): string | null {
    const storage = this.getStorage();
    return storage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
