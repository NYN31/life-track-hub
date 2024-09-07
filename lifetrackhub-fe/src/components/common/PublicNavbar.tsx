import { Flex, Spacer, Text } from '@chakra-ui/react';
import { BANNAR_NAME } from '../../constants/common-constants';
import OnclickButton from './button/OnclickButton';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/sidebar/items-title-and-path';

const PublicNavbar = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate(LOGIN_PATH);
  };

  const handleNavigateToRegistration = () => {
    navigate('/registration');
  };

  return (
    <Flex px={['.75rem', '1.5rem', '12rem', '16rem']} py=".8rem" bg="navbar.bg">
      <Flex justify="center" align="center">
        <Text fontWeight={800} textTransform="uppercase" color="icon">
          {BANNAR_NAME}
        </Text>
      </Flex>
      <Spacer />

      {location.pathname.includes(LOGIN_PATH) ? (
        <OnclickButton
          text="Sign Up"
          width="auto"
          cursor="pointer"
          isDisable={false}
          isLoading={false}
          action={handleNavigateToRegistration}
        />
      ) : (
        <OnclickButton
          text="Sign In"
          width="auto"
          cursor="pointer"
          isDisable={false}
          isLoading={false}
          action={handleNavigateToLogin}
        />
      )}
    </Flex>
  );
};

export default PublicNavbar;
