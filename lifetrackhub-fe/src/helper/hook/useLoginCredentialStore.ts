import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCustomToast from './CustomToast';
import { JWTDecoder, LoginResponse } from '../../types/auth';
import { jwtDecode } from 'jwt-decode';
import { userLoggedIn } from '../../features/auth/authSlice';
import {
  LOGIN_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../constants/texts/title-and-message';
import { PROFILE_DETAILS_PATH } from '../../constants/sidebar/items-title-and-path';

const useLoginCredentialStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successToast } = useCustomToast();

  return (loginResponse: LoginResponse) => {
    const decodedJwt: JWTDecoder = jwtDecode(loginResponse.accessToken);
    const { name, accessToken } = loginResponse;
    const { sub, role, userId } = decodedJwt;

    localStorage.setItem('name', name);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', sub);
    localStorage.setItem('role', role[0]);
    localStorage.setItem('userId', userId.toString());

    dispatch(
      userLoggedIn({ ...loginResponse, ...decodedJwt, email: decodedJwt.sub })
    );
    successToast(SUCCESS_TITLE, LOGIN_SUCCESS_MESSAGE);
    navigate(PROFILE_DETAILS_PATH, { replace: true });
  };
};

export default useLoginCredentialStore;
