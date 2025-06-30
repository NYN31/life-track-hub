import { useCallback, useEffect } from 'react';
import { getAllLocalStoreValue } from '../local-storage/get-local-store-values';
import { logoutClearingLocalStorage } from '../local-storage/clear-local-storage';

export default function useAuthCheck() {
  //const dispatch = useDispatch();

  const handleAuth = useCallback(() => {
    const { name, accessToken, email, role } = getAllLocalStoreValue();

    if (name && accessToken && email && role) {
      //   dispatch(
      //     userLoggedIn({
      //       name,
      //       accessToken,
      //       email,
      //       role,
      //       userId,
      //     })
      //   );
    } else {
      //dispatch(userLoggedOut());
      logoutClearingLocalStorage();
    }
  }, []); // [dispatch]

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);
}
