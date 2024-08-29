import {
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Flex,
  Text,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authApi';
import { ChevronDownIcon } from '@chakra-ui/icons';

const menuItemCss = {
  bg: '#f2f2f2',
  color: '#e2136e',
  cursor: 'pointer',
};

const CommonMenu = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  // const name =
  //   localStorage.getItem('name') !== 'undefined'
  //     ? localStorage.getItem('name')
  //     : localStorage.getItem('username');
  const name = 'Md Sajjad HosenNoyon-Noyon Noyon';

  async function handleLogout() {
    //await logout({}).unwrap();
    navigate('/login', { replace: true });
  }

  async function handleNavigateToProfile() {
    console.log('Profile page');
    navigate('/profile');
  }

  return (
    <Menu>
      <MenuButton
        mx="1rem"
        px=".5rem"
        minWidth="250px"
        maxWidth="250px"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <Flex align="center" justify="center" gap=".4rem">
          <Box>
            <Avatar size="sm" name={name} bg="#e2136e" color="#FFF" />
          </Box>
          <Text noOfLines={1} overflowWrap="break-word">
            {name}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem {...menuItemCss} as="b" onClick={handleNavigateToProfile}>
          Profile
        </MenuItem>
        <MenuItem {...menuItemCss} as="b" onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CommonMenu;
