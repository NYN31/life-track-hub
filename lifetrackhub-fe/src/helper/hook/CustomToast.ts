import { toaster } from '../../components/ui/toaster';
import {
  FAILED_TITLE,
  NETWORK_ERROR_MESSAGE,
  OPERATION_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../constants/texts/title-and-message';

export const useCustomToast = () => {
  const successToast = (title: string, message: string) => {
    toaster.create({
      title: title || SUCCESS_TITLE,
      description: message || OPERATION_SUCCESS_MESSAGE,
      type: 'success',
    });
  };

  const errorToast = (title: string, message: string) => {
    toaster.create({
      title: title || FAILED_TITLE,
      description: message || NETWORK_ERROR_MESSAGE,
      type: 'error',
    });
  };

  const warningToast = (title: string, message: string) => {
    toaster.create({
      title: title || SUCCESS_TITLE,
      description: message || OPERATION_SUCCESS_MESSAGE,
      type: 'warning',
    });
  };

  const infoToast = (title: string, message: string) => {
    toaster.create({
      title: title || SUCCESS_TITLE,
      description: message || OPERATION_SUCCESS_MESSAGE,
      type: 'info',
    });
  };

  return { successToast, errorToast, warningToast, infoToast };
};

export default useCustomToast;
