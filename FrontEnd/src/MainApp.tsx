import React from 'react';
import Navbar from './Navbar/Navbar';
import ProfileOverview from './Profile/Profileoverview';
import Home from './Home';
import News from './News';
import Comunity from './Comunity';
import Learn from './Learn';
import Event from './Event';
import Work from './Work';
import DashboardPage from './Dashboard/DashboardPage';

interface MainAppProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const MainApp: React.FC<MainAppProps> = ({ currentPage, setCurrentPage }) => {
  const handleProfileClick = () => {
    setCurrentPage('Profile');
  };

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
  };

  const handleDashboardClick = () => {
    setCurrentPage('Dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Profile':
        return <ProfileOverview />;
      case 'Home':
        return <Home />;
      case 'News':
        return <News />;
      case 'Community':
        return <Comunity />;
      case 'Learn':
        return <Learn />;
      case 'Events':
        return <Event />;
      case 'Work':
        return <Work />;
      case 'Dashboard':
        return <DashboardPage onBackToMain={() => setCurrentPage('Home')} />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {currentPage !== 'Dashboard' && (
        <Navbar 
          onProfileClick={handleProfileClick} 
          currentPage={currentPage}
          onNavClick={handleNavClick}
          onDashboardClick={handleDashboardClick}
        />
      )}
      {renderCurrentPage()}
    </div>
  );
};

export default MainApp; 