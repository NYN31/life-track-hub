import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import useAuth from '../../helper/hooks/useAuth';
import ProtectedNavbar from '../common/ProtectedNavbar';
import { getNavbarDataByUserRole } from '../../helper/utils/get-navbar-data';
import Footer from '../common/Footer';

const ProtectedRoute = () => {
  const authed = useAuth();

  if (!authed) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  const navbarData = getNavbarDataByUserRole();

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <ProtectedNavbar items={navbarData} />
      <main className="flex-1 flex justify-center overflow-y-auto my-0 md:my-2 dark:bg-gray-900 scrollbar-hide">
        <div className="flex-1  mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
