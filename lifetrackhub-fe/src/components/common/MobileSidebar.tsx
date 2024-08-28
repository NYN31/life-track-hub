import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';

const MobileSidebar: React.FC<{
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  isMobileSidebar: boolean;
}> = ({ isOpenDrawer, onCloseDrawer, isMobileSidebar }) => {
  return (
    <Drawer
      isOpen={isOpenDrawer}
      placement="left"
      onClose={onCloseDrawer}
    >
      <DrawerOverlay />
      <DrawerContent maxW="250px">
        <DrawerBody p="0px" m="0px" bg="#e2136e">
          <Sidebar
            onCloseDrawer={onCloseDrawer}
            isMobileSidebar={isMobileSidebar}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
