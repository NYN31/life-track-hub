import { useSelector } from 'react-redux';
import { IEducation, IUserDetails } from '../../types/user';
import GenericBox from '../common/GenericBox';
import PageHeading from '../common/PageHeading';
import { PROFILE_EDUCATION_HEADING } from '../../constants/texts/page-headings';
import { Flex, Text } from '@chakra-ui/react';
import { IoSchoolSharp } from 'react-icons/io5';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ICON_SIZE_20 } from '../../constants/common-constants';

const Education = () => {
  const { userObject } = useSelector((state: any) => state.user);
  const { educations } = userObject.userDetails as IUserDetails;

  const getListItem = (name: string, value: string | undefined) => {
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
        <PageHeading heading={PROFILE_EDUCATION_HEADING} />
      </Flex>
      <Flex mt={4} direction="column" gap={4}>
        {educations?.map((education, index) => {
          const {
            title,
            institution,
            graduationStartDate,
            graduationEndDate,
            result,
          } = education as IEducation;

          return (
            <GenericBox key={index}>
              <Flex direction="row" gap={4}>
                <Flex color="icon" align="center">
                  <IoSchoolSharp size={ICON_SIZE_20} />
                </Flex>
                <Text as="b">{title}</Text>
              </Flex>

              <Flex mt={4} direction="column" gap={2}>
                {getListItem('Institution', institution)}{' '}
                {getListItem('Graduation Start Date', graduationStartDate)}
                {getListItem('Graduation End Date', graduationEndDate)}
                {getListItem('Result', result)}
              </Flex>
            </GenericBox>
          );
        })}
      </Flex>
    </GenericBox>
  );
};

export default Education;
