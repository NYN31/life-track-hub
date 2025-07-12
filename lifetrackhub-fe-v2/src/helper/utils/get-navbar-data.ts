import { ADMIN_NAV_ITEMS } from '../../constants/navbar/admin-navbar-data';
import { USER_NAV_ITEMS } from '../../constants/navbar/user-navbar-data';

export const getNavbarDataByUserRole = () => {
  const userRole = localStorage.getItem('role');

  if (userRole === 'USER') return USER_NAV_ITEMS;

  return ADMIN_NAV_ITEMS;
};
