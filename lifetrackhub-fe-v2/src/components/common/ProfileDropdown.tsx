import React, { useState, useRef, useEffect } from 'react';

const ProfileDropdown: React.FC<{
  onLogout: () => void;
  onProfile: () => void;
}> = ({ onLogout, onProfile }) => {
  const fullname = localStorage.getItem('name') || '';
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get initials for avatar
  const initials = fullname
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 bg-white border border-purple-200 hover:bg-purple-50 px-3 py-2 rounded-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-purple-200"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 text-white font-bold text-lg shadow-inner">
          {initials}
        </span>
        <span className="text-gray-700 font-medium max-w-[100px] truncate hidden sm:block">
          {fullname}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
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
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-20 border border-purple-200 animate-fade-in">
          <div className="px-4 py-3 border-b border-purple-50 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 text-white font-bold text-xl shadow-inner">
              {initials}
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 truncate">
                {fullname}
              </span>
              <span className="text-xs text-gray-400">My Account</span>
            </div>
          </div>
          <ul className="py-1">
            <li>
              <button
                onClick={() => {
                  onProfile();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 font-medium rounded-t-xl transition"
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
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 font-medium rounded-b-xl transition border-t border-purple-50"
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
