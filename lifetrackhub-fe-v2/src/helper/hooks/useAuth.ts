import { logoutClearingLocalStorage } from '../local-storage/clear-local-storage';
import { getAllLocalStoreValue } from '../local-storage/get-local-store-values';

export default function useAuth() {
  const { name, accessToken, email, role } = getAllLocalStoreValue();

  if (name && accessToken && email && role) {
    return true;
  } else {
    logoutClearingLocalStorage();
    return false;
  }
}
