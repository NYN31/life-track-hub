import { useDispatch } from 'react-redux';
import { logoutClearingLocalStorage } from '../local-storage/clear-local-storage';
import { getAllLocalStoreValue } from '../local-storage/get-local-store-values';
import { userLoggedIn, userLoggedOut } from '../../features/auth/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();

  const { name, accessToken, email, role } = getAllLocalStoreValue();

  if (name && accessToken && email && role) {
    dispatch(userLoggedIn({ name, accessToken, email, role }));
    return true;
  } else {
    logoutClearingLocalStorage();
    dispatch(userLoggedOut());
    return false;
  }
}
