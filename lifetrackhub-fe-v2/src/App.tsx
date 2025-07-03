import { Navigate, Route, Routes } from 'react-router-dom';
import * as pathname from './constants/title-and-paths';
import PublicNavbar from './components/common/PublicNavbar';
import LoginContainer from './pages/auth/LoginContainer';
import RegistrationContainer from './pages/auth/RegistrationContainer';
import BlogContainer from './pages/blog/BlogContainer';
import BlogCreateContainer from './pages/blog/BlogCreateContainer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DisplayBlogContainer from './pages/blog/DisplayBlogContainer';
import useAuthCheck from './helper/hooks/useAuthCheck';

function App() {
  useAuthCheck();

  return (
    <Routes>
      <Route
        path={pathname.ROOT_PATH}
        element={<Navigate to={pathname.LOGIN_PATH} />}
      />
      <Route
        index
        path={pathname.LOGIN_PATH}
        element={
          <>
            <PublicNavbar />
            <LoginContainer />
          </>
        }
      />
      <Route
        index
        path={pathname.REGISTRATION_PATH}
        element={
          <>
            <PublicNavbar />
            <RegistrationContainer />
          </>
        }
      />
      <Route
        index
        path={pathname.PUBLIC_BLOG_PATH}
        element={
          <div className="flex flex-col gap-4 mb-6">
            <PublicNavbar />
            <BlogContainer />
          </div>
        }
      />
      <Route
        index
        path={pathname.PUBLIC_BLOG_DETAILS_PATH}
        element={
          <div className="flex flex-col gap-4 mb-6">
            <PublicNavbar />
            <DisplayBlogContainer />
          </div>
        }
      />

      <Route path="" element={<ProtectedRoute />}>
        <Route path={pathname.BLOG_PATH}>
          <Route index element={<BlogContainer />} />
          <Route
            path={pathname.BLOG_CREATED_PATH}
            element={<BlogCreateContainer />}
          />
          <Route
            path={pathname.BLOG_DETAILS_PATH}
            element={<DisplayBlogContainer />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
