import { Box, Flex, FormControl, Heading, Icon, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { LOGIN_PAGE_HEADING } from '../../constants/texts/page-headings';
import CustomFormInput from '../form/CustomFormInput';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import {
  EMAIL_LENGTH_VALIDATION_MESSAGE,
  EMAIL_REQUIRED_VALIDATION_MESSAGE,
  EMAIL_VALIDATION_MESSAGE,
  PASSWORD_LENGTH_VALIDATION_MESSAGE,
  PASSWORD_REQUIRED_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
} from '../../constants/texts/validation-message';
import SubmitButton from '../common/button/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { REGISTRATION_PATH } from '../../constants/sidebar/items-title-and-path';
import {
  useGoogleCallbackMutation,
  useLazyGoogleRedirectUrlQuery,
  useLoginMutation,
} from '../../features/auth/authApi';
import { useEffect, useState } from 'react';
import { LoginInputData } from '../../types/auth';
import ErrorMessage from '../common/ErrorMessage';
import useCustomToast from '../../helper/hook/CustomToast';
import {
  FAILED_TITLE,
  OPERATION_FAILED_MESSAGE,
} from '../../constants/texts/title-and-message';
import SsoLoginButton from '../common/button/SsoLoginButton';
import { FcGoogle } from 'react-icons/fc';
import { useQuery } from '../../helper/url/search-params';
import useLoginCredentialStore from '../../helper/hook/useLoginCredentialStore';

const Login = () => {
  const code: string = useQuery().get('code') || '';

  const navigate = useNavigate();
  const { errorToast } = useCustomToast();
  const storeLoginCredential = useLoginCredentialStore();

  const [loading, isLoading] = useState(false);
  const [errorMesssage, setErrorMessage] = useState('');

  const [login] = useLoginMutation();
  const [triggerGoogleRedirectUrl] = useLazyGoogleRedirectUrlQuery();
  const [googleLogin] = useGoogleCallbackMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: localStorage.getItem('email') || '', password: '' },
  });

  const handleLogin = async (data: LoginInputData) => {
    isLoading(true);

    await login(data)
      .unwrap()
      .then(res => {
        storeLoginCredential(res);
      })
      .catch(error => {
        errorToast(FAILED_TITLE, error.data.message);
        setErrorMessage(error?.data?.message);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  const handleGoogleRedirectUrl = async () => {
    isLoading(true);
    await triggerGoogleRedirectUrl({})
      .unwrap()
      .then(res => {
        const { redirectUrl } = res;
        window.location.href = redirectUrl;
      })
      .catch(err => {
        errorToast(
          err.data.status || FAILED_TITLE,
          err.data.message || OPERATION_FAILED_MESSAGE
        );
      })
      .finally(() => isLoading(false));
  };

  useEffect(() => {
    const handleCallback = async () => {
      await googleLogin(code)
        .unwrap()
        .then(res => storeLoginCredential(res))
        .catch(err => {
          errorToast(
            err.data.status || FAILED_TITLE,
            err.data.message || OPERATION_FAILED_MESSAGE
          );
        });
    };

    if (code) {
      handleCallback();
    }
  }, [code]);

  return (
    <Flex direction="column" m={4} justify="center" align="center">
      <Box
        as="form"
        onSubmit={handleSubmit(handleLogin)}
        w={{ base: '100%', sm: '100%', md: 'auto', lg: 'auto' }}
      >
        <Heading as="h3" size={['sm', 'md', 'lg']}>
          {LOGIN_PAGE_HEADING}
        </Heading>
        <Flex>
          <Text color="gray.500">Don't have an account?</Text> &nbsp;
          <Text
            as="u"
            color="link"
            cursor="pointer"
            onClick={() => navigate(REGISTRATION_PATH)}
          >
            Sign Up
          </Text>
        </Flex>

        <FormControl isInvalid={!!errors.email}>
          <CustomFormInput
            isRequired={true}
            label="Email"
            type="email"
            placeholder="Email"
            errorMessage={errors?.email?.message}
            register={register}
            registerObj={{
              required: EMAIL_REQUIRED_VALIDATION_MESSAGE,
              maxLength: {
                value: 40,
                message: EMAIL_LENGTH_VALIDATION_MESSAGE,
              },
              minLength: {
                value: 3,
                message: EMAIL_LENGTH_VALIDATION_MESSAGE,
              },
              pattern: {
                value: EMAIL_REGEX,
                message: EMAIL_VALIDATION_MESSAGE,
              },
            }}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <CustomFormInput
            isRequired={true}
            label="Password"
            type="password"
            placeholder="Password"
            errorMessage={errors?.password?.message}
            register={register}
            registerObj={{
              required: PASSWORD_REQUIRED_VALIDATION_MESSAGE,
              maxLength: {
                value: 40,
                message: PASSWORD_LENGTH_VALIDATION_MESSAGE,
              },
              minLength: {
                value: 3,
                message: PASSWORD_LENGTH_VALIDATION_MESSAGE,
              },
              pattern: {
                value: PASSWORD_REGEX,
                message: PASSWORD_VALIDATION_MESSAGE,
              },
            }}
          />
        </FormControl>

        <Text mt={4} mb={1}>
          By login in, you agree to our Terms and Conditions
        </Text>
        <SubmitButton
          text="Sign In"
          width="full"
          type="submit"
          cursor={isValid ? 'pointer' : 'not-allowed'}
          isDisable={!isValid}
          isLoading={loading}
        />

        <Box py={4}>
          <SsoLoginButton
            onClick={handleGoogleRedirectUrl}
            text="Continue with Google"
            icon={<Icon as={FcGoogle} boxSize="5" />}
          />
        </Box>

        {errorMesssage && <ErrorMessage message={errorMesssage} width="full" />}
      </Box>
    </Flex>
  );
};

export default Login;
