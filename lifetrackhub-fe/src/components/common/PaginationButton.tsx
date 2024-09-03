import React from 'react';
import { Flex, Stack, Button } from '@chakra-ui/react';

const PaginationButton: React.FC<{
  hasPrevious: boolean;
  hasNext: boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}> = ({ hasPrevious, hasNext, handlePreviousPage, handleNextPage }) => {
  return (
    <Flex direction="row" justifyContent="flex-end" mb="4" mr="50px">
      <Stack spacing={6} direction="row" align="center">
        <Button
          color="#e2136e"
          variant="ghost"
          size="md"
          isDisabled={!hasPrevious}
          onClick={() => handlePreviousPage()}
        >
          Previous Page
        </Button>
        <Button
          color="#e2136e"
          size="md"
          variant="ghost"
          isDisabled={!hasNext}
          onClick={() => handleNextPage()}
        >
          Next Page
        </Button>
      </Stack>
    </Flex>
  );
};

export default PaginationButton;
