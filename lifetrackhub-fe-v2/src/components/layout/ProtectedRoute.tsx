import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import useAuth from '../../helper/hooks/useAuth';
import Sidebar from './Sidebar';
import ProtectedNavbar from '../common/ProtectedNavbar';
import { useState } from 'react';
import { getSidebarDataByUserRole } from '../../helper/local-storage/get-sidebar-data';

const ProtectedRoute = () => {
  const authed = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  const sidebarData = getSidebarDataByUserRole();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        items={sidebarData}
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
