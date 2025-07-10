
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Projects from '../components/Projects';

interface ProjectsPageProps {
  onBackToMain?: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Projects />
    </AdminLayout>
  );
};

export default ProjectsPage;
