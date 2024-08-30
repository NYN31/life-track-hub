import { Box, Flex, Hide, Show, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BANNAR_NAME } from '../../constants/common-constants';
import CommonMenu from './CommonMenu';

const Navbar: React.FC<{
  onOpenDrawer: () => void;
}> = ({ onOpenDrawer }) => {
  return (
    <Flex px={['2rem', '2rem', '3rem']} py=".8rem" bg="primary">
      <Flex justify="center" align="center">
        <Text fontWeight={800} textTransform="uppercase">
          {BANNAR_NAME}
        </Text>
      </Flex>
      <Spacer />

      <Hide below="md">
        <CommonMenu />
      </Hide>

      <Show below="md">
        <Box onClick={onOpenDrawer}>
          <RxHamburgerMenu size={24} cursor="pointer" />
        </Box>
      </Show>
    </Flex>
  );
};

export default Navbar;
