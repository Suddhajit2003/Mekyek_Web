
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import Payroll from '../components/Payroll';

interface PayrollPageProps {
  onBackToMain?: () => void;
}

const PayrollPage: React.FC<PayrollPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <Payroll />
    </AdminLayout>
  );
};

export default PayrollPage;
