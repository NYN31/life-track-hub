import React from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import OnclickButton from './OnclickButton';

const PaginationButton: React.FC<{
  hasPrevious: boolean;
  hasNext: boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}> = ({ hasPrevious, hasNext, handlePreviousPage, handleNextPage }) => {
  return (
    <Flex
      direction="row"
      justifyContent="flex-end"
      mb="4"
      mr={[0, 0, 0, 4, 12]}
    >
      <Stack spacing={6} direction="row" align="center">
        <OnclickButton
          color="btn.bg"
          text="Previous"
          width="auto"
          cursor={hasPrevious ? 'pointer' : 'not-allowed'}
          isDisable={!hasPrevious}
          isLoading={false}
          action={handlePreviousPage}
        />
        <OnclickButton
          color="btn.bg"
          text="Next"
          width="auto"
          cursor={hasNext ? 'pointer' : 'not-allowed'}
          isDisable={!hasNext}
          isLoading={false}
          action={handleNextPage}
        />
      </Stack>
    </Flex>
  );
};

export default PaginationButton;
