import Appearance from './Appearance';
import { Box, Tabs } from '@chakra-ui/react';

export const tabs = [
  {
    title: 'Appearance',
    tab: <Appearance />,
  },
];

const SettingTabs = () => {
  return (
    <Box py={8}>
      <Tabs.Root position="relative">
        <Tabs.List>
          {tabs.map(t => (
            <Tabs.Trigger key={t.title} value={t.title}>
              {t.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Indicator mt="-1.5px" height="2px" bg="icon" borderRadius="1px" />

        {tabs.map(t => (
          <Tabs.Content key={t.title} value={t.title}>
            {t.tab}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};

export default SettingTabs;
