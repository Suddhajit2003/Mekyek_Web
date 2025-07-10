
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Employees from '../components/Employees';

interface EmployeesPageProps {
  onBackToMain?: () => void;
}

const EmployeesPage: React.FC<EmployeesPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Employees />
    </AdminLayout>
  );
};

export default EmployeesPage;
