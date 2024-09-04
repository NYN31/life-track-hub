import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import About from '../../pages/common/About';
import Home from '../../pages/common/Home';
import Setting from '../../pages/common/Setting';
import Employee from '../../pages/employee/Employee';
import EmployeeDetails from '../../pages/employee/EmployeeDetails';
import * as pathname from '../sidebar/items-title-and-path';

export const appRoutes = [
  {
    path: pathname.ROOT_PATH,
    element: (
      <ProtectedRoute>
        <Navigate to={pathname.HOME_PATH} />
      </ProtectedRoute>
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
    path: pathname.ABOUT_PATH,
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.SETTING_PATH,
    element: (
      <ProtectedRoute>
        <Setting />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.EMPLOYEE_LIST_PATH,
    element: (
      <ProtectedRoute>
        <Employee />
      </ProtectedRoute>
    ),
  },
  {
    path: pathname.EMPLOYEE_DETIALS_PATH,
    element: (
      <ProtectedRoute>
        <EmployeeDetails />
      </ProtectedRoute>
    ),
  },
];