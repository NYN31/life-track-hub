import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useEffect } from 'react';
import Spinner from '../../components/common/Spinner';

const LoginContainer = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) navigate(-1);
  }, [navigate]);

  if (accessToken) return <Spinner />;
  return <LoginForm />;
};

export default LoginContainer;
