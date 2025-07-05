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
import BlogUpdateContainer from './pages/blog/BlogUpdateContainer';
import BlogPreviewContainer from './pages/blog/BlogPreviewContainer';

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
        <Route path="blog">
          <Route index element={<BlogContainer />} />
          <Route path="create" element={<BlogCreateContainer />} />
          <Route path="preview" element={<BlogPreviewContainer />} />
          <Route path="by-slug/:slug" element={<DisplayBlogContainer />} />
          <Route path="update/:slug" element={<BlogUpdateContainer />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
