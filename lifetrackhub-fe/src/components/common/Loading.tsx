import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex width="100%" color="icon">
      <Spinner />
    </Flex>
  );
};

export default Loading;
