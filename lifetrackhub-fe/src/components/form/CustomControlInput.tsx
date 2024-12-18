import { Box, Flex, Input } from '@chakra-ui/react';
import React from 'react';

const CustomControlInput: React.FC<{
  value: string;
  setValue: (value: string, name: string) => void;
  name: string;
  isRequired: boolean;
  label: string;
  type: string;
  placeholder: string;
  errorMessage: string | undefined;
}> = ({
  value,
  setValue,
  name,
  isRequired,
  label,
  type,
  placeholder,
  errorMessage,
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
          <Input
            value={value}
            onChange={e => setValue(e.target.value, name)}
            type={type}
            placeholder={placeholder}
            bg="body"
            border="1px"
            borderColor="gray.100"
            _hover={{
              borderColor: 'gray.400',
            }}
            borderRadius={0}
          />

          <Box width={{ lg: '400px', base: '96%' }} color="red" pt={4}>
            {errorMessage}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomControlInput;
