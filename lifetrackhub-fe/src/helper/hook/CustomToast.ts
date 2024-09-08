import { useToast } from '@chakra-ui/react';
import {
  FAILED_TITLE,
  NETWORK_ERROR_MESSAGE,
  OPERATION_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../constants/texts/title-and-message';
import { ToastStatus } from '../../types/common';

export const useCustomToast = () => {
  const toast = useToast();

  const successToast = (
    title: string,
    message: string,
    status: ToastStatus = 'success'
  ) => {
    toast({
      title: title || SUCCESS_TITLE,
      description: message || OPERATION_SUCCESS_MESSAGE,
      status: status,
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  };

  const errorToast = (
    title: string,
    message: string,
    status: ToastStatus = 'error'
  ) => {
    toast({
      title: title || FAILED_TITLE,
      description: message || NETWORK_ERROR_MESSAGE,
      status: status,
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  };

  return { successToast, errorToast };
};

export default useCustomToast;
