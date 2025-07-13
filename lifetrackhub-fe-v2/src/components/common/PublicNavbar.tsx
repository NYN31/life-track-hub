import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  LOGIN_PATH,
  PUBLIC_BLOG_PATH,
  REGISTRATION_PATH,
} from '../../constants/title-and-paths';
import { SiSvgtrace } from 'react-icons/si';

const PublicNavbar = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigateToLogin = () => {
    navigate(LOGIN_PATH, { replace: true });
  };

  const handleNavigateToRegistration = () => {
    navigate(REGISTRATION_PATH, { replace: true });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-md border-b border-purple-100 dark:border-gray-700 top-0 z-50 sticky">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Banner/Logo Section - Left */}
          <div className="flex gap-2 items-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-3 py-1.5 shadow-md">
              <SiSvgtrace color="white" size={24} />
            </div>
            <span className="text-gray-900 dark:text-gray-100 italic font-bold text-lg tracking-wide hidden md:inline-block">
              LifeTrackHub
            </span>
          </div>

          {/* Blogs + Sign In/Out Buttons + Hamburger - Right */}
          <div className="flex items-center space-x-4">
            {/* Blogs + Sign In/Out Buttons (Hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={handleNavigateToLogin}
                className="bg-white border border-purple-200 hover:bg-purple-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-sm"
              >
                Sign In
              </button>
              <button
                onClick={handleNavigateToRegistration}
                className="bg-gradient-to-r from-purple-400 to-purple-300 hover:from-purple-600 hover:to-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-sm"
              >
                Sign Up
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 p-2 rounded"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Visible when hamburger is clicked) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg mt-2 shadow-md border border-purple-100">
              <Link
                to={PUBLIC_BLOG_PATH}
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 hover:bg-purple-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>

              {/* Mobile Sign In/Out Buttons */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-purple-100">
                <button
                  className="bg-white border border-purple-200 hover:bg-purple-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300 w-full text-left shadow-sm"
                  onClick={() => {
                    handleNavigateToLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="bg-gradient-to-r from-purple-400 to-purple-300 hover:from-purple-600 hover:to-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 w-full text-left shadow-sm"
                  onClick={() => {
                    handleNavigateToRegistration();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
