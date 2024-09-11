import { Flex } from '@chakra-ui/react';
import PageHeading from '../../components/common/PageHeading';
import SettingTabs from '../../components/setting/SettingTabs';

const SettingContainer = () => {
  return (
    <Flex direction="column">
      <Flex>
        <PageHeading heading="App Setting" />
      </Flex>
      <SettingTabs />
    </Flex>
  );
};

export default SettingContainer;
