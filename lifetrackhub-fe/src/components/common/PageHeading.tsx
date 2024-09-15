import { Heading } from '@chakra-ui/react';
import React from 'react';

const PageHeading: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <Heading color="icon" as="h4" size={['sm', 'lg', 'lg', 'lg']}>
      {heading}
    </Heading>
  );
};

export default PageHeading;
