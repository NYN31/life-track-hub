import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex width="100%" height="100vh" justify="center" align="center">
      <Spinner />
    </Flex>
  );
};

export default Loading;
