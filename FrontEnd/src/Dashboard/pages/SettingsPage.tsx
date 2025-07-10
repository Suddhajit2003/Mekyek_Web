
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Settings from '../components/Settings';

interface SettingsPageProps {
  onBackToMain?: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Settings />
    </AdminLayout>
  );
};

export default SettingsPage;
