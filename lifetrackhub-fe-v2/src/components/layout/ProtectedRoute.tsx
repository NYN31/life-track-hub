import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import useAuth from '../../helper/hooks/useAuth';
import Sidebar from './Sidebar';
import ProtectedNavbar from '../common/ProtectedNavbar';
import SidebarData from '../../constants/Sidebar/user-sidebar-data';
import { useState } from 'react';

const ProtectedRoute = () => {
  const authed = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        items={SidebarData}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col h-full">
        <ProtectedNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="pt-20 pb-4 px-4 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
