import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import * as pathname from '../sidebar/items-title-and-path';
import PublicNavbar from '../../components/common/PublicNavbar';
import RegistrationContainer from '../../pages/auth/RegistrationContainer';
import LoginContainer from '../../pages/auth/LoginContainer';
import TodoContainer from '../../pages/todo/TodoContainer';
import SettingContainer from '../../pages/setting/SettingContainer';
import TodoCreateUpdateContainer from '../../pages/todo/TodoCreateUpdateContainer';
import UserProfileContainer from '../../pages/user/UserProfileContainer';
import UpdateProfileContainer from '../../pages/user/UpdateProfileContainer';

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
    path: pathname.TODO_LIST_PATH,
    element: (
      <ProtectedRoute>
        <TodoContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.TODO_CREATE_PATH,
    element: (
      <ProtectedRoute>
        <TodoCreateUpdateContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: `${pathname.TODO_UPDATE_PATH}/:todoId`,
    element: (
      <ProtectedRoute>
        <TodoCreateUpdateContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.SETTING_PATH,
    element: (
      <ProtectedRoute>
        <SettingContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.PROFILE_DETAILS_PATH,
    element: (
      <ProtectedRoute>
        <UserProfileContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.PROFILE_EDIT_PATH,
    element: (
      <ProtectedRoute>
        <UpdateProfileContainer />
      </ProtectedRoute>
    ),
  },
];
