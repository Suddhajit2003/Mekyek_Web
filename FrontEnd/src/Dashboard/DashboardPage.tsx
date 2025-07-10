import React from 'react';
import DashboardApp from './DashboardApp';

interface DashboardPageProps {
  onBackToMain?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onBackToMain }) => {
  return (
    <div className="dashboard-container">
      <DashboardApp onBackToMain={onBackToMain} />
    </div>
  );
};

export default DashboardPage; 