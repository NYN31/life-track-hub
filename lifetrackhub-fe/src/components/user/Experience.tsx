import { useSelector } from 'react-redux';
import { IExperience, IUserDetails } from '../../types/user';
import GenericBox from '../common/GenericBox';
import PageHeading from '../common/PageHeading';
import { PROFILE_EXPERIENCES_HEADING } from '../../constants/texts/page-headings';
import { Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ICON_SIZE_20 } from '../../constants/common-constants';
import { FaNetworkWired } from 'react-icons/fa';

const Experience = () => {
  const { userObject } = useSelector((state: any) => state.user);
  const { experiences } = userObject.userDetails as IUserDetails;

  const getListItem = (name: string, value: string | number | undefined) => {
    if (!value) value = 'N/A';

    return (
      <Flex gap={4}>
        <Flex color="icon" align="center">
          <FaRegCheckCircle size={ICON_SIZE_20} />
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
                <Flex color="icon" align="center">
                  <FaNetworkWired size={ICON_SIZE_20} />
                </Flex>
                <Text as="b">{name}</Text>
              </Flex>

              <Flex mt={4} direction="column" gap={4}>
                <UnorderedList spacing={2}>
                  {descriptionList?.map((item, index) => {
                    return <ListItem key={index}>{item}</ListItem>;
                  })}
                </UnorderedList>
                {getListItem('Year of Experience', yearOfExperience)}
              </Flex>
            </GenericBox>
          );
        })}
      </Flex>
    </GenericBox>
  );
};

export default Experience;
