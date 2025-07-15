import React from 'react';
import { LogOut, User, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

interface NavbarProps {
  onNavigate: (page: 'login' | 'register' | 'search' | 'profile') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">UserConnect</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={currentPage === 'search' ? 'primary' : 'ghost'}
                    onClick={() => onNavigate('search')}
                    icon={Users}
                  >
                    Search Users
                  </Button>
                  
                  <Button
                    variant={currentPage === 'profile' ? 'primary' : 'ghost'}
                    onClick={() => onNavigate('profile')}
                    icon={User}
                  >
                    {user?.firstName} {user?.lastName}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    icon={LogOut}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant={currentPage === 'login' ? 'primary' : 'ghost'}
                  onClick={() => onNavigate('login')}
                >
                  Sign In
                </Button>
                <Button
                  variant={currentPage === 'register' ? 'primary' : 'outline'}
                  onClick={() => onNavigate('register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;