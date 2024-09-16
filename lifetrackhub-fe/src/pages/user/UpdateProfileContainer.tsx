import { Flex } from '@chakra-ui/react';
import PageHeading from '../../components/common/PageHeading';
import { PROFILE_EDIT_PAGE_HEADING } from '../../constants/texts/page-headings';
import ProfileEditTabs from '../../components/user/edit/ProfileEditTabs';

const UpdateProfileContainer = () => {
  return (
    <Flex direction="column">
      <PageHeading heading={PROFILE_EDIT_PAGE_HEADING} />
      <ProfileEditTabs />
    </Flex>
  );
};

export default UpdateProfileContainer;
