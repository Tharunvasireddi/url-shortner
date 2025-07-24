import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Home, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setIsOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navLinks = isAuthenticated ? [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ] : [
    { to: "/", label: "Home", icon: Home },
    { to: "/Register", label: "Register", icon: UserPlus },
    { to: "/Login", label: "Login", icon: LogIn },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
    } text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className={`text-xl font-bold transition-colors duration-300 hover:scale-105 transform ${
              scrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              URL Shortener
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 transform ${
                  isActiveLink(to)
                    ? scrolled
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'bg-white/20 text-white shadow-lg'
                    : scrolled
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                <span className={`text-sm font-medium ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}>
                  Welcome, {user?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 transform ${
                    scrolled
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-red-500/20 text-white hover:bg-red-500/30'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`px-4 pb-4 space-y-2 ${
          scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-black/10'
        }`}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActiveLink(to)
                  ? scrolled
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'bg-white/20 text-white shadow-lg'
                  : scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/90 hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <div className="pt-2 mt-2 border-t border-white/20">
              <div className={`px-4 py-2 text-sm font-medium ${
                scrolled ? 'text-gray-700' : 'text-white/90'
              }`}>
                Welcome, {user?.name || 'User'}
              </div>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  scrolled
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-red-500/20 text-white hover:bg-red-500/30'
                }`}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
