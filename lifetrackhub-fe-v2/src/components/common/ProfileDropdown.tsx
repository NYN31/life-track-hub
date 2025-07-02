import React, { useState, useRef, useEffect } from 'react';

const ProfileDropdown: React.FC<{
  onLogout: () => void;
  onProfile: () => void;
}> = ({ onLogout, onProfile }) => {
  const fullname = localStorage.getItem('name');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
      >
        <span className="text-gray-700 font-medium">{fullname}</span>
        <svg
          className="w-4 h-4 text-gray-500"
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
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <ul className="py-1">
            <li>
              <button
                onClick={() => {
                  onProfile();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
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
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
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
