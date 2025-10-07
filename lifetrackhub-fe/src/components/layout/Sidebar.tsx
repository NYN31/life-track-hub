import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onToggleSidebarClose: () => void;
}

export const Sidebar = ({
  items,
  isOpen,
  onToggleSidebarClose,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onToggleSidebarClose}
        />
        <div className="absolute left-0 top-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">LifeTrackHub</h2>
            <button onClick={onToggleSidebarClose}>
              <X className="w-5 h-5 text-purple-500" />
            </button>
          </div>
          <SidebarList items={items} depth={0} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-2 overflow-y-auto">
        <SidebarList items={items} depth={0} />
      </aside>
    </>
  );
};

const SidebarList = ({
  items,
  depth,
}: {
  items: SidebarItem[];
  depth: number;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ul className="space-y-2 m-0 p-0">
      {items.map((item, idx) => (
        <ul
          key={idx}
          className={`ml-4 mt-1 space-y-1 ${
            depth > 0 && 'border-l-2'
          } border-purple-300 dark:border-purple-400 pl-1`}
        >
          <SidebarItemComponent
            item={item}
            isOpen={activeIndex === idx}
            onToggle={() => setActiveIndex(activeIndex === idx ? null : idx)}
            depth={depth}
          />
        </ul>
      ))}
    </ul>
  );
};

const SidebarItemComponent = ({
  item,
  isOpen,
  onToggle,
  depth,
}: {
  item: SidebarItem;
  isOpen: boolean;
  onToggle: () => void;
  depth: number;
}) => {
  if (!item) return null;

  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path && location.pathname === item.path;

  return (
    <li className="list-none">
      {item.path ? (
        <Link
          to={item.path}
          className={`flex items-center justify-between px-2 py-2 rounded-md transition ${
            isActive
              ? 'bg-purple-600 text-white font-medium'
              : 'text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-gray-50 dark:hover:bg-purple-600'
          }`}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.title}
          </span>
          {hasChildren && (
            <button
              onClick={e => {
                e.preventDefault();
                onToggle();
              }}
              className="ml-2"
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-purple-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-purple-600" />
              )}
            </button>
          )}
        </Link>
      ) : (
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.title}
          </span>
          {hasChildren &&
            (isOpen ? (
              <ChevronDown className="w-4 h-4 text-purple-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-purple-600" />
            ))}
        </button>
      )}

      {/* Recursive Children */}
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <SidebarList items={item.children!} depth={depth + 1} />
        </div>
      )}
    </li>
  );
};
