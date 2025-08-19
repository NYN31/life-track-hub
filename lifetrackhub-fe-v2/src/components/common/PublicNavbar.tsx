import { useNavigate } from 'react-router-dom';
import {
  LOGIN_PATH,
  REGISTRATION_PATH,
  PUBLIC_ABOUT_PATH,
} from '../../constants/title-and-paths';
import { SiSvgtrace } from 'react-icons/si';
import { FiMoon, FiSun } from 'react-icons/fi';
import useToggleTheme from '../../helper/hooks/useToggleTheme';

const PublicNavbar = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useToggleTheme();

  const handleNavigateToLogin = () => {
    navigate(LOGIN_PATH, { replace: true });
  };

  const handleNavigateToRegistration = () => {
    navigate(REGISTRATION_PATH, { replace: true });
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
            <div className="md:flex items-center space-x-3">
              {/* About Link */}
              <button
                onClick={() => navigate(PUBLIC_ABOUT_PATH)}
                className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                About
              </button>
              {/* Theme Toggle */}
              <button
                className="ml-3 p-2 rounded-full border border-purple-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
