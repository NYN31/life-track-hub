import { ADMIN_NAV_ITEMS } from '../../constants/navbar/admin-navbar-data';
import { USER_NAV_ITEMS } from '../../constants/navbar/user-navbar-data';
import SIDE_MENU_ITEMS from '../../constants/Sidebar/super-admin-sidebar-data';

export const getNavOrManubarDataBaseOnRole = () => {
  const userRole = localStorage.getItem('role');

  switch (userRole) {
    case 'SUPER_ADMIN':
      return SIDE_MENU_ITEMS;
    case 'ADMIN':
      return ADMIN_NAV_ITEMS;
    case 'USER':
      return USER_NAV_ITEMS;
    default:
      return USER_NAV_ITEMS;
  }
};
