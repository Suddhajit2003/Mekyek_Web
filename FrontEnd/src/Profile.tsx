import React from 'react';
import Navbar from './Navbar/Navbar';
import './Css/Profile.module.css';
import ProfileOverview from './Profile/Profileoverview';

const Profile: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ProfileOverview />
    </div>
  );
};

export default Profile;
