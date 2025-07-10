import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import ProfileOverview from './Profile/Profileoverview';
import Home from './Home';
import News from './News';
import Comunity from './Comunity';
import Learn from './Learn';
import Event from './Event';
import Work from './Work';
import DashboardPage from './Dashboard/DashboardPage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './Dashboard/components/ui/dialog';
import { useCompany, useAuth } from './hooks/useApi';

interface MainAppProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const registrationSteps = [
  { label: 'Company Name', key: 'companyName', type: 'text', placeholder: 'Enter company name', required: true },
  { label: 'Company Description', key: 'companyDescription', type: 'textarea', placeholder: 'Describe your company', required: false },
  { label: 'Company Website', key: 'companyWebsite', type: 'url', placeholder: 'https://example.com', required: false },
  { label: 'Company Email', key: 'companyEmail', type: 'email', placeholder: 'contact@example.com', required: true },
  { label: 'Company Phone', key: 'companyPhone', type: 'text', placeholder: 'Phone number', required: false },
  { label: 'Company Address', key: 'companyAddress', type: 'text', placeholder: 'Address', required: false },
  { label: 'Industry', key: 'companyIndustry', type: 'text', placeholder: 'Industry', required: false },
  { label: 'Company Size', key: 'companySize', type: 'text', placeholder: 'e.g. 50-100', required: false },
  { label: 'Founded Year', key: 'foundedYear', type: 'text', placeholder: 'e.g. 2010', required: false },
];

const CompanyRegistrationForm: React.FC<{ onRegistered: () => void }> = ({ onRegistered }) => {
  const { user } = useAuth();
  const { loading, error, registerCompany } = useCompany(user?._id);
  const [companyData, setCompanyData] = useState<any>({});
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);

  const current = registrationSteps[step];
  const isLast = step === registrationSteps.length - 1;
  const isFirst = step === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyData({ ...companyData, [current.key]: e.target.value });
    setTouched(true);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (current.required && !companyData[current.key]) {
      setTouched(true);
      return;
    }
    setStep((s) => s + 1);
    setTouched(false);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
    setTouched(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData();
    formData.append('userId', user._id);
    registrationSteps.forEach(({ key }) => {
      formData.append(key, companyData[key] || '');
    });
    try {
      await registerCompany(formData);
      onRegistered();
    } catch (error) {
      // error handled below
    }
  };

  return (
    <form onSubmit={isLast ? handleSubmit : handleNext} style={{
      minWidth: 340,
      maxWidth: 420,
      margin: '0 auto',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      borderRadius: 18,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
      border: '1px solid #e5e7eb',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    }}>
      <div style={{ width: '100%', marginBottom: 24, marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1e293b', letterSpacing: 0.2 }}>{current.label}</span>
        </div>
        <div style={{ width: '100%', height: 10, background: '#e5e7eb', borderRadius: 5, marginBottom: 18 }}>
          <div style={{ width: `${((step + 1) / registrationSteps.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)', borderRadius: 5, transition: 'width 0.3s' }} />
        </div>
      </div>
      <div style={{ width: '100%', marginBottom: 18 }}>
        {current.type === 'textarea' ? (
          <textarea
            value={companyData[current.key] || ''}
            onChange={handleChange}
            placeholder={current.placeholder}
            rows={3}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: touched && current.required && !companyData[current.key] ? '2px solid #ef4444' : '2px solid #cbd5e1',
              fontSize: 16,
              background: '#f1f5f9',
              color: '#334155',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'border 0.2s',
              resize: 'none',
            }}
            autoFocus
          />
        ) : (
          <input
            type={current.type}
            value={companyData[current.key] || ''}
            onChange={handleChange}
            placeholder={current.placeholder}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: touched && current.required && !companyData[current.key] ? '2px solid #ef4444' : '2px solid #cbd5e1',
              fontSize: 16,
              background: '#f1f5f9',
              color: '#334155',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'border 0.2s',
            }}
            autoFocus
          />
        )}
        {touched && current.required && !companyData[current.key] && (
          <div style={{ color: '#ef4444', fontSize: 13, marginTop: 4, fontWeight: 500 }}>This field is required</div>
        )}
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: 8 }}>
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          style={{
            padding: '9px 22px',
            borderRadius: 8,
            border: 'none',
            background: isFirst ? '#e5e7eb' : 'linear-gradient(90deg, #64748b 0%, #2563eb 100%)',
            color: isFirst ? '#a1a1aa' : '#fff',
            fontWeight: 600,
            fontSize: 15,
            cursor: isFirst ? 'not-allowed' : 'pointer',
            boxShadow: isFirst ? 'none' : '0 2px 8px 0 rgba(37,99,235,0.08)',
            transition: 'background 0.2s',
          }}
        >Back</button>
        {isLast ? (
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '9px 22px',
              borderRadius: 8,
              border: 'none',
              background: loading ? 'linear-gradient(90deg, #a5b4fc 0%, #bae6fd 100%)' : 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
              transition: 'background 0.2s',
            }}
          >{loading ? 'Registering...' : 'Register Company'}</button>
        ) : (
          <button
            type="submit"
            style={{
              padding: '9px 22px',
              borderRadius: 8,
              border: 'none',
              background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
              transition: 'background 0.2s',
            }}
          >Next</button>
        )}
      </div>
      {error && <div style={{ color: '#ef4444', marginTop: 14, fontWeight: 500 }}>{error}</div>}
    </form>
  );
};

const MainApp: React.FC<MainAppProps> = ({ currentPage, setCurrentPage }) => {
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const { user } = useAuth();
  const { company } = useCompany(user?._id);

  const handleProfileClick = () => {
    setCurrentPage('Profile');
  };

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
  };

  const handleDashboardClick = () => {
    if (!company) {
      setShowCompanyModal(true);
    } else {
      setCurrentPage('Dashboard');
    }
  };

  const handleCompanyRegistered = () => {
    setShowCompanyModal(false);
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
      <Dialog open={showCompanyModal} onOpenChange={setShowCompanyModal}>
        <DialogContent style={{ padding: 0, borderRadius: 20, minWidth: 370, maxWidth: 460, background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.18)' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: 26, fontWeight: 800, textAlign: 'center', marginBottom: 0, color: '#1e293b', letterSpacing: 0.3 }}>Register Your Company</DialogTitle>
          </DialogHeader>
          <CompanyRegistrationForm onRegistered={handleCompanyRegistered} />
          <DialogClose asChild>
            <button style={{ margin: '20px auto 0', display: 'block', background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: 17, cursor: 'pointer', letterSpacing: 0.2 }}>Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainApp; 