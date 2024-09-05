import { Navigate } from 'react-router-dom';
import { HOME_PATH } from '../../constants/sidebar/items-title-and-path';
import Login from '../../components/auth/Login';

const AuthContainer = () => {
  const isPresenceAccessToken = localStorage.getItem('accessToken');
  if (isPresenceAccessToken) return <Navigate to={HOME_PATH} />;

  return <Login />;
};

export default AuthContainer;
