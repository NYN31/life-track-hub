import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authApi';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const Navbar = () => {
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
    <Flex>
      <Spacer />
      <Menu>
        <MenuButton
          mt="10px"
          mr="10px"
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {name}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
