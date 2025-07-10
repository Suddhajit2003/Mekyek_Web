import { useEffect, useState } from 'react';
import FloatingChatbox from './components/FloatingChatbox/FloatingChatbox';
import PWAInstall from './components/PWAInstall';
import ErrorBoundary from './components/ErrorBoundary';
import MainApp from './MainApp';
import Landingpage from './Landingpage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('Landing');
  const chatboxPages = ['Home', 'News', 'Learn', 'Events', 'Community', 'Work'];
  const showChatbot = chatboxPages.includes(currentPage);

  const [loggedIn, setLoggedIn] = useState(() => {
    // Check both storages for token
    return (
      !!localStorage.getItem('token') ||
      !!sessionStorage.getItem('token')
    );
  });

  useEffect(() => {
    console.log('User joined the app');
    // Send health signal to backend
    fetch('http://localhost:5000/ping')
      .then(res => res.text())
      .then(msg => console.log('Health signal sent:', msg))
      .catch(err => console.error('Health signal failed:', err));


    // Initialize rate limiter
    // const rateLimiter = new RateLimiter(60000, 100); // 100 requests per minute
    // const firewall = Firewall.getInstance();

    // Add rate limiting and firewall to fetch requests
    // const originalFetch = window.fetch;
    /*
    window.fetch = async (...args) => {
      try {
        // Create a Request object from the fetch arguments
        const request = new Request(...args);
        
        // Check firewall rules
        await firewall.checkRequest(request);
        
        // Check rate limit
        if (rateLimiter.isRateLimited('api')) {
          throw new Error('Too many requests. Please try again later.');
        }
        
        return originalFetch(...args);
      } catch (error) {
        console.error('Security check failed:', error);
        throw error;
      }
    };
    */

    // Prevent copy
    /*
    const preventCopy = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault()
      }
    }

    // Prevent screenshots and screen recording
    const preventScreenCapture = () => {
      // Disable right-click
      document.addEventListener('contextmenu', (e) => e.preventDefault())
      
      // Disable print screen
      document.addEventListener('keydown', (e) => {
        if (e.key === 'PrintScreen') {
          e.preventDefault()
        }
      })

      // Disable screen recording
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia = async () => {
          throw new Error('Screen recording is not allowed')
        }
      }
    }

    // Prevent dev tools
    const preventDevTools = () => {
      document.addEventListener('keydown', (e) => {
        if (
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
          (e.ctrlKey && e.key === 'U') ||
          (e.key === 'F12')
        ) {
          e.preventDefault()
        }
      })
    }

    // Apply all prevention methods
    // preventScreenCapture()
    // preventDevTools()
    // document.addEventListener('keydown', preventCopy)

    // Cleanup
    return () => {
      // window.fetch = originalFetch;
      // document.removeEventListener('keydown', preventCopy)
    }
    */
  }, [])


  // Add this useEffect to handle auth state changes
  useEffect(() => {
    if (loggedIn && currentPage === 'Landing') {
      setCurrentPage('Home');
    } else if (!loggedIn) {
      setCurrentPage('Landing');
    }
  }, [loggedIn]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setCurrentPage('Home');
  };

  return (
    <>
      <ErrorBoundary>
        {currentPage === 'Landing' ? (
          <Landingpage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <MainApp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLoggedIn={setLoggedIn} // Pass this down for logout functionality
          />
        )}
      </ErrorBoundary>
      <PWAInstall />
      {showChatbot && <FloatingChatbox />}
    </>
  );
}

export default App