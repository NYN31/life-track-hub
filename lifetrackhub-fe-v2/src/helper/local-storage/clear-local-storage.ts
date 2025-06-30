export const logoutClearingLocalStorage = () => {
  localStorage.removeItem('name');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
};