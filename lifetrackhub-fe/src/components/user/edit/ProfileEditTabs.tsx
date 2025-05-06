import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import IntroEdit from './IntroEdit';
import SkillsEdit from './SkillsEdit';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateUserObject } from '../../../features/user/userSlice';
import Loading from '../../common/Loading';
import { useFindSelfDetailsQuery } from '../../../features/user/userApi';

const ProfileEditTabs = () => {
  const dispatch = useDispatch();
  const { data: userData, isLoading } = useFindSelfDetailsQuery({});

  useEffect(() => {
    if (userData) dispatch(updateUserObject(userData));
  }, [isLoading, userData]);

  const tabs = [
    {
      title: 'Intro',
      tab: <IntroEdit userObject={userData} />,
    },
    {
      title: 'Skill',
      tab: <SkillsEdit />,
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <Box py={8}>
      <Tabs position="relative" variant="unstyled">
        <TabList gap={[0, 0, 4, 8]}>
          {tabs.map(t => (
            <Tab key={t.title}>{t.title}</Tab>
          ))}
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="icon" borderRadius="1px" />
        <TabPanels>
          {tabs.map(t => (
            <TabPanel px={0} key={t.title}>
              {t.tab}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfileEditTabs;
