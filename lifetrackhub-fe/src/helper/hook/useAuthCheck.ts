import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from '../../features/auth/authSlice';
import { getAllLocalStoreValue } from '../local-storage/get-local-store-values';
import { logoutClearingLocalStorage } from '../local-storage/logout';

export default function useAuthCheck() {
  const dispatch = useDispatch();

  const handleAuth = useCallback(() => {
    const { name, accessToken, email, role, userId } = getAllLocalStoreValue();
    console.log('In useAuthCheck() hook!');

    if (name && accessToken && email && role && userId) {
      dispatch(
        userLoggedIn({
          name,
          accessToken,
          email,
          role,
          userId,
        })
      );
    } else {
      dispatch(userLoggedOut());
      logoutClearingLocalStorage();
    }
  }, [dispatch]);

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);
}
