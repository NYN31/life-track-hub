import { Navigate, Route, Routes } from 'react-router-dom';
import * as pathname from './constants/title-and-paths';
import PublicNavbar from './components/common/PublicNavbar';
import LoginContainer from './pages/auth/LoginContainer';
import RegistrationContainer from './pages/auth/RegistrationContainer';
import BlogContainer from './pages/blog/BlogContainer';
import BlogEditorContainer from './pages/blog/BlogEditorContainer';

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

      <Route path={pathname.BLOG_PATH}>
        <Route
          index
          path=""
          element={
            <>
              <PublicNavbar />
              <BlogContainer />
            </>
          }
        />
        <Route
          path={pathname.BLOG_EDIT_PATH}
          element={
            <>
              <PublicNavbar />
              <BlogEditorContainer />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
