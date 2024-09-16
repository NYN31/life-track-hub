import { Navigate } from 'react-router-dom';
import { PROFILE_DETAILS_PATH } from '../../constants/sidebar/items-title-and-path';
import Registration from '../../components/auth/Registration';

const RegistrationContainer = () => {
  const isPresenceAccessToken = localStorage.getItem('accessToken');
  if (isPresenceAccessToken) return <Navigate to={PROFILE_DETAILS_PATH} />;

  return <Registration />;
};

export default RegistrationContainer;
