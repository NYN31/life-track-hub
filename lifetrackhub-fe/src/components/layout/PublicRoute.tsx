import { Outlet } from 'react-router-dom';
import useAuth from '../../helper/hooks/useAuth';
import Footer from '../common/Footer';
import PublicNavbar from '../common/PublicNavbar';

const PublicRoute = () => {
  const authed = useAuth();

  if (authed) return;

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <PublicNavbar />
      <main className="flex-1 flex justify-center overflow-y-auto m-1 lg:m-2 bg-white dark:bg-gray-900 scrollbar-hide">
        <div className="flex-1 mx-auto max-w-6xl lg:rounded-lg">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicRoute;
