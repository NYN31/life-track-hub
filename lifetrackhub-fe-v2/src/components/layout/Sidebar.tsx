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
  onToggle: () => void;
}> = ({ items, isOpen, onToggle }) => {
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
        <div key={key} className={`ml-${level * 2}`}>
          {/* Main menu or accordion trigger */}
          <div
            className={`flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-200 rounded ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`}
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
              <div className="ml-4 space-y-1">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 border-r border-gray-200 bg-white text-gray-900 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:block`}
      >
        <div className="p-4">
          <div className="flex items-center justify-center gap-1 mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-3 py-1.5 shadow-md">
              <SiSvgtrace color="white"/>
            </div>
            <span className="text-gray-900 italic font-semibold text-md tracking-wide">
              LifeTrackHub
            </span>
          </div>
          <nav className="space-y-2">{renderItems(items)}</nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
