import UserSidebarData from '../../constants/Sidebar/user-sidebar-data';
import AdminSidebarData from '../../constants/Sidebar/admin-sidebar-data';

export const getSidebarDataByUserRole = () => {
  const userRole = localStorage.getItem('role');

  if (userRole === 'USER') return UserSidebarData;

  return AdminSidebarData;
};
