import React, { useState, useEffect } from 'react';
import { 
  useAuth, 
  useNews, 
  useEvents, 
  useJobs, 
  useFeeds, 
  useProfile, 
  useFriends,
  useApiOperation,
  useCompany,
  useCommunities
} from '../hooks/useApi';
import { apiService } from '../api';
import type { User, News, Event, Job, Feed } from '../api';

// Example: Login Component with API Integration
export const LoginExample: React.FC = () => {
  const { login, loading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Handle successful login (redirect, etc.)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isAuthenticated) {
    return <div>Welcome! You are logged in.</div>;
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

// Example: News Component with API Integration
export const NewsExample: React.FC = () => {
  const { news, loading, error, postNews, likeNews, commentNews } = useNews();
  const { user } = useAuth();
  const [newsContent, setNewsContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handlePostNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newsContent.trim()) return;

    const formData = new FormData();
    formData.append('content', newsContent);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('userPhoto', user.profilePhoto || '');
    formData.append('userId', user._id);
    if (selectedFile) {
      formData.append('newsPhoto', selectedFile);
    }

    try {
      await postNews(formData);
      setNewsContent('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to post news:', error);
    }
  };

  const handleLikeNews = async (newsId: string) => {
    if (!user) return;
    try {
      await likeNews(newsId, user._id);
    } catch (error) {
      console.error('Failed to like news:', error);
    }
  };

  const handleCommentNews = async (newsId: string, comment: string) => {
    if (!user || !comment.trim()) return;
    try {
      await commentNews(newsId, user._id, comment, `${user.firstName} ${user.lastName}`);
    } catch (error) {
      console.error('Failed to comment on news:', error);
    }
  };

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Post News Form */}
      <form onSubmit={handlePostNews}>
        <textarea
          placeholder="What's happening?"
          value={newsContent}
          onChange={(e) => setNewsContent(e.target.value)}
          rows={3}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        <button type="submit">Post News</button>
      </form>

      {/* Display News */}
      {news?.map((item) => (
        <div key={item._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <div>
            <strong>{item.author.firstName} {item.author.lastName}</strong>
            <small> - {new Date(item.createdAt).toLocaleDateString()}</small>
          </div>
          <p>{item.content}</p>
          {item.newsPhoto && (
            <img src={item.newsPhoto} alt="News" style={{ maxWidth: '100%', height: 'auto' }} />
          )}
          <div>
            <button onClick={() => handleLikeNews(item._id)}>
              Like ({item.likes})
            </button>
            <button onClick={() => {
              const comment = prompt('Enter your comment:');
              if (comment) handleCommentNews(item._id, comment);
            }}>
              Comment ({item.comments.length})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example: Job Search Component with API Integration
export const JobSearchExample: React.FC = () => {
  const { jobs, loading, error, postJob } = useJobs();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (jobs) {
      const filtered = jobs.filter(job =>
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [jobs, searchTerm]);

  const handleApplyJob = async (jobId: string) => {
    if (!user) {
      alert('Please login to apply for jobs');
      return;
    }
    // Here you would typically call an API to apply for the job
    console.log('Applying for job:', jobId);
    alert('Application submitted successfully!');
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {filteredJobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '15px' }}>
            <h3>{job.role}</h3>
            <p><strong>Company:</strong> {job.company.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Employment Type:</strong> {job.employmentType}</p>
            <p><strong>Description:</strong> {job.jobDescription}</p>
            <p><strong>Posted:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
            <button onClick={() => handleApplyJob(job._id)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example: Profile Component with API Integration
export const ProfileExample: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile(user?._id);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    location: '',
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        about: profile.about || '',
        location: profile.country || '',
      });
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('firstName', editData.firstName);
    formData.append('lastName', editData.lastName);
    formData.append('about', editData.about);
    formData.append('location', editData.location);

    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={editData.firstName}
              onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={editData.lastName}
              onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
              required
            />
          </div>
          <div>
            <label>About:</label>
            <textarea
              value={editData.about}
              onChange={(e) => setEditData({ ...editData, about: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{profile?.firstName} {profile?.lastName}</h2>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>About:</strong> {profile?.about || 'No description available'}</p>
          <p><strong>Location:</strong> {profile?.country || 'Not specified'}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

// Example: Using the generic useApiOperation hook
export const GenericApiExample: React.FC = () => {
  const { execute: getAllProfiles, loading, error } = useApiOperation(apiService.getAllProfiles);
  const [profiles, setProfiles] = useState<User[]>([]);

  const handleGetAllProfiles = async () => {
    try {
      const allProfiles = await getAllProfiles();
      setProfiles(allProfiles);
    } catch (error) {
      console.error('Failed to get profiles:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGetAllProfiles} disabled={loading}>
        {loading ? 'Loading...' : 'Get All Profiles'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {profiles.map((profile) => (
          <div key={profile._id} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
            <h4>{profile.firstName} {profile.lastName}</h4>
            <p>{profile.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example: Error Handling and Loading States
export const ErrorHandlingExample: React.FC = () => {
  const { news, loading, error, refetch } = useNews();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center' }}>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>News Feed</h2>
      {news && news.length > 0 ? (
        news.map((item) => (
          <div key={item._id}>
            <h3>{item.content}</h3>
            <p>By: {item.author.firstName} {item.author.lastName}</p>
          </div>
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default {
  LoginExample,
  NewsExample,
  JobSearchExample,
  ProfileExample,
  GenericApiExample,
  ErrorHandlingExample,
}; 