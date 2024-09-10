import { getAllLocalStoreValue } from '../local-storage/get-local-store-values';
import { logoutClearingLocalStorage } from '../local-storage/logout';

export default function useAuth() {
  //const auth = useSelector((state: any) => state.auth);
  const { name, accessToken, email, role, userId } = getAllLocalStoreValue();
  console.log('In useAuth() hook');
  if (name && accessToken && email && role && userId) {
    return true;
  } else {
    console.log('Logout');
    logoutClearingLocalStorage();
    return false;
  }
}
