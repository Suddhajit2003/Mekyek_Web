
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import ATS from '../components/ATS';

interface ATSPageProps {
  onBackToMain?: () => void;
}

const ATSPage: React.FC<ATSPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <ATS />
    </AdminLayout>
  );
};

export default ATSPage;
