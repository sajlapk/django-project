import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Home, Info, MapPin, Calendar, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc } from 'firebase/firestore';

const Navbar = () => {
  const { userLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Smooth scroll to section accounting for navbar height
  const scrollToSection = (id: string) => {
    window.scrollTo({ top: 500, behavior: "smooth" })
    const el = document.getElementById(id);
    if (!el)return
    const navbarHeight = document.querySelector('nav')?.clientHeight ?? 0;
    const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight + 8; // small gap
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveSection(id);
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (location.pathname === '/') {
      // already on main page -> just scroll
      scrollToSection(targetId);
    } else {
      console.log("HHHHHEe")
      // navigate to main page and pass target section via state
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  // Helper function for observer
  const isOverlapping = (div1: HTMLDivElement, div2: HTMLDivElement) => {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  // Runs on scroll to detect which section overlaps observer
  const handleObserver = () => {
    const observer = document.getElementById('observer');
    if (!observer) return;

    const sections = ['home', 'about', 'events', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && isOverlapping(observer, el)) {
        setActiveSection(id);
        return; // stop after first match
      }
    }
  };

  // navLinks remain hash paths that map to section IDs
  const navLinks = [
    { path: '#home', label: 'Home', icon: <Home size={20} /> },
    { path: '#about', label: 'About', icon: <Info size={20} /> },
    { path: '#events', label: 'Events', icon: <Calendar size={20} /> },
    { path: '#contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    const onScroll = () => handleObserver();
    window.addEventListener('scroll', onScroll, { passive: true });

    // initial check
    handleObserver();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-black"><img className="h-[1.5rem] w-[8rem]" src="logo_white_bg.png" alt="logo" /></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const sectionId = link.path.substring(1);
                const isActive =
                  (activeSection === sectionId)// also mark active when route is /about etc.

                return (
                  <button
                    key={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700 hover:text-red-500'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
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
        <div id="observer" className="bg-green-200">

        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-100 relative z-50">
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
      <div className="lg:hidden w-screen fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg rounded-t-2xl mx-4 mb-4">
          <div className="flex justify-around items-center py-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-200 ${
                  location.pathname === '/' && activeSection === link.path.substring(1)
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-700 hover:text-red-500'
                }`}
              >
                <div className='flex flex-col items-center'>
                  {link.icon}
                  {link.label}
                </div>
              </button>
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
    </>
  );
};

export default Navbar;
