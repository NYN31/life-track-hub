import * as pathname from './title-and-paths';
import PublicNavbar from '../components/common/PublicNavbar';
import LoginContainer from '../pages/auth/LoginContainer';
import RegistrationContainer from '../pages/auth/RegistrationContainer';

export const appRoutes = [
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
];
