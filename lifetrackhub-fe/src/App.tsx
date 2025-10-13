import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';
import useAuthCheck from './helper/hooks/useAuthCheck';
import FallbackSpinner from './components/common/FallbackSpinner';

// AUTH
const LoginContainer = React.lazy(() => import('./pages/auth/LoginContainer'));
const RegistrationContainer = React.lazy(
  () => import('./pages/auth/RegistrationContainer')
);
const UserVerifyFormContainer = React.lazy(
  () => import('./pages/auth/UserVerifyFormContainer')
);

// BLOG
const BlogContainer = React.lazy(() => import('./pages/blog/BlogContainer'));
const BlogCreateContainer = React.lazy(
  () => import('./pages/blog/BlogCreateContainer')
);
const DisplayBlogContainer = React.lazy(
  () => import('./pages/blog/DisplayBlogContainer')
);
const BlogUpdateContainer = React.lazy(
  () => import('./pages/blog/BlogUpdateContainer')
);
const BlogStatsContainer = React.lazy(
  () => import('./pages/blog/BlogStatsContainer')
);
const MyBlogsContainer = React.lazy(
  () => import('./pages/blog/MyBlogsContainer')
);

// USER
const ProfileUpdateContainer = React.lazy(
  () => import('./pages/user/ProfileUpdateContainer')
);
const UserProfileViewContainer = React.lazy(
  () => import('./pages/user/UserProfileViewContainer')
);

// SUPER ADMIN
const UserListContainer = React.lazy(
  () => import('./pages/user/super-admin/UserListContainer')
);
const UserDetailsContainer = React.lazy(
  () => import('./pages/user/super-admin/UserDetailsContainer')
);
const CreateUserContainer = React.lazy(
  () => import('./pages/user/super-admin/CreateUserContainer')
);

// OTHER
const FileContainer = React.lazy(() => import('./pages/file/FileContainer'));
const TodoContainer = React.lazy(() => import('./pages/todo/TodoContainer'));
const AboutContainer = React.lazy(() => import('./pages/about/AboutContainer'));

function App() {
  useAuthCheck();

  return (
    <Suspense fallback={<FallbackSpinner />}>
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
          <Route path="user-management">
            <Route path="users" element={<UserListContainer />} />
            <Route path="users/:email" element={<UserDetailsContainer />} />
            <Route path="create-user" element={<CreateUserContainer />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
