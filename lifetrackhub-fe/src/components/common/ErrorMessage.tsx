import React from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

const ErrorMessage: React.FC<{ message: string; width?: string }> = ({
  message,
  width,
}) => {
  return (
    <Alert width={width ? width : '30%'} status="error">
      <AlertIcon />
      <AlertDescription>
        {message ? message : 'Data Fetching Failed'}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
