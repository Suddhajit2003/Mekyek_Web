import React from 'react';
import Navbar from './Navbar/Navbar';
import './Css/Profile.module.css';
import ProfileOverview from './Profile/Profileoverview';
import { useAuth, useProfile } from './hooks/useApi';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile(user?._id);
  return (
    <div>
      <Navbar />
      <ProfileOverview
        profile={profile}
        loading={loading}
        error={error}
        onUpdateProfile={updateProfile}
      />
    </div>
  );
};

export default Profile;
