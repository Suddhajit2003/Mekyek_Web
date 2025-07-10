
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import ProofOfWork from '../components/ProofOfWork';

interface ProofOfWorkPageProps {
  onBackToMain?: () => void;
}

const ProofOfWorkPage: React.FC<ProofOfWorkPageProps> = ({ onBackToMain }) => {
  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <ProofOfWork />
    </AdminLayout>
  );
};

export default ProofOfWorkPage;
