import { useEffect, useState } from 'react';
import FloatingChatbox from './components/FloatingChatbox/FloatingChatbox';
import PWAInstall from './components/PWAInstall';
import ErrorBoundary from './components/ErrorBoundary';
import MainApp from './MainApp';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('Home');
  const chatboxPages = ['Home', 'News', 'Learn', 'Events', 'Community', 'Work'];
  const showChatbot = chatboxPages.includes(currentPage);

  useEffect(() => {
    // Security and other side effects can be placed here
  }, []);

  return (
    <>
      <ErrorBoundary>
        <MainApp currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </ErrorBoundary>
      <PWAInstall />
      {showChatbot && <FloatingChatbox />}
    </>
  );
}

export default App