import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { SiSvgtrace } from 'react-icons/si';

type SidebarItem = {
  title: string;
  label?: string;
  path?: string;
  icon?: React.ReactNode;
  hasAccordion?: SidebarItem[];
};

const Sidebar: React.FC<{
  items: SidebarItem[];
  isOpen: boolean;
  onToggleSidebarClose: () => void;
}> = ({ items, isOpen, onToggleSidebarClose }) => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleAccordion = (key: string) => {
    setOpenItems(prev =>
      prev.includes(key) ? prev.filter(l => l !== key) : [...prev, key]
    );
  };

  const renderItems = (items: SidebarItem[], level = 0) => {
    return items.map(item => {
      const key = item.title;
      const isOpen = openItems.includes(key);
      const hasChildren = item.hasAccordion && item.hasAccordion.length > 0;
      const isActive = item.path && location.pathname === item.path;

      return (
        <div key={key} className={`ml-${level * 2} w-full`}>
          {/* Main menu or accordion trigger */}
          <div
            className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition-all duration-200
              ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md font-semibold'
                  : 'hover:bg-purple-50 text-gray-800'
              }
              ${hasChildren ? 'font-medium' : ''}
            `}
            onClick={() => (hasChildren ? toggleAccordion(item.title) : null)}
          >
            {/* Link if direct path, otherwise plain title */}
            {item.path ? (
              <Link to={item.path} className="flex items-center gap-2 flex-1">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                {item.icon}
                <span>{item.title}</span>
              </div>
            )}

            {hasChildren && (
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>

          {/* Recursive children render */}
          {hasChildren && (
            <div
              className={`transition-all overflow-hidden duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="ml-4 space-y-1 border-l-2 border-purple-100 pl-2">
                {renderItems(item.hasAccordion!, level + 1)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {/* Mobile toggle overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onToggleSidebarClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 border-r border-gray-200 bg-gradient-to-b from-white to-purple-50 text-gray-900 z-40 transform transition-transform duration-300 shadow-md
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between md:justify-center gap-1 mb-8">
            <div className="flex gap-2 items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-3 py-1.5 shadow-md">
                <SiSvgtrace color="white" size={24} />
              </div>
              <span className="text-gray-900 italic font-bold text-lg tracking-wide hidden md:inline-block">
                LifeTrackHub
              </span>
            </div>
            <button
              className="text-gray-600 md:hidden hover:bg-purple-100 p-1 rounded"
              onClick={onToggleSidebarClose}
            >
              {/* Close icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
            {renderItems(items)}
          </nav>

          {/* Divider and footer */}
          <div className="mt-8 border-t border-purple-200 pt-4 text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} LifeTrackHub
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
