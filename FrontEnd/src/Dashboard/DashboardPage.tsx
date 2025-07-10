import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardApp from './DashboardApp';

interface DashboardPageProps {
  onBackToMain?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onBackToMain }) => {
  return (
    <div className="dashboard-container">
      <BrowserRouter>
        <DashboardApp onBackToMain={onBackToMain} />
      </BrowserRouter>
    </div>
  );
};

export default DashboardPage; 