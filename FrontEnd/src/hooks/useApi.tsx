import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../api';
import type { User, News, Event, Job, Feed, Community, Company } from '../api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const token = apiService.getAuthToken();
    const user = apiService.getCurrentUser();
    
    // Check for demo user if no real user
    if (!user) {
      const demoUser = localStorage.getItem('demo_user');
      if (demoUser) {
        try {
          const userData = JSON.parse(demoUser);
          setAuthState(prev => ({
            ...prev,
            user: userData,
            token: 'demo_token',
            isAuthenticated: true,
          }));
          return;
        } catch (err) {
          console.error('Error parsing demo user:', err);
        }
      }
    }
    
    setAuthState(prev => ({
      ...prev,
      user,
      token,
      isAuthenticated: !!token,
    }));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    console.warn('Login function is currently disabled.');
    return Promise.resolve({ user: null, token: null });
  }, []);

  const signup = useCallback(async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    console.warn('Signup function is currently disabled.');
    return Promise.resolve({ user: null, token: null });
  }, []);

  const logout = useCallback(() => {
    apiService.logout();
    localStorage.removeItem('userData');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout,
  };
}

export function useApiData<T>(
  apiCall: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    /*
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
    */
    
    // Backend connection is paused, so we'll prevent API calls.
    console.warn('Backend connection is paused. API calls are disabled.');
    setState({
      data: null,
      loading: false,
      error: 'Backend is disconnected. Using offline data.'
    });

  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

export function useNews() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getNews());

  const postNews = useCallback(async (newsData: FormData) => {
    try {
      const newNews = await apiService.postNews(newsData);
      refetch();
      return newNews;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  const likeNews = useCallback(async (newsId: string, userId: string) => {
    try {
      const updatedNews = await apiService.likeNews(newsId, userId);
      refetch();
      return updatedNews;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  const commentNews = useCallback(async (newsId: string, userId: string, comment: string, userName: string) => {
    try {
      const updatedNews = await apiService.commentNews(newsId, userId, comment, userName);
      refetch();
      return updatedNews;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    news: data,
    loading,
    error,
    refetch,
    postNews,
    likeNews,
    commentNews,
  };
}

export function useEvents() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getEvents());

  const postEvent = useCallback(async (eventData: FormData) => {
    try {
      const newEvent = await apiService.postEvent(eventData);
      refetch();
      return newEvent;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    events: data,
    loading,
    error,
    refetch,
    postEvent,
  };
}

export function useJobs() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getJobs());

  const postJob = useCallback(async (jobData: Job) => {
    try {
      const result = await apiService.postJob(jobData);
      refetch();
      return result;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    jobs: data,
    loading,
    error,
    refetch,
    postJob,
  };
}

export function useFeeds() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getFeeds());

  const postFeed = useCallback(async (feedData: FormData) => {
    try {
      const newFeed = await apiService.postFeed(feedData);
      refetch();
      return newFeed;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  const likeFeed = useCallback(async (feedId: string, userId: string) => {
    try {
      const updatedFeed = await apiService.likeFeed(feedId, userId);
      refetch();
      return updatedFeed;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  const commentFeed = useCallback(async (feedId: string, userId: string, comment: string, userName: string) => {
    try {
      const updatedFeed = await apiService.commentFeed(feedId, userId, comment, userName);
      refetch();
      return updatedFeed;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    feeds: data,
    loading,
    error,
    refetch,
    postFeed,
    likeFeed,
    commentFeed,
  };
}

export function useCommunities() {
  const { data, loading, error, refetch } = useApiData(() => apiService.getCommunities());

  const createCommunity = useCallback(async (communityData: FormData) => {
    try {
      const newCommunity = await apiService.createCommunity(communityData);
      refetch();
      return newCommunity;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    communities: data,
    loading,
    error,
    refetch,
    createCommunity,
  };
}

export function useProfile(userId?: string) {
  const { data, loading, error, refetch } = useApiData(
    () => userId ? apiService.getProfile(userId) : Promise.resolve(null),
    [userId]
  );

  const updateProfile = useCallback(async (profileData: FormData) => {
    try {
      const updatedProfile = await apiService.updateProfile(profileData);
      refetch();
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    profile: data,
    loading,
    error,
    refetch,
    updateProfile,
  };
}

export function useFriends(userId?: string) {
  const { data, loading, error, refetch } = useApiData(
    () => userId ? apiService.getFriends(userId) : Promise.resolve(null),
    [userId]
  );

  const addFriend = useCallback(async (currentUserId: string, friendId: string) => {
    try {
      const result = await apiService.addFriend(currentUserId, friendId);
      refetch();
      return result;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  const acceptFriend = useCallback(async (currentUserId: string, friendId: string) => {
    try {
      const result = await apiService.acceptFriend(currentUserId, friendId);
      refetch();
      return result;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  const rejectFriend = useCallback(async (currentUserId: string, friendId: string) => {
    try {
      const result = await apiService.rejectFriend(currentUserId, friendId);
      refetch();
      return result;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    friends: data,
    loading,
    error,
    refetch,
    addFriend,
    acceptFriend,
    rejectFriend,
  };
}

export function useCompany(userId?: string) {
  const { data, loading, error, refetch } = useApiData(
    () => userId ? apiService.getCompanyByUserId(userId) : Promise.resolve(null),
    [userId]
  );

  const registerCompany = useCallback(async (companyData: FormData) => {
    try {
      const result = await apiService.registerCompany(companyData);
      refetch();
      return result;
    } catch (error) {
      throw error;
    }
  }, [refetch]);

  return {
    company: data,
    loading,
    error,
    refetch,
    registerCompany,
  };
}

// Generic hook for any API operation with loading and error states
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, [apiFunction]);

  return { execute, loading, error };
} 