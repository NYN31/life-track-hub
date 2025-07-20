import React, { useState, useRef } from 'react';
import { useOnClickOutside } from '../../helper/hooks/useOnClickOutside';

const ProfileDropdown: React.FC<{
  onLogout: () => void;
  onProfile: () => void;
}> = ({ onLogout, onProfile }) => {
  const fullname = localStorage.getItem('name') || '';
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => {
    setOpen(false);
  });

  // Get initials for avatar
  const initials = fullname
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 bg-white border border-purple-200 dark:border-gray-600 hover:bg-purple-50 px-3 py-2 rounded-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-purple-200 bg-gradient-to-r dark:from-gray-900 dark:to-gray-800"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 text-white font-bold text-lg shadow-inner">
          {initials}
        </span>
        <span className="text-gray-700 dark:text-gray-50 font-medium max-w-[100px] truncate hidden sm:block">
          {fullname}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-50 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
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

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20 border border-purple-200  dark:border-gray-700 animate-fade-in">
          <div className="px-4 py-3 border-b border-purple-50 dark:border-gray-600 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 text-white font-bold text-xl shadow-inner">
              {initials}
            </span>
            <div className="flex flex-col truncate">
              <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                {fullname}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-200">
                My Account
              </span>
            </div>
          </div>
          <ul className="">
            <li>
              <button
                onClick={() => {
                  onProfile();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-purple-50 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium transition"
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-gray-500 text-red-500 dark:text-red-400 font-medium transition border-t border-purple-50 dark:border-gray-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
