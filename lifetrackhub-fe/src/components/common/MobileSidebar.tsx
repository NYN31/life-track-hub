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
  sidebarWidth: string;
}> = ({ isOpenDrawer, onCloseDrawer, isMobileSidebar, sidebarWidth }) => {
  return (
    <Drawer isOpen={isOpenDrawer} placement="left" onClose={onCloseDrawer}>
      <DrawerOverlay />
      <DrawerContent minW={sidebarWidth}>
        <DrawerBody p="0px" m="0px" bg="#e2136e">
          <Sidebar
            onCloseDrawer={onCloseDrawer}
            isMobileSidebar={isMobileSidebar}
            sidebarWidth={sidebarWidth}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
