import React, { useState } from 'react';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import AuthLayout from './components/layout/AuthLayout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import UserSearch from './components/search/UserSearch';
import ProfileForm from './components/profile/ProfileForm';

type Page = 'login' | 'register' | 'search' | 'profile';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>(isAuthenticated ? 'search' : 'login');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAuthSuccess = () => {
    setCurrentPage('search');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated && (currentPage === 'login' || currentPage === 'register')) {
    return (
      <AuthLayout>
        {currentPage === 'login' ? (
          <div className="space-y-6">
            <LoginForm onSuccess={handleAuthSuccess} />
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentPage('register')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <RegisterForm onSuccess={handleAuthSuccess} />
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentPage('login')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        )}
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {currentPage === 'search' && <UserSearch />}
        {currentPage === 'profile' && <ProfileForm />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
