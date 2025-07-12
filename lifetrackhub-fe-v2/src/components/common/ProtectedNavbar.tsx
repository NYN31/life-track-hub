import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import {
  LOGIN_PATH,
  PROFILE_DETAILS_PATH,
} from '../../constants/title-and-paths';
import { logoutClearingLocalStorage } from '../../helper/local-storage/clear-local-storage';

const ProtectedNavbar: React.FC<{
  onMenuOpenClick: () => void;
}> = ({ onMenuOpenClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutClearingLocalStorage();
    navigate(LOGIN_PATH, { replace: true });
  };

  const handleProfile = () => {
    navigate(PROFILE_DETAILS_PATH);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-30 h-16 px-4 md:px-8 flex items-center justify-between bg-gradient-to-r from-white to-purple-50 shadow-sm border-b border-purple-200">
      <button
        className="text-gray-700 md:hidden p-2 rounded hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200"
        onClick={onMenuOpenClick}
        aria-label="Open sidebar menu"
      >
        {/* Hamburger icon */}
        <svg className="w-7 h-7" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex-1 flex justify-end items-center">
        <ProfileDropdown onLogout={handleLogout} onProfile={handleProfile} />
      </div>
    </header>
  );
};

export default ProtectedNavbar;
