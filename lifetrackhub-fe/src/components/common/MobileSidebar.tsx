import React from 'react';

import Sidebar from './Sidebar';
import { DrawerBackdrop, DrawerBody, DrawerContent, DrawerRoot } from '../ui/drawer';

const MobileSidebar: React.FC<{
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  isMobileSidebar: boolean;
  sidebarWidth: string;
}> = ({ isOpenDrawer, onCloseDrawer, isMobileSidebar, sidebarWidth }) => {
  return (
    <DrawerRoot open={isOpenDrawer} placement="start" onOpenChange={onCloseDrawer}>
      <DrawerBackdrop />
      <DrawerContent minW={sidebarWidth}>
        <DrawerBody p="0px" m="0px">
          <Sidebar
            onCloseDrawer={onCloseDrawer}
            isMobileSidebar={isMobileSidebar}
            sidebarWidth={sidebarWidth}
          />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default MobileSidebar;
