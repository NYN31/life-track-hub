import {
  Box,
  Flex,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';

const CustomFormInput: React.FC<{
  isRequired: boolean;
  label: string;
  type: string;
  placeholder: string;
  errorMessage: string | undefined;
  register: any;
  registerObj: any;
}> = ({
  isRequired,
  label,
  type,
  placeholder,
  errorMessage,
  register,
  registerObj,
}) => {
  let newLabel = label.split(' ').join('').toLowerCase();

  return (
    <>
      <FormLabel mt={4} fontSize="sm" fontWeight={600} htmlFor={newLabel}>
        {label}{' '}
        {isRequired && (
          <Box as="span" color="red">
            *
          </Box>
        )}
      </FormLabel>
      <Flex direction="row">
        <Flex direction="column" w={{ base: '100%', md: '500px', lg: '500px' }}>
          <Input
            type={type}
            placeholder={placeholder}
            bg="body"
            border="1px"
            borderColor="gray.100"
            _hover={{
              borderColor: 'gray.400',
            }}
            {...register(newLabel, registerObj)}
          />

          <FormErrorMessage width={{ lg: '400px', base: '96%' }}>
            {errorMessage}
          </FormErrorMessage>
        </Flex>
      </Flex>
    </>
  );
};

export default CustomFormInput;
