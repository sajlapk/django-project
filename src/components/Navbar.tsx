import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Home, Info, MapPin, Calendar, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { userLoggedIn } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/about', label: 'About', icon: <Info size={20} /> },
    { path: '/fitness-directory', label: 'Fitness Centers', icon: <MapPin size={20} /> },
    { path: '/events', label: 'Events', icon: <Calendar size={20} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white shadow-sm border-b border-gray-100 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-black"><img className="h-[1.5  rem] w-[8rem]" src="logo_white_bg.png"/></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-red-500 border-b-2 border-red-500'
                      : 'text-gray-700 hover:text-red-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings size={16} className="mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-200 font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white shadow-sm border-b border-gray-100 relative z-50">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-black">Discipl</span>
            </Link>
            {user && (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-700 hover:text-red-500 transition-colors duration-200"
              >
                <User size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile User Menu Dropdown */}
        {isUserMenuOpen && user && (
          <div className="absolute top-full right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsUserMenuOpen(false)}
            >
              <User size={16} className="mr-2" />
              Profile
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Settings size={16} className="mr-2" />
                Admin Panel
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsUserMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg rounded-t-2xl mx-4 mb-4">
          <div className="flex justify-around items-center py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-red-500 bg-red-50'
                    : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span className="text-xs mt-1 font-medium">
                  {link.label === 'Fitness Centers' ? 'Centers' : link.label}
                </span>
              </Link>
            ))}
            {!user && (
              <Link
                to="/login"
                className="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 text-gray-600 hover:text-red-500 hover:bg-gray-50"
              >
                <User size={20} />
                <span className="text-xs mt-1 font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Auth Pages Bottom Navigation (when not logged in) */}
      {!user && (location.pathname === '/login' || location.pathname === '/register') && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg rounded-t-2xl mx-4 mb-4">
            <div className="flex justify-center items-center py-3">
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === '/login'
                      ? 'bg-red-500 text-white'
                      : 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === '/register'
                      ? 'bg-red-500 text-white'
                      : 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;