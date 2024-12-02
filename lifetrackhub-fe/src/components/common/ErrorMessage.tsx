import React from 'react';
import { Box } from '@chakra-ui/react';
import { Alert } from '../ui/alert';

const ErrorMessage: React.FC<{ message: string; width?: string }> = ({
  message,
  width,
}) => {
  return (
    <Box width={width ? width : ['full', 'full', 'full', '50%', '50%']} mt={4}>
      <Alert
        status="error"
        bg="alert"
        borderRadius={4}
        title={message ? message : 'Data Fetching Failed'}
      ></Alert>
    </Box>
  );
};

export default ErrorMessage;
