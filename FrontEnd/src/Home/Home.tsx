import React from 'react';
import Post from './Post';
import { useAuth } from '../hooks/useApi';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  console.log('Home component rendering...', { isAuthenticated, user });
  
  if (!isAuthenticated) {
    console.log('User not authenticated, showing login message');
    return <div>Please log in to view your Home feed.</div>;
  }
  
  console.log('User authenticated, rendering Post');
  return <Post />;
};

export default Home; 