
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Reports from '../components/Reports';

interface ReportsPageProps {
  onBackToMain?: () => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Reports />
    </AdminLayout>
  );
};

export default ReportsPage;
