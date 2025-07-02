import { useCallback, useEffect } from 'react';
import { getAllLocalStoreValue } from '../local-storage/get-local-store-values';
import { logoutClearingLocalStorage } from '../local-storage/clear-local-storage';
import { userLoggedIn, userLoggedOut } from '../../features/auth/authSlice';
import { blogContentDraft } from '../../features/blog/blogSlice';
import { useDispatch } from 'react-redux';

export default function useAuthCheck() {
  const dispatch = useDispatch();

  const handleAuth = useCallback(() => {
    const { name, accessToken, email, role, draftBlog } =
      getAllLocalStoreValue();

    if (accessToken) {
      dispatch(
        userLoggedIn({
          name,
          accessToken,
          email,
          role,
        })
      );
      dispatch(blogContentDraft(JSON.parse(draftBlog)));
    } else {
      dispatch(userLoggedOut());
      logoutClearingLocalStorage();
    }
  }, []); // [dispatch]

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);
}
