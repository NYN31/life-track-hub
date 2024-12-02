import GenericBox from '../common/GenericBox';
import PageHeading from '../common/PageHeading';
import { PROFILE_SKILLS_HEADING } from '../../constants/texts/page-headings';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IUserDetails } from '../../types/user';
import { Radio } from '../ui/radio';

const MySkills = () => {
  const { userObject } = useSelector((state: any) => state.user);
  const { skills } = userObject.userDetails as IUserDetails;

  return (
    <GenericBox>
      <Flex align="center" justifyContent="center">
        <PageHeading heading={PROFILE_SKILLS_HEADING} />
      </Flex>
      <SimpleGrid
        minChildWidth={['80px', '80px', '100px', '120px']}
        gap="20px"
        mt={4}
      >
        {skills?.map((skill, index) => {
          return (
            <Radio key={index} value={skill.name} bg="icon">
              {skill.name}
            </Radio>
          );
        })}
      </SimpleGrid>
    </GenericBox>
  );
};

export default MySkills;
