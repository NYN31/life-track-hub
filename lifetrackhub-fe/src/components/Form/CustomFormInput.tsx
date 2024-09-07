import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';

const CustomFormInput: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  errorMessage: string | undefined;
  register: any;
  registerObj: any;
}> = ({ label, type, placeholder, errorMessage, register, registerObj }) => {
  return (
    <>
      <FormLabel
        mt={4}
        fontSize="sm"
        fontWeight={600}
        htmlFor={label.toLowerCase()}
      >
        {label}{' '}
        <Box as="span" color="red">
          *
        </Box>
      </FormLabel>
      <Flex direction="row">
        <Flex direction="column" w={{ base: '100%', md: '500px', lg: '500px' }}>
          <Input
            type={type}
            placeContent={placeholder}
            bg="btn.bg"
            color="btn.text"
            border="1px"
            borderColor="gray.300"
            _hover={{
              borderColor: 'gray.300',
            }}
            //width={{ lg: '600px', md: '100%', sm: '100%', xs: '100%' }}
            {...register(label.toLowerCase(), registerObj)}
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
