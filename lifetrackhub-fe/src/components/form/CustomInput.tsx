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
  borderRadius?: number;
  onEnterKeyDown?: any;
}> = ({
  value,
  setValue,
  isRequired,
  label,
  type,
  placeholder,
  errorMessage,
  borderRadius = 0,
  onEnterKeyDown,
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
            onChange={e => setValue(e.target.value)}
            type={type}
            placeholder={placeholder}
            _placeholder={{
              fontSize: 'sm',
            }}
            bg="body"
            border="1px"
            borderColor="gray.100"
            _hover={{
              borderColor: 'gray.400',
            }}
            borderRadius={borderRadius}
            onKeyDown={onEnterKeyDown}
          />

          <Box width={{ lg: '400px', base: '96%' }} color="red" pt={4}>
            {errorMessage}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomInput;
