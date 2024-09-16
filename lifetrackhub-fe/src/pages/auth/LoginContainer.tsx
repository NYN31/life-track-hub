import { Navigate } from 'react-router-dom';
import Login from '../../components/auth/Login';
import { PROFILE_DETAILS_PATH } from '../../constants/sidebar/items-title-and-path';

const LoginContainer = () => {
  const isPresenceAccessToken = localStorage.getItem('accessToken');
  if (isPresenceAccessToken)
    return <Navigate to={PROFILE_DETAILS_PATH} replace={true} />;

  return <Login />;
};

export default LoginContainer;
