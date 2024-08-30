import { Route, Routes } from 'react-router-dom';
import Home from './pages/common/Home';
import * as pathname from './constants/sidebar/items-title-and-path';
import ProtectedRoute from './components/common/ProtectedRoute';
import About from './pages/common/About';
import Setting from './pages/common/Setting';
import Employee from './pages/employee/Employee';
import EmployeeDetails from './pages/employee/EmployeeDetails';

function App() {
  return (
    <Routes>
      <Route
        path={pathname.ROOT_PATH}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathname.HOME_PATH}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathname.ABOUT_PATH}
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathname.SETTING_PATH}
        element={
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathname.EMPLOYEE_LIST_PATH}
        element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathname.EMPLOYEE_DETIALS_PATH}
        element={
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
