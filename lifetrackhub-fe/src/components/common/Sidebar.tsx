import { Flex, Stack, Box, Spacer, List } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SidebarData from '../../constants/sidebar/sidebar-items';
import { IoClose } from 'react-icons/io5';
import CommonMenu from './CommonMenu';
import { colors } from '../../constants/extend-theme/colors';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '../ui/accordion';
import { Button } from '../ui/button';

const Sidebar: React.FC<{
  onCloseDrawer: () => void;
  isMobileSidebar: boolean;
  sidebarWidth: string;
}> = ({ onCloseDrawer, isMobileSidebar }) => {
  const navigate = useNavigate();

  function handleNavigation(path: string) {
    navigate(path);
  }

  const getSidebarListItem = (
    path: string,
    icon: JSX.Element,
    title: string,
    label: string
  ) => {
    return (
      <List.Item
        m={1}
        py={1}
        px={1}
        cursor="pointer"
        h={10}
        borderRadius="4px"
        color={
          label.toLowerCase() === location.pathname.toLowerCase()
            ? 'sidebar.hover_text'
            : 'sidebar.text'
        }
        w={56}
        bg={
          label.toLowerCase() === location.pathname.toLowerCase()
            ? 'sidebar.hover_bg'
            : ''
        }
        onClick={() => handleNavigation(path)}
        _hover={{
          bg: `${colors().sidebar.hover_bg} !important`,
          color: `${colors().sidebar.hover_text} !important`,
          borderRadius: '4px',
        }}
      >
        <Stack align="left" direction="row">
          <Flex alignItems="center" color="icon">
            {icon}
          </Flex>
          <Flex pt={1}>
            <span>{title}</span>
          </Flex>
        </Stack>
      </List.Item>
    );
  };

  const mapSidebarData = (sidebarData: any, onCloseDrawer: () => void) => {
    // const openAccordionByDefault = (title: string) => {
    //   const titles = ['Employee'];
    //   if (titles.includes(title)) return 0;
    //   else return 1;
    // };

    return sidebarData.map((item: any, index: number) => {
      if (item?.hasAccordion) {
        //const idx = openAccordionByDefault(item.title);

        return (
          <AccordionRoot key={index} collapsible>
            <AccordionItem value={item.title}>
              <AccordionItemTrigger>
                <Button
                  maxW={56}
                  justifyContent="space-between"
                  _hover={{
                    bg: `${colors().sidebar.hover_bg} !important`,
                    borderRadius: '4px',
                  }}
                >
                  <Box color="sidebar.text">{item.title}</Box>
                </Button>
              </AccordionItemTrigger>
              <AccordionItemContent pt={0} pb={0}>
                {mapSidebarData(item.hasAccordion, onCloseDrawer)}
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
        );
      }

      return (
        <Box key={index} onClick={onCloseDrawer}>
          {getSidebarListItem(item.path, item.icon, item.title, item.label)}
        </Box>
      );
    });
  };

  return (
    <Flex
      height="100%"
      minW="250px"
      bg="sidebar.bg"
      px={1}
      pt={2}
      pb={4}
      boxShadow="md"
      overflowY="auto"
      overflowX="hidden"
      borderRightWidth="1px"
      borderRightColor="sidebar.hover_bg"
    >
      <Flex direction="column" justifyContent="space-between">
        <Flex direction="column" overflow="hidden">
          {isMobileSidebar && (
            <Flex width="full">
              <Spacer />
              <Box onClick={onCloseDrawer} cursor="pointer" color="icon">
                <IoClose size={24} />
              </Box>
            </Flex>
          )}
          <Flex direction="column" overflowY="auto">
            <List.Root>{mapSidebarData(SidebarData, onCloseDrawer)}</List.Root>
          </Flex>
        </Flex>

        {isMobileSidebar && (
          <Box pt="1rem">
            <CommonMenu />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
