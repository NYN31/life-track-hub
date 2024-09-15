import { Box } from '@chakra-ui/react';
import React from 'react';

const GenericBox: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <Box
      w={{ lg: '800px', md: 'full', sm: 'full', base: 'full' }}
      bg="#FFF"
      py={5}
      px={3}
      boxShadow="0 1px 3px gray"
      borderRadius={4}
    >
      {children}
    </Box>
  );
};

export default GenericBox;
