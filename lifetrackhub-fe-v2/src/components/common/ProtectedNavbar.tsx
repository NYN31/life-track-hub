import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import { logoutClearingLocalStorage } from '../../helper/local-storage/clear-local-storage';

const ProtectedNavbar: React.FC<{
  onMenuClick: () => void;
}> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutClearingLocalStorage();
    navigate(LOGIN_PATH, { replace: true });
  };

  const handleProfile = () => {
    console.log('Go to profile...');
    // Redirect to profile page
  };

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-300 bg-white shadow-sm z-10 h-14 px-6 flex items-center justify-between">
      <button className=" text-gray-600" onClick={onMenuClick}>
        {/* Hamburger icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex items-center space-x-4">
        <ProfileDropdown onLogout={handleLogout} onProfile={handleProfile} />
      </div>
    </header>
  );
};

export default ProtectedNavbar;
