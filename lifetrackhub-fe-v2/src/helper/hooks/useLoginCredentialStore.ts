import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BLOG_PATH } from '../../constants/title-and-paths';
import { IJWTDecoder, ILoginResponse } from '../../types/auth';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../features/auth/authSlice';

const useLoginCredentialStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { successToast } = useCustomToast();

  return (loginResponse: ILoginResponse) => {
    const decodedJwt: IJWTDecoder = jwtDecode(loginResponse?.accessToken);
    const { name, accessToken } = loginResponse;
    const { sub, role } = decodedJwt;

    localStorage.setItem('name', name);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', sub);
    localStorage.setItem('role', role[0]);

    dispatch(
      userLoggedIn({ ...loginResponse, ...decodedJwt, email: decodedJwt.sub })
    );
    //successToast(SUCCESS_TITLE, LOGIN_SUCCESS_MESSAGE);
    navigate(BLOG_PATH, { replace: true });
  };
};

export default useLoginCredentialStore;
