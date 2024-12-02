import { Box, Tabs } from '@chakra-ui/react';
import IntroEdit from './IntroEdit';
import SkillsEdit from './SkillsEdit';
import { useDispatch } from 'react-redux';
import { useUserFindByIdQuery } from '../../../features/user/userApi';
import { useEffect } from 'react';
import { updateUserObject } from '../../../features/user/userSlice';
import Loading from '../../common/Loading';

const ProfileEditTabs = () => {
  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch();
  const { data: userData, isLoading } = useUserFindByIdQuery(userId);

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
      <Tabs.Root position="relative">
        <Tabs.List gap={[0, 0, 4, 8]}>
          {tabs.map(t => (
            <Tabs.Trigger key={t.title} value={t.title}>
              {t.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Indicator mt="-1.5px" height="2px" bg="icon" borderRadius="1px" />

        {tabs.map(t => (
          <Tabs.Content px={0} key={t.title} value={t.title}>
            {t.tab}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};

export default ProfileEditTabs;
