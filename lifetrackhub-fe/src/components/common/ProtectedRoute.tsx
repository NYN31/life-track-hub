import { Box, Flex, Show, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/sidebar/items-title-and-path';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

const ProtectedRoute: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [authed] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (authed) {
    return (
      <Flex direction="column" height="100vh">
        <Navbar onOpenDrawer={onOpen} />
        <Flex flex="1" overflow="hidden">
          <Show above="md">
            <Sidebar onCloseDrawer={onClose} isMobileSidebar={false} />
          </Show>

          <MobileSidebar
            isOpenDrawer={isOpen}
            onCloseDrawer={onClose}
            isMobileSidebar={true}
          />

          <Box flex="1" p="6" bg="gray.100" overflowY="auto">
            {children}
          </Box>
        </Flex>
      </Flex>
    );
  }

  return <Navigate to={LOGIN_PATH} replace={true} />;
};

export default ProtectedRoute;
