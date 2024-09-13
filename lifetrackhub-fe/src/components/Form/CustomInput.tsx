import { Box, Flex, Input } from '@chakra-ui/react';
import React from 'react';

const CustomInput: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isRequired: boolean;
  label: string;
  type: string;
  placeholder: string;
  errorMessage: string | undefined;
}> = ({
  value,
  setValue,
  isRequired,
  label,
  type,
  placeholder,
  errorMessage,
}) => {
  return (
    <>
      <Box fontSize="sm" fontWeight={600}>
        {label}{' '}
        {isRequired && (
          <Box as="span" color="red">
            *
          </Box>
        )}
      </Box>
      <Flex direction="row">
        <Flex direction="column" w={{ base: '100%', md: '500px', lg: '500px' }}>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            type={type}
            placeholder={placeholder}
            bg="body"
            border="1px"
            borderColor="gray.300"
            _hover={{
              borderColor: 'gray.300',
            }}
            borderRadius={0}
          />

          <Box width={{ lg: '400px', base: '96%' }} color="red" pt={4}>
            {errorMessage}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default CustomInput;
