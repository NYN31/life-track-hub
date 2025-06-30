import { getAllLocalStoreValue } from '../local-storage/get-local-store-values';
import { logoutClearingLocalStorage } from '../local-storage/logout';

export default function useAuth() {
  const { name, accessToken, email, role, userId } = getAllLocalStoreValue();

  if (name && accessToken && email && role && userId) {
    return true;
  } else {
    logoutClearingLocalStorage();
    return false;
  }
}