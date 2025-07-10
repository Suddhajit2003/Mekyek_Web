
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import UserManagement from '../components/UserManagement';

interface UserManagementPageProps {
  onBackToMain?: () => void;
}

const UserManagementPage: React.FC<UserManagementPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <UserManagement />
    </AdminLayout>
  );
};

export default UserManagementPage;
