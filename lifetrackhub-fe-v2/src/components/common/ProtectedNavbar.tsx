import { useState, useRef, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LOGIN_PATH,
  PROFILE_DETAILS_PATH,
} from '../../constants/title-and-paths';
import { logoutClearingLocalStorage } from '../../helper/local-storage/clear-local-storage';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { SiSvgtrace } from 'react-icons/si';
import { INavbar } from '../../types/common';
import useToggleTheme from '../../helper/hooks/useToggleTheme';

const ProtectedNavbar: React.FC<{ items: INavbar[] }> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useToggleTheme();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handleLogout = () => {
    logoutClearingLocalStorage();
    navigate(LOGIN_PATH, { replace: true });
  };

  const handleProfile = () => {
    navigate(PROFILE_DETAILS_PATH);
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    navigate(path);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-10 h-16 px-4 bg-gradient-to-r from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-sm border-b border-purple-200 dark:border-gray-700">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-3 py-1.5 shadow-md">
            <SiSvgtrace color="white" size={24} />
          </div>
          <span className="text-gray-900 dark:text-gray-100 italic font-bold text-lg tracking-wide hidden lg:inline-block">
            LifeTrackHub
          </span>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex">
            <button
              className="text-gray-700 dark:text-gray-200 p-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-gray-600"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 flex-1 justify-center dark:text-white">
          {items.map(item => (
            <div key={item.label} className="relative">
              {item.children ? (
                <>
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-gray-600 ${
                      openDropdown === item.label
                        ? 'bg-purple-100 dark:bg-gray-700'
                        : ''
                    }`}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    type="button"
                    aria-haspopup="false"
                    aria-expanded={openDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div
                      ref={el => {
                        dropdownRefs.current[item.label] = el;
                        return undefined;
                      }}
                      className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-purple-100 dark:border-gray-700 z-20 animate-fade-in"
                    >
                      {item.children.map(child => (
                        <button
                          key={child.label}
                          className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-purple-50 dark:hover:bg-gray-800 transition ${
                            location.pathname === child.path
                              ? 'bg-purple-100 dark:bg-gray-800 font-semibold'
                              : ''
                          }`}
                          onClick={() => handleNavClick(child.path)}
                        >
                          {child.icon && child.icon}
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-gray-600 ${
                    location.pathname === item?.path
                      ? 'bg-purple-100 dark:bg-gray-800 font-semibold'
                      : ''
                  }`}
                  onClick={() => handleNavClick(item.path)}
                >
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center">
          {/* Theme Toggle */}
          <button
            className="ml-3 p-2 rounded-full border border-purple-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          {/* Profile Dropdown */}
          <div className="ml-4 mt-1">
            <ProfileDropdown
              onLogout={handleLogout}
              onProfile={handleProfile}
            />
          </div>
        </div>
      </div>
      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 flex flex-col">
          <div className="bg-white dark:bg-gray-900 border-b border-purple-100 dark:border-gray-700 shadow-lg rounded-b-lg p-4 flex flex-col gap-2 animate-fade-in">
            {/* Mobile Hamburger */}
            <div className="md:hidden flex justify-end">
              <button
                className="text-gray-700 dark:text-gray-200 p-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-gray-600"
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
            {items.map(item => (
              <div key={item.label} className="mb-2">
                {item.children ? (
                  <>
                    <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-purple-200 mb-1">
                      <span>{item.label}</span>
                    </div>
                    <div className="pl-4 flex flex-col gap-1">
                      {item.children.map(child => (
                        <button
                          key={child.label}
                          className={`flex items-center gap-2 px-2 py-2 rounded-lg text-left text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-gray-700 transition ${
                            location.pathname === child.path
                              ? 'bg-purple-100 dark:bg-gray-700 font-semibold'
                              : ''
                          }`}
                          onClick={() => handleNavClick(child.path)}
                        >
                          {child.icon && child.icon}
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg text-left text-gray-900 dark:text-gray-50 hover:bg-purple-50 dark:hover:bg-gray-700 transition w-full ${
                      location.pathname === item?.path
                        ? 'bg-purple-100 dark:bg-gray-800 font-semibold'
                        : ''
                    }`}
                    onClick={() => handleNavClick(item.path)}
                  >
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default ProtectedNavbar;
