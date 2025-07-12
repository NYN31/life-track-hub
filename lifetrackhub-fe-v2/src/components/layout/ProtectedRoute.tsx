import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import useAuth from '../../helper/hooks/useAuth';
import ProtectedNavbar from '../common/ProtectedNavbar';
import { getNavbarDataByUserRole } from '../../helper/utils/get-navbar-data';

const ProtectedRoute = () => {
  const authed = useAuth();

  if (!authed) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  const navbarData = getNavbarDataByUserRole();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <ProtectedNavbar items={navbarData} />
      <main className="flex-1 flex justify-center overflow-y-auto my-4">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProtectedRoute;
