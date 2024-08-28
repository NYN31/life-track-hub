import {
  Box,
  Button,
  Flex,
  Hide,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authApi';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar: React.FC<{ onOpenDrawer: () => void }> = ({ onOpenDrawer }) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const name =
    localStorage.getItem('name') !== 'undefined'
      ? localStorage.getItem('name')
      : localStorage.getItem('username');

  async function handleLogout() {
    await logout({}).unwrap();
    navigate('/login', { replace: true });
  }

  return (
    <Flex px="2rem" py=".8rem" bg="green.200">
      <Flex justify="center" align="center" gap="1rem">
        <Text fontWeight={800} color="">
          LIFETRACK - HUB
        </Text>
        <Hide above="md">
          <Box onClick={onOpenDrawer}>
            <RxHamburgerMenu size={24} cursor="pointer" />
          </Box>
        </Hide>
      </Flex>
      <Spacer />
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {name || 'Md Sajjad Hosen Noyon'}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
