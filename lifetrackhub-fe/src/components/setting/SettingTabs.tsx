import Appearance from './Appearance';
import Tab2 from './Tab2';
import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

export const tabs = [
  {
    title: 'Appearance',
    tab: <Appearance />,
  },
  {
    title: 'Test',
    tab: <Tab2 />,
  },
];

const SettingTabs = () => {
  return (
    <Box py={8}>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          {tabs.map(t => (
            <Tab key={t.title}>{t.title}</Tab>
          ))}
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="icon" borderRadius="1px" />
        <TabPanels>
          {tabs.map(t => (
            <TabPanel key={t.title}>{t.tab}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SettingTabs;
