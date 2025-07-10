#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Enabling Backend Connection...\n');

// Function to update file content
function updateFile(filePath, oldContent, newContent, description) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes(oldContent)) {
      content = content.replace(oldContent, newContent);
      fs.writeFileSync(fullPath, content);
      console.log(`✅ ${description}`);
    } else {
      console.log(`⚠️  ${description} - Content not found, may already be enabled`);
    }
  } catch (error) {
    console.log(`❌ Error updating ${filePath}: ${error.message}`);
  }
}

// Enable API calls in useApi.tsx
const useApiOldContent = `    /*
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
    */
    
    // Backend connection is paused, so we'll prevent API calls.
    console.warn('Backend connection is paused. API calls are disabled.');
    setState({
      data: null,
      loading: false,
      error: 'Backend is disconnected. Using offline data.'
    });`;

const useApiNewContent = `    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }`;

updateFile(
  'src/hooks/useApi.tsx',
  useApiOldContent,
  useApiNewContent,
  'Enabled API calls in useApi.tsx'
);

// Enable login function
const loginOldContent = `  const login = useCallback(async (email: string, password: string) => {
    console.warn('Login function is currently disabled.');
    return Promise.resolve({ user: null, token: null });
  }, []);`;

const loginNewContent = `  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await apiService.login(email, password);
      setAuthState(prev => ({
        ...prev,
        user: result.user,
        token: result.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      }));
      return result;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, []);`;

updateFile(
  'src/hooks/useApi.tsx',
  loginOldContent,
  loginNewContent,
  'Enabled login function'
);

// Enable signup function
const signupOldContent = `  const signup = useCallback(async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    console.warn('Signup function is currently disabled.');
    return Promise.resolve({ user: null, token: null });
  }, []);`;

const signupNewContent = `  const signup = useCallback(async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await apiService.signup(userData);
      setAuthState(prev => ({
        ...prev,
        user: result.user,
        token: result.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      }));
      return result;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      }));
      throw error;
    }
  }, []);`;

updateFile(
  'src/hooks/useApi.tsx',
  signupOldContent,
  signupNewContent,
  'Enabled signup function'
);

console.log('\n🎉 Backend connection enabled!');
console.log('\n📋 Next steps:');
console.log('1. Update BASE_URL in src/api.tsx with your backend URL');
console.log('2. Start your backend server');
console.log('3. Test the connection');
console.log('\n📖 See API_INTEGRATION_STATUS.md for detailed information'); 