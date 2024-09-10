import { Box, Flex, Show, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/sidebar/items-title-and-path';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import useAuth from '../../helper/hook/useAuth';

const ProtectedRoute: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const authed = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SIDEBAR_WIDTH = '70%';

  if (authed) {
    return (
      <Flex direction="column" height="100vh" fontSize="default">
        <Navbar onOpenDrawer={onOpen} />

        <Flex flex="1" overflow="hidden">
          <Show above="md">
            <Sidebar
              onCloseDrawer={onClose}
              isMobileSidebar={false}
              sidebarWidth="250px"
            />
          </Show>

          <MobileSidebar
            isOpenDrawer={isOpen}
            onCloseDrawer={onClose}
            isMobileSidebar={true}
            sidebarWidth={SIDEBAR_WIDTH}
          />

          <Box flex="1" px={[3, 4, 5]} py={3} bg="body" overflowY="auto">
            {children}
          </Box>
        </Flex>
      </Flex>
    );
  }

  return <Navigate to={LOGIN_PATH} replace={true} />;
};

export default ProtectedRoute;
