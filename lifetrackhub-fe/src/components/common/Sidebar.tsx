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
import { colors } from '../../constants/extend-theme/colors';

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
    console.log(label, location.pathname);
    return (
      <ListItem
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
          bg: `${colors.sidebar.hover_bg} !important`,
          color: `${colors.sidebar.hover_text} !important`,
          borderRadius: '4px',
        }}
      >
        <Stack align="left" direction="row">
          <Flex alignItems="center">{icon}</Flex>
          <Flex pt={1}>
            <span>{title}</span>
          </Flex>
        </Stack>
      </ListItem>
    );
  };

  const mapSidebarData = (sidebarData: any, onCloseDrawer: () => void) => {
    const openAccordionByDefault = (title: string) => {
      const titles = ['Employee'];
      if (titles.includes(title)) return 0;
      else return 1;
    };

    return sidebarData.map((item: any, index: number) => {
      if (item?.hasAccordion) {
        const idx = openAccordionByDefault(item.title);

        return (
          <Accordion key={index} defaultIndex={idx} allowToggle={true}>
            <AccordionItem border={0}>
              <AccordionButton maxW={56} gap={24}>
                <Box color="sidebar.text">{item.title}</Box>
                <Box>
                  <AccordionIcon color="black" />
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
      bg="sidebar.bg"
      px={1}
      pt={2}
      pb={4}
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
