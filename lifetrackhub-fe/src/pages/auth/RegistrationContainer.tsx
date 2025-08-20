import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { useEffect } from 'react';
import Spinner from '../../components/common/Spinner';

const RegistrationContainer = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) navigate(-1);
  }, [navigate]);

  if (accessToken) return <Spinner />;
  return <RegisterForm />;
};

export default RegistrationContainer;
