import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import Home from '../../pages/common/Home';
import * as pathname from '../sidebar/items-title-and-path';
import PublicNavbar from '../../components/common/PublicNavbar';
import RegistrationContainer from '../../pages/auth/RegistrationContainer';
import LoginContainer from '../../pages/auth/LoginContainer';
import TodoList from '../../pages/todo/TodoList';

export const appRoutes = [
  {
    path: pathname.ROOT_PATH,
    element: (
      <ProtectedRoute>
        <Navigate to={pathname.LOGIN_PATH} />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.LOGIN_PATH,
    element: (
      <>
        <PublicNavbar />
        <LoginContainer />
      </>
    ),
  },
  {
    path: pathname.REGISTRATION_PATH,
    element: (
      <>
        <PublicNavbar />
        <RegistrationContainer />
      </>
    ),
  },
  {
    path: pathname.HOME_PATH,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.TODO_PATH,
    element: (
      <ProtectedRoute>
        <TodoList />
      </ProtectedRoute>
    ),
  },
];
