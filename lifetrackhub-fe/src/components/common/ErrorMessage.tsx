import React from 'react';
import { Alert, AlertIcon, AlertDescription, Box } from '@chakra-ui/react';

const ErrorMessage: React.FC<{ message: string; width?: string }> = ({
  message,
  width,
}) => {
  return (
    <Box width={width ? width : '30%'} mt={4}>
      <Alert status="error" bg="alert" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>
          {message ? message : 'Data Fetching Failed'}
        </AlertDescription>
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
