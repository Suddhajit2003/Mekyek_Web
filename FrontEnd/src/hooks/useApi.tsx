import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../api';
import type {
  User, News, Event, Job, Feed, Community, Company, CompanyJob, Comment
} from '../api';

// Generic API state
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Auth state
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// --- Auth Hook ---
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = apiService.getAuthToken();
    const user = apiService.getCurrentUser();
    setAuthState(prev => ({
      ...prev,
      user,
      token,
      isAuthenticated: !!token,
      loading: false,
    }));
  }, []);

  const login = useCallback(async (email: string, password: string, remember = false) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { token, user } = await apiService.login(email, password, remember);
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      return { user, token };
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, []);

  const signup = useCallback(async (userData: { firstName: string; lastName: string; email: string; password: string; }, remember = false) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { token, user } = await apiService.signup(userData, remember);
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      return { user, token };
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    apiService.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  }, []);

  return { ...authState, login, signup, logout };
}

// --- Generic API Data Hook ---
export function useApiData<T>(apiCall: () => Promise<T>, deps: React.DependencyList = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, deps);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { ...state, refetch: fetchData };
}

// --- News Hook ---
export function useNews() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getNews());

  const postNews = useCallback(async (newsData: FormData) => {
    const newNews = await apiService.postNews(newsData);
    await refetch();
    return newNews;
  }, [refetch]);

  const likeNews = useCallback(async (newsId: string, userId: string) => {
    const updatedNews = await apiService.likeNews(newsId, userId);
    await refetch();
    return updatedNews;
  }, [refetch]);

  const commentNews = useCallback(async (newsId: string, userId: string, comment: string, userName: string) => {
    const updatedNews = await apiService.commentNews(newsId, userId, comment, userName);
    await refetch();
    return updatedNews;
  }, [refetch]);

  const getNewsComments = useCallback(async (newsId: string) => {
    return await apiService.getNewsComments(newsId);
  }, []);

  return { news: data, loading, error, refetch, postNews, likeNews, commentNews, getNewsComments };
}

// --- Events Hook ---
export function useEvents() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getEvents());

  const postEvent = useCallback(async (eventData: FormData) => {
    const newEvent = await apiService.postEvent(eventData);
    await refetch();
    return newEvent;
  }, [refetch]);

  return { events: data, loading, error, refetch, postEvent };
}

// --- Jobs Hook ---
export function useJobs() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getJobs());

  const postJob = useCallback(async (jobData: Job) => {
    const result = await apiService.postJob(jobData);
    await refetch();
    return result;
  }, [refetch]);

  return { jobs: data, loading, error, refetch, postJob };
}

// --- Feeds Hook ---
export function useFeeds() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getFeeds());

  const postFeed = useCallback(async (feedData: FormData) => {
    const newFeed = await apiService.postFeed(feedData);
    await refetch();
    return newFeed;
  }, [refetch]);

  const likeFeed = useCallback(async (feedId: string, userId: string) => {
    const updatedFeed = await apiService.likeFeed(feedId, userId);
    await refetch();
    return updatedFeed;
  }, [refetch]);

  const commentFeed = useCallback(async (feedId: string, userId: string, comment: string, userName: string) => {
    const updatedFeed = await apiService.commentFeed(feedId, userId, comment, userName);
    await refetch();
    return updatedFeed;
  }, [refetch]);

  const getFeedComments = useCallback(async (feedId: string) => {
    return await apiService.getFeedComments(feedId);
  }, []);

  return { feeds: data, loading, error, refetch, postFeed, likeFeed, commentFeed, getFeedComments };
}

// --- Communities Hook ---
export function useCommunities() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getCommunities());

  const createCommunity = useCallback(async (communityData: FormData) => {
    const newCommunity = await apiService.createCommunity(communityData);
    await refetch();
    return newCommunity;
  }, [refetch]);

  // Add more community-related mutations as needed

  return { communities: data, loading, error, refetch, createCommunity };
}

// --- Community Posts/Comments Hook ---
export function useCommunityPosts(communityId: string) {
  // You can fetch a single community and access its posts
  const { data, loading, error, refetch } = useApiData(
    () => apiService.getCommunityById(communityId),
    [communityId]
  );

  const createCommunityPost = useCallback(async (postData: {
    communityId: string;
    content: string;
    author: { firstName: string; lastName: string; profilePhoto: string; _id: string; };
  }) => {
    const post = await apiService.createCommunityPost(postData);
    await refetch();
    return post;
  }, [refetch]);

  const likeCommunityPost = useCallback(async (postId: string, userId: string) => {
    const post = await apiService.likeCommunityPost(postId, communityId, userId);
    await refetch();
    return post;
  }, [refetch, communityId]);

  const commentCommunityPost = useCallback(async (postId: string, userId: string, comment: string, userName: string) => {
    const post = await apiService.commentCommunityPost(postId, communityId, userId, comment, userName);
    await refetch();
    return post;
  }, [refetch, communityId]);

  const getCommunityPostComments = useCallback(async (postId: string) => {
    return await apiService.getCommunityPostComments(postId, communityId);
  }, [communityId]);

  return {
    community: data,
    loading,
    error,
    refetch,
    createCommunityPost,
    likeCommunityPost,
    commentCommunityPost,
    getCommunityPostComments,
  };
}

// --- Profile Hook ---
export function useProfile(userId?: string) {
  const { data, loading, error, refetch } = useApiData(
    () => userId ? apiService.getProfile(userId) : Promise.resolve(null),
    [userId]
  );

  const updateProfile = useCallback(async (profileData: FormData) => {
    const updatedProfile = await apiService.updateProfile(profileData);
    await refetch();
    return updatedProfile;
  }, [refetch]);

  return { profile: data, loading, error, refetch, updateProfile };
}

// --- Friends Hook ---
export function useFriends(userId?: string) {
  const { data, loading, error, refetch } = useApiData(
    () => userId ? apiService.getFriends(userId) : Promise.resolve(null),
    [userId]
  );

  const addFriend = useCallback(async (currentUserId: string, friendId: string) => {
    const result = await apiService.addFriend(currentUserId, friendId);
    await refetch();
    return result;
  }, [refetch]);

  const acceptFriend = useCallback(async (currentUserId: string, friendId: string) => {
    const result = await apiService.acceptFriend(currentUserId, friendId);
    await refetch();
    return result;
  }, [refetch]);

  const rejectFriend = useCallback(async (currentUserId: string, friendId: string) => {
    const result = await apiService.rejectFriend(currentUserId, friendId);
    await refetch();
    return result;
  }, [refetch]);

  return { friends: data, loading, error, refetch, addFriend, acceptFriend, rejectFriend };
}

// --- Company Hook ---
export function useCompany(userId?: string) {
  const { data, loading, error, refetch } = useApiData(
    () => userId ? apiService.getCompanyByUserId(userId) : Promise.resolve(null),
    [userId]
  );

  const registerCompany = useCallback(async (companyData: FormData) => {
    const result = await apiService.registerCompany(companyData);
    await refetch();
    return result;
  }, [refetch]);

  return { company: data, loading, error, refetch, registerCompany };
}

// --- Company Jobs Hook ---
export function useCompanyJobs(companyId: string, jobType: string = 'All') {
  const { data, loading, error, refetch } = useApiData(
    () => apiService.getCompanyJobs(companyId, jobType),
    [companyId, jobType]
  );

  return { companyJobs: data, loading, error, refetch };
}

// --- Generic API Operation Hook ---
export function useApiOperation<T extends unknown[], R>(
  apiFunction: (...args: T) => Promise<R>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: T): Promise<R> => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      throw err;
    }
  }, [apiFunction]);

  return { execute, loading, error };
}

