import { Navigate, Route, Routes } from 'react-router-dom';
import * as pathname from './constants/title-and-paths';
import PublicNavbar from './components/common/PublicNavbar';
import LoginContainer from './pages/auth/LoginContainer';
import RegistrationContainer from './pages/auth/RegistrationContainer';
import BlogContainer from './pages/blog/BlogContainer';
import BlogEditorContainer from './pages/blog/BlogEditorContainer';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
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

      <Route path="" element={<ProtectedRoute />}>
        <Route path={pathname.BLOG_PATH}>
          <Route index element={<BlogContainer />} />
          <Route
            path={pathname.BLOG_CREATED_PATH}
            element={<BlogEditorContainer />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
