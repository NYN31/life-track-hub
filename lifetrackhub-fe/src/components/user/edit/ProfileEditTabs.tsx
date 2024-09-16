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
import ExperienceEdit from './ExperienceEdit';
import EducationEdit from './EducationEdit';
import { useDispatch } from 'react-redux';
import { useUserFindByIdQuery } from '../../../features/user/userApi';
import { useEffect } from 'react';
import { updateUserObject } from '../../../features/user/userSlice';
import Loading from '../../common/Loading';

export const tabs = [
  {
    title: 'Intro',
    tab: <IntroEdit />,
  },
  {
    title: 'Skill',
    tab: <SkillsEdit />,
  },
  {
    title: 'Education',
    tab: <EducationEdit />,
  },
  {
    title: 'Experience',
    tab: <ExperienceEdit />,
  },
  {
    title: 'Experience',
    tab: <ExperienceEdit />,
  },
  {
    title: 'Experience',
    tab: <ExperienceEdit />,
  },
];

const ProfileEditTabs = () => {
  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch();
  const { data: userData, isLoading } = useUserFindByIdQuery(userId);

  useEffect(() => {
    if (userData) dispatch(updateUserObject(userData));
  }, [isLoading]);

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
