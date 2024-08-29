import {
  Flex,
  List,
  ListItem,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  Spacer,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SidebarData from '../../constants/sidebar/sidebar-items';
import { IoClose } from 'react-icons/io5';
import CommonMenu from './CommonMenu';

const sideBarListCssProperty = {
  margin: '4px',
  py: '4px',
  px: '4px',
  cursor: 'pointer',
  h: '40px',
  _hover: {
    bg: '#d12c74 !important',
    color: '#fff !important',
    borderRadius: '4px',
  },
  color: '#fff',
};

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
      <ListItem
        borderRadius=".25rem"
        w="230px"
        {...sideBarListCssProperty}
        bg={
          label.toLowerCase() === location.pathname.toLowerCase()
            ? '#5c2b37'
            : ''
        }
        onClick={() => handleNavigation(path)}
      >
        <Stack align="left" direction="row">
          <Flex alignItems="center">{icon}</Flex>
          <Flex pt="4px">
            <span>{title}</span>
          </Flex>
        </Stack>
      </ListItem>
    );
  };

  const mapSidebarData = (sidebarData: any, onCloseDrawer: () => void) => {
    const openAccordionByDefault = (title: string) => {
      const titles = ['xyz'];
      if (titles.includes(title)) return 0;
      else return 1;
    };

    return sidebarData.map((item: any, index: number) => {
      if (item?.hasAccordion) {
        const idx = openAccordionByDefault(item.title);

        return (
          <Accordion key={index} defaultIndex={idx} allowToggle={true}>
            <AccordionItem border="0px">
              <AccordionButton maxW="230px" gap="6rem">
                <Box color="#fff" bg="#e2136e">
                  {item.title}
                </Box>
                <Box>
                  <AccordionIcon color="#fff" />
                </Box>
              </AccordionButton>
              <AccordionPanel pt={0} pb={0}>
                {mapSidebarData(item.hasAccordion, onCloseDrawer)}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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
      bg="#e2136e"
      color="white"
      px="4px"
      pt="0.5rem"
      pb="1rem"
      boxShadow="md"
      overflowY="auto"
      overflowX="hidden"
      resize="horizontal"
    >
      <Flex direction="column" justifyContent="space-between">
        <Flex direction="column" overflow="hidden">
          {isMobileSidebar && (
            <Flex width="full">
              <Spacer />
              <Box onClick={onCloseDrawer} cursor="pointer">
                <IoClose size={24} />
              </Box>
            </Flex>
          )}
          <Flex direction="column" overflowY="auto">
            <List>{mapSidebarData(SidebarData, onCloseDrawer)}</List>
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
