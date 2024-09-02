import {
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authApi';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineProfile } from 'react-icons/ai';

const CommonMenu = () => {
  const ICON_SIZE = '20px';

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  // const name =
  //   localStorage.getItem('name') !== 'undefined'
  //     ? localStorage.getItem('name')
  //     : localStorage.getItem('username');
  const name = 'Md Sajjad Hosen Noyon';

  async function handleLogout() {
    //await logout({}).unwrap();
    navigate('/login', { replace: true });
  }

  async function handleNavigateToProfile() {
    console.log('Profile page');
    navigate('/profile');
  }

  const menuItemsData = [
    {
      title: 'Profile',
      action: handleNavigateToProfile,
      icon: <AiOutlineProfile size={ICON_SIZE} />,
    },
    {
      title: 'Logout',
      action: handleLogout,
      icon: <FiLogOut size={ICON_SIZE} />,
    },
  ];

  const getName = (name: string) => {
    const MAX_LENGTH_OF_NAME = 21;
    if (name.length > MAX_LENGTH_OF_NAME) {
      return name.slice(0, MAX_LENGTH_OF_NAME) + '...';
    }
    return name;
  };

  const menuItem = (text: string, action: () => void, icon: JSX.Element) => {
    return (
      <MenuItem
        borderRadius={4}
        my={1}
        cursor="pointer"
        as="b"
        onClick={action}
        bg="gray.200"
        color="gray.900"
      >
        <Flex gap={2}>
          {icon} {text}
        </Flex>
      </MenuItem>
    );
  };

  return (
    <Menu>
      <MenuButton
        bg="gray.300"
        mx={4}
        px={2}
        minWidth="250px"
        maxWidth="250px"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <Flex align="center" gap={2} fontSize="sm">
          <Avatar size="sm" name={name} bg="black" color="white" />
          {getName(name)}
        </Flex>
      </MenuButton>
      <MenuList
        p={1}
        bg="gray.200"
        border="1px"
        borderColor="gray.default"
        fontSize="sm"
      >
        {menuItemsData.map(item =>
          menuItem(item.title, item.action, item.icon)
        )}
      </MenuList>
    </Menu>
  );
};

export default CommonMenu;
