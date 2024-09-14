import { Flex, Spacer, Text } from '@chakra-ui/react';
import { BANNAR_NAME } from '../../constants/common-constants';
import OnclickButton from './button/OnclickButton';
import { useNavigate } from 'react-router-dom';
import {
  LOGIN_PATH,
  REGISTRATION_PATH,
} from '../../constants/sidebar/items-title-and-path';

const PublicNavbar = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate(LOGIN_PATH);
  };

  const handleNavigateToRegistration = () => {
    navigate(REGISTRATION_PATH);
  };

  return (
    <Flex px={['.75rem', '1.5rem', '12rem', '16rem']} py=".8rem" bg="navbar.bg">
      <Flex justify="center" align="center">
        <Text fontWeight={800} textTransform="uppercase" color="icon">
          {BANNAR_NAME}
        </Text>
      </Flex>
      <Spacer />

      <Flex direction="row" gap={4}>
        <OnclickButton
          color="#D69E2E"
          text="Sign In"
          width="auto"
          cursor="pointer"
          isDisable={false}
          isLoading={false}
          action={handleNavigateToLogin}
        />
        <OnclickButton
          color="btn.bg"
          text="Sign Up"
          width="auto"
          cursor="pointer"
          isDisable={false}
          isLoading={false}
          action={handleNavigateToRegistration}
        />
      </Flex>
    </Flex>
  );
};

export default PublicNavbar;
