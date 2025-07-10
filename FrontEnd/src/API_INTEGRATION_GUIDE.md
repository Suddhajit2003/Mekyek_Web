# API Integration Guide

This guide explains how to connect your frontend components to the backend API using the provided API service and React hooks.

## 📁 File Structure

```
src/
├── api.tsx                     # Main API service with all backend endpoints
├── hooks/useApi.tsx            # React hooks for easy API integration
├── config/api.config.ts        # API configuration and settings
└── examples/ApiUsageExamples.tsx # Example usage patterns
```

## 🚀 Quick Start

### 1. Basic API Service Usage

```typescript
import { apiService } from "./api";

// Login
const { user, token } = await apiService.login("user@example.com", "password");

// Get news
const news = await apiService.getNews();

// Post news
const formData = new FormData();
formData.append("content", "Breaking news!");
formData.append("userId", userId);
const newNews = await apiService.postNews(formData);
```

### 2. Using React Hooks (Recommended)

```typescript
import { useAuth, useNews, useJobs } from "./hooks/useApi";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { news, loading, error, postNews } = useNews();
  const { jobs, loading: jobsLoading } = useJobs();

  // Component logic here
}
```

## 🔐 Authentication

### Login Component Example

```typescript
import React, { useState } from "react";
import { useAuth } from "./hooks/useApi";

export const LoginComponent: React.FC = () => {
  const { login, loading, error, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isAuthenticated) {
    return <div>Welcome back!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};
```

## 📰 News Integration

### News Component Example

```typescript
import React, { useState } from "react";
import { useNews, useAuth } from "./hooks/useApi";

export const NewsComponent: React.FC = () => {
  const { news, loading, error, postNews, likeNews } = useNews();
  const { user } = useAuth();
  const [newPost, setNewPost] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPost.trim()) return;

    const formData = new FormData();
    formData.append("content", newPost);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("userId", user._id);

    try {
      await postNews(formData);
      setNewPost("");
    } catch (error) {
      console.error("Failed to post news:", error);
    }
  };

  const handleLike = async (newsId: string) => {
    if (!user) return;
    try {
      await likeNews(newsId, user._id);
    } catch (error) {
      console.error("Failed to like news:", error);
    }
  };

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share some news..."
          rows={3}
        />
        <button type="submit">Post</button>
      </form>

      {news?.map((item) => (
        <div
          key={item._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h4>
            {item.author.firstName} {item.author.lastName}
          </h4>
          <p>{item.content}</p>
          <button onClick={() => handleLike(item._id)}>❤️ {item.likes}</button>
        </div>
      ))}
    </div>
  );
};
```

## 💼 Job Integration

### Job Search Component Example

```typescript
import React, { useState, useEffect } from "react";
import { useJobs, useAuth } from "./hooks/useApi";

export const JobSearchComponent: React.FC = () => {
  const { jobs, loading, error } = useJobs();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (jobs) {
      const filtered = jobs.filter(
        (job) =>
          job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [jobs, searchTerm]);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredJobs.map((job) => (
        <div
          key={job._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "15px" }}
        >
          <h3>{job.role}</h3>
          <p>
            <strong>Company:</strong> {job.company.companyName}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Salary:</strong> {job.salary}
          </p>
          <p>{job.jobDescription}</p>
          <button>Apply Now</button>
        </div>
      ))}
    </div>
  );
};
```

## 👥 Profile Integration

### Profile Component Example

```typescript
import React, { useState } from "react";
import { useProfile, useAuth } from "./hooks/useApi";

export const ProfileComponent: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile(user?._id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    about: profile?.about || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const data = new FormData();
    data.append("userId", user._id);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder="First Name"
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="Last Name"
          />
          <textarea
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            placeholder="About"
            rows={4}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h2>
            {profile?.firstName} {profile?.lastName}
          </h2>
          <p>{profile?.about}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};
```

## 🏢 Company Integration

### Company Registration Example

```typescript
import React, { useState } from "react";
import { useCompany, useAuth } from "./hooks/useApi";

export const CompanyRegistrationComponent: React.FC = () => {
  const { user } = useAuth();
  const { company, loading, error, registerCompany } = useCompany(user?._id);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    companyIndustry: "",
    companySize: "",
    foundedYear: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append("userId", user._id);
    Object.entries(companyData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await registerCompany(formData);
      // Redirect to company dashboard
    } catch (error) {
      console.error("Failed to register company:", error);
    }
  };

  if (company) {
    return <div>Company already registered: {company.companyName}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={companyData.companyName}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyName: e.target.value })
        }
        placeholder="Company Name"
        required
      />
      <textarea
        value={companyData.companyDescription}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyDescription: e.target.value })
        }
        placeholder="Company Description"
        rows={4}
      />
      <input
        type="url"
        value={companyData.companyWebsite}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyWebsite: e.target.value })
        }
        placeholder="Company Website"
      />
      <input
        type="email"
        value={companyData.companyEmail}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyEmail: e.target.value })
        }
        placeholder="Company Email"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register Company"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};
```

## 🔄 Available Hooks

### Authentication Hooks

- `useAuth()` - Handle login, signup, logout, and user state

### Data Hooks

- `useNews()` - Fetch and manage news data
- `useEvents()` - Fetch and manage events data
- `useJobs()` - Fetch and manage job listings
- `useFeeds()` - Fetch and manage social feeds
- `useCommunities()` - Fetch and manage communities
- `useProfile(userId)` - Fetch and manage user profiles
- `useFriends(userId)` - Fetch and manage friend connections
- `useCompany(userId)` - Fetch and manage company data

### Generic Hooks

- `useApiData<T>(apiCall, deps)` - Generic hook for any API call
- `useApiOperation<T, R>(apiFunction)` - Generic hook for API operations with loading states

## 🛠️ Configuration

### Update API Base URL

Edit `src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? "https://your-production-api.com/api"
      : "http://localhost:3000/api",
  // ... other config
};
```

### Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🚨 Error Handling

The API service includes comprehensive error handling:

```typescript
// Automatic error handling with hooks
const { data, loading, error, refetch } = useNews();

if (loading) return <div>Loading...</div>;
if (error)
  return (
    <div>
      Error: {error} <button onClick={refetch}>Retry</button>
    </div>
  );

// Manual error handling with try-catch
try {
  const result = await apiService.postNews(formData);
} catch (error) {
  console.error("API Error:", error.message);
  // Handle specific error types
  if (error.message.includes("unauthorized")) {
    // Handle authentication error
  }
}
```

## 🔒 Authentication Flow

1. **Login/Signup**: User authenticates and receives JWT token
2. **Token Storage**: Token is stored in localStorage
3. **Auto-Injection**: Token is automatically added to all API requests
4. **Auto-Logout**: User is logged out if token expires (401 response)

## 📝 Best Practices

1. **Use Hooks**: Always prefer hooks over direct API service calls in components
2. **Error Boundaries**: Wrap components with error boundaries for better UX
3. **Loading States**: Always show loading states during API calls
4. **Retry Logic**: Implement retry functionality for failed requests
5. **Data Validation**: Validate data before sending to API
6. **Caching**: Consider implementing caching for frequently accessed data

## 🧪 Testing

```typescript
// Mock API service for testing
jest.mock("./api", () => ({
  apiService: {
    login: jest.fn(),
    getNews: jest.fn(),
    // ... other methods
  },
}));
```

## 📚 API Endpoints Reference

### Authentication

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/google` - Google OAuth login

### Profile

- `GET /profile/get` - Get user profile
- `POST /profile/update` - Update user profile
- `GET /profile/getAll` - Get all profiles

### Posts

- `GET /posts/news` - Get news posts
- `POST /posts/news` - Create news post
- `GET /posts/events` - Get events
- `POST /posts/events` - Create event
- `GET /posts/jobs` - Get job listings
- `POST /posts/jobs` - Create job posting

### Social Features

- `GET /feeds/getFeeds` - Get social feeds
- `POST /feeds/post` - Create feed post
- `POST /feeds/like` - Like a post
- `POST /feeds/comment` - Comment on a post

For more detailed API documentation, refer to the backend API documentation.

---

## 🚀 Next Steps

1. **Update BASE_URL** in `api.config.ts` to match your backend
2. **Start using hooks** in your existing components
3. **Add error boundaries** for better error handling
4. **Implement loading states** for better UX
5. **Add authentication** to protected routes
6. **Test API integration** with your backend

Happy coding! 🎉
