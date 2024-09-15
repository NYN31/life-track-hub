import GenericBox from '../common/GenericBox';
import PageHeading from '../common/PageHeading';
import { PROFILE_SKILLS_HEADING } from '../../constants/texts/page-headings';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IUserDetails } from '../../types/user';

const MySkills = () => {
  const { userObject } = useSelector((state: any) => state.user);
  const { skills } = userObject.userDetails as IUserDetails;

  return (
    <GenericBox>
      <Flex align="center" justifyContent="center">
        <PageHeading heading={PROFILE_SKILLS_HEADING} />
      </Flex>
      <SimpleGrid minChildWidth="120px" spacing="40px" mt={4}>
        {skills?.map((skill, index) => {
          return (
            <Flex
              key={index}
              height="40px"
              bg="icon"
              align="center"
              justifyContent="center"
              color="#FFFF"
              borderRadius={4}
            >
              {skill.name}
            </Flex>
          );
        })}
      </SimpleGrid>
    </GenericBox>
  );
};

export default MySkills;
