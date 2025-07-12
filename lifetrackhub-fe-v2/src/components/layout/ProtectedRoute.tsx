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
    <div className="h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <ProtectedNavbar items={navbarData} />
      <main className="flex-1 flex justify-center overflow-y-auto my-2">
        <div className="flex-1 items-center mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
