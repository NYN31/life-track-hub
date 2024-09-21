import { useSelector } from 'react-redux';
import { IExperience, IUserDetails } from '../../types/user';
import GenericBox from '../common/GenericBox';
import PageHeading from '../common/PageHeading';
import { PROFILE_EXPERIENCES_HEADING } from '../../constants/texts/page-headings';
import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ICON_SIZE_18 } from '../../constants/common-constants';
import { FaNetworkWired } from 'react-icons/fa';

const Experience = () => {
  const { userObject } = useSelector((state: any) => state.user);
  const { experiences } = userObject.userDetails as IUserDetails;

  const getListItem = (name: string, value: string | number | undefined) => {
    if (!value) value = 'N/A';

    return (
      <Flex gap={4}>
        <Flex color="icon" align="center">
          <FaRegCheckCircle size={ICON_SIZE_18} />
        </Flex>
        <Text>{name + ' - ' + value}</Text>
      </Flex>
    );
  };

  return (
    <GenericBox>
      <Flex align="center" justifyContent="center">
        <PageHeading heading={PROFILE_EXPERIENCES_HEADING} />
      </Flex>
      <Flex mt={4} direction="column" gap={4}>
        {experiences?.map((experience, index) => {
          const { name, yearOfExperience, description } =
            experience as IExperience;

          const descriptionList = description?.split('. ');

          return (
            <GenericBox key={index}>
              <Flex direction="row" gap={4}>
                <Box color="icon">
                  <FaNetworkWired size={ICON_SIZE_18} />
                </Box>
                <Text as="b">{name}</Text>
              </Flex>

              <Flex mt={4} direction="column" gap={4}>
                {getListItem('Year of Experience', yearOfExperience)}
                <UnorderedList spacing={2}>
                  {descriptionList?.map((item, index) => {
                    return <ListItem key={index}>{item}</ListItem>;
                  })}
                </UnorderedList>
              </Flex>
            </GenericBox>
          );
        })}
      </Flex>
    </GenericBox>
  );
};

export default Experience;
