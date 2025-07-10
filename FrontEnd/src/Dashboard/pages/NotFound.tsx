import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  onBackToMain?: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBackToMain }) => {
  const navigate = useNavigate();

  return (
    <AdminLayout onBackToMain={onBackToMain}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
          <span className="text-white text-4xl font-bold">404</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NotFound;
