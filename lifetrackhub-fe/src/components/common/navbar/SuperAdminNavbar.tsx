import ProfileDropdown from '../ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import {
  BLOG_SELF_PATH,
  LOGIN_PATH,
  PROFILE_DETAILS_PATH,
} from '../../../constants/title-and-paths';
import { logoutClearingLocalStorage } from '../../../helper/local-storage/clear-local-storage';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { SiSvgtrace } from 'react-icons/si';
import useToggleTheme from '../../../helper/hooks/useToggleTheme';

const SuperAdminNavbar: React.FC<{
  sidebarOpen: boolean;
  onMenuOpenClick: () => void;
}> = ({ sidebarOpen, onMenuOpenClick }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useToggleTheme();

  const handleLogout = () => {
    logoutClearingLocalStorage();
    navigate(LOGIN_PATH, { replace: true });
  };

  const handleProfile = () => {
    navigate(PROFILE_DETAILS_PATH);
  };

  const handleNavigateToMyBlog = () => {
    navigate(BLOG_SELF_PATH + '/' + localStorage.getItem('email'));
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-10 h-16 px-4 bg-gray-50 dark:bg-gray-800 shadow-sm border-b border-purple-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-2 md:px-8">
        <div className="flex gap-2 items-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-3 py-1.5 shadow-md">
            <SiSvgtrace color="white" size={24} />
          </div>
          <span className="text-gray-900 dark:text-gray-100 italic font-bold text-lg tracking-wide hidden lg:inline-block">
            LifeTrackHub
          </span>
          <div className="md:hidden flex">
            <button
              className="text-gray-700 dark:text-gray-200 p-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-gray-600"
              onClick={onMenuOpenClick}
              aria-label="Open navigation menu"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="ml-3 p-2 rounded-full border border-purple-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <div className="ml-4 mt-1">
            <ProfileDropdown
              onLogout={handleLogout}
              onProfile={handleProfile}
              onNavigateToMyBlog={handleNavigateToMyBlog}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SuperAdminNavbar;
