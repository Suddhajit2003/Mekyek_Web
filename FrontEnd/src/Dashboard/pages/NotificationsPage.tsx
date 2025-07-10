
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Notifications from '../components/Notifications';

interface NotificationsPageProps {
  onBackToMain?: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Notifications />
    </AdminLayout>
  );
};

export default NotificationsPage;
