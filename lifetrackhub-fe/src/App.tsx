import { Navigate, Route, Routes } from 'react-router-dom';
import LoginContainer from './pages/auth/LoginContainer';
import RegistrationContainer from './pages/auth/RegistrationContainer';
import BlogContainer from './pages/blog/BlogContainer';
import BlogCreateContainer from './pages/blog/BlogCreateContainer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DisplayBlogContainer from './pages/blog/DisplayBlogContainer';
import useAuthCheck from './helper/hooks/useAuthCheck';
import BlogUpdateContainer from './pages/blog/BlogUpdateContainer';
import BlogStatsContainer from './pages/blog/BlogStatsContainer';
import ProfileUpdateContainer from './pages/user/ProfileUpdateContainer';
import UserProfileViewContainer from './pages/user/UserProfileViewContainer';
import FileContainer from './pages/file/FileContainer';
import TodoContainer from './pages/todo/TodoContainer';
import AboutContainer from './pages/about/AboutContainer';
import PublicRoute from './components/layout/PublicRoute';
import MyBlogsContainer from './pages/blog/MyBlogsContainer';
import UserVerifyFormContainer from './pages/auth/UserVerifyFormContainer';

function App() {
  useAuthCheck();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/sign-in" />} />

      <Route path="auth" element={<PublicRoute />}>
        <Route path="sign-in" element={<LoginContainer />} />
        <Route path="sign-up" element={<RegistrationContainer />} />
        <Route path="user/verify" element={<UserVerifyFormContainer />} />
      </Route>

      <Route path="public" element={<PublicRoute />}>
        <Route path="about" element={<AboutContainer />} />
        <Route path="blog">
          <Route index element={<BlogContainer />} />
          <Route path="by-slug/:slug" element={<DisplayBlogContainer />} />
        </Route>
      </Route>

      <Route path="" element={<ProtectedRoute />}>
        <Route path="about" element={<AboutContainer />} />
        <Route path="blog">
          <Route index element={<BlogContainer />} />
          <Route path="create" element={<BlogCreateContainer />} />
          <Route path="by-slug/:slug" element={<DisplayBlogContainer />} />
          <Route path="update/:slug" element={<BlogUpdateContainer />} />
          <Route path="stats" element={<BlogStatsContainer />} />
          <Route path="self/:email" element={<MyBlogsContainer />} />
        </Route>
        <Route path="user">
          <Route path="profile/update" element={<ProfileUpdateContainer />} />
          <Route path="profile" element={<UserProfileViewContainer />} />
        </Route>
        <Route path="files">
          <Route index element={<FileContainer />} />
        </Route>
        <Route path="todo">
          <Route index element={<TodoContainer />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
