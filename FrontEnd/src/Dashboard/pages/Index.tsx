
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../components/Dashboard';

interface IndexProps {
  onBackToMain?: () => void;
}

const Index: React.FC<IndexProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Dashboard />
    </AdminLayout>
  );
};

export default Index;
