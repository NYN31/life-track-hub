import { Box, Flex, Textarea } from '@chakra-ui/react';
import React from 'react';

const CustomTextarea: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isRequired: boolean;
  label: string;
  placeholder: string;
  errorMessage: string | undefined;
  borderRadius: number;
}> = ({
  value,
  setValue,
  isRequired,
  label,
  placeholder,
  errorMessage,
  borderRadius = 0,
}) => {
  return (
    <Flex direction="column" gap={2} w="full">
      <Box fontSize="sm" fontWeight={600}>
        {label}{' '}
        {isRequired && (
          <Box as="span" color="red">
            *
          </Box>
        )}
      </Box>
      <Flex direction="row" w="full">
        <Flex direction="column" w="full">
          <Textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            bg="body"
            border="1px"
            borderColor="gray.100"
            _hover={{
              borderColor: 'gray.400',
            }}
            borderRadius={borderRadius}
            resize="vertical"
          />

          <Box width={{ lg: '400px', base: '96%' }} color="red" pt={4}>
            {errorMessage}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomTextarea;
