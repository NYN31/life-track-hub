import {
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Flex,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineProfile } from 'react-icons/ai';
import { colors } from '../../constants/extend-theme/colors';
import { LOGIN_PATH } from '../../constants/sidebar/items-title-and-path';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import useCustomToast from '../../helper/hook/CustomToast';
import {
  LOGOUT_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../constants/texts/title-and-message';
import { logoutClearingLocalStorage } from '../../helper/local-storage/logout';

const CommonMenu = () => {
  const ICON_SIZE = '20px';

  const { successToast } = useCustomToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = localStorage.getItem('name') || 'Unknown';

  async function handleLogout() {
    dispatch(userLoggedOut());
    successToast(SUCCESS_TITLE, LOGOUT_SUCCESS_MESSAGE);
    logoutClearingLocalStorage();
    navigate(LOGIN_PATH, { replace: true });
  }

  async function handleNavigateToProfile() {
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
        key={text}
        borderRadius={4}
        my={1}
        cursor="pointer"
        as="b"
        onClick={action}
        _hover={{
          bg: `${colors().menu.list_hover} !important`,
        }}
      >
        <Flex gap={2}>
          <Box color="icon">{icon}</Box> {text}
        </Flex>
      </MenuItem>
    );
  };

  return (
    <Menu>
      <MenuButton
        bg="menu.bg"
        mx={4}
        px={2}
        minWidth="250px"
        maxWidth="250px"
        as={Button}
        rightIcon={<ChevronDownIcon color="icon" />}
      >
        <Flex align="center" gap={2} fontSize="sm">
          <Avatar size="sm" name={name} bg="avatar.bg" color="avatar.text" />
          {getName(name)}
        </Flex>
      </MenuButton>
      <MenuList
        p={1}
        bg="menu.list_bg"
        border="1px"
        borderColor="menu.list_border"
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
