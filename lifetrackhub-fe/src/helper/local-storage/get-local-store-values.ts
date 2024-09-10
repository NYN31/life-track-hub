export const getAllLocalStoreValue = () => {
  if (!localStorage.getItem('accessToken')) return {};

  return {
    name: localStorage.getItem('name'),
    accessToken: localStorage.getItem('accessToken'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId'),
  };
};
