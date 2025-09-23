import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import useAuth from '../../helper/hooks/useAuth';
import ProtectedNavbar from '../common/navbar/ProtectedNavbar';
import Footer from '../common/Footer';
import { getNavOrManubarDataBaseOnRole } from '../../helper/utils/get-nav-or-menu-bar-data';
import SuperAdminNavbar from '../common/navbar/SuperAdminNavbar';
import { useState } from 'react';
import { Sidebar } from '../common/Sidebar';
import SIDE_MENU_ITEMS from '../../constants/Sidebar/super-admin-sidebar-data';

const ProtectedRoute = () => {
  const authed = useAuth();
  const isSuperAdmin = localStorage.getItem('role') === 'SUPER_ADMIN';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  const data = getNavOrManubarDataBaseOnRole() as any[];

  if (!isSuperAdmin) {
    return (
      <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
        <ProtectedNavbar items={data} />

        <main className="flex-1 gap-2 flex justify-center overflow-y-auto m-1 lg:m-2 bg-white dark:bg-gray-900 scrollbar-hide">
          <div className="flex-1 mx-auto max-w-6xl lg:rounded-lg">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <SuperAdminNavbar sidebarOpen={sidebarOpen} onMenuOpenClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          items={SIDE_MENU_ITEMS}
          isOpen={sidebarOpen}
          onToggleSidebarClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col overflow-y-auto p-1 lg:p-2 bg-white dark:bg-gray-900 scrollbar-hide">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProtectedRoute;
