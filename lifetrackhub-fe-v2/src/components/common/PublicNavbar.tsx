import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  LOGIN_PATH,
  PUBLIC_BLOG_PATH,
  REGISTRATION_PATH,
} from '../../constants/title-and-paths';

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
    <nav className="bg-white shadow-sm top-0 border-b border-gray-300 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Banner/Logo Section - Left */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                LifeTrackHub
              </div>
            </div>
          </div>

          {/* Blogs + Sign In/Out Buttons + Hamburger - Right */}
          <div className="flex items-center space-x-4">
            {/* Blogs + Sign In/Out Buttons (Hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-3">
              {/* <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link
                    to={PUBLIC_BLOG_PATH}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-gray-100"
                  >
                    Blogs
                  </Link>
                </div>
              </div> */}

              <button
                onClick={handleNavigateToLogin}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Sign In
              </button>
              <button
                onClick={handleNavigateToRegistration}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Sign Up
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              <Link
                to={PUBLIC_BLOG_PATH}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 hover:bg-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>

              {/* Mobile Sign In/Out Buttons */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300 w-full text-left"
                  onClick={() => {
                    handleNavigateToLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 w-full text-left"
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
