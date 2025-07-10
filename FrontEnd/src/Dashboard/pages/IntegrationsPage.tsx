
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Integrations from '../components/Integrations';

interface IntegrationsPageProps {
  onBackToMain?: () => void;
}

const IntegrationsPage: React.FC<IntegrationsPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Integrations />
    </AdminLayout>
  );
};

export default IntegrationsPage;
