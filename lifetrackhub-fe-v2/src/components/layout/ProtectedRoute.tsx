import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import useAuth from '../../helper/hooks/useAuth';
import Sidebar from './Sidebar';
import ProtectedNavbar from '../common/ProtectedNavbar';
import { useState } from 'react';
import { getSidebarDataByUserRole } from '../../helper/local-storage/get-sidebar-data';
import Footer from '../common/Footer';

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
        onToggleSidebarClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col h-full">
        <ProtectedNavbar onMenuOpenClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-white py-8 px-8 w-full">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProtectedRoute;
