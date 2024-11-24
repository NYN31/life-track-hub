import { Box, Flex } from '@chakra-ui/react';
import { useUserFindByIdQuery } from '../../features/user/userApi';
import PageHeading from '../../components/common/PageHeading';
import { PROIFLE_PAGE_HEADING } from '../../constants/texts/page-headings';
import Intro from '../../components/user/Intro';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserObject } from '../../features/user/userSlice';
import MySkills from '../../components/user/MySkills';
import Education from '../../components/user/Education';
import Loading from '../../components/common/Loading';
import Experience from '../../components/user/Experience';

const UserProfileContainer = () => {
  const userId = localStorage.getItem('userId');

  const userSlice = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { data: userData, isLoading } = useUserFindByIdQuery(userId);

  const { skills, experiences, educations } = userSlice.userObject.userDetails;

  useEffect(() => {
    if (userData) dispatch(updateUserObject(userData));
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Flex direction="column" align="center" justifyContent="center" gap={4}>
        <Flex
          direction="column"
          w={{ lg: '750px', md: 'full', sm: 'full', base: 'full' }}
          gap={4}
        >
          <PageHeading heading={PROIFLE_PAGE_HEADING} />
          <Intro />
          {skills?.length > 0 && <MySkills />}
          {educations?.length > 0 && <Education />}
          {experiences?.length > 0 && <Experience />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserProfileContainer;
