import { Box, Flex, FormControl, Heading, Text } from '@chakra-ui/react';
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
import {
  PROFILE_DETAILS_PATH,
  REGISTRATION_PATH,
} from '../../constants/sidebar/items-title-and-path';
import { useLoginMutation } from '../../features/auth/authApi';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JWTDecoder, LoginInputData } from '../../types/auth';
import ErrorMessage from '../common/ErrorMessage';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../features/auth/authSlice';
import useCustomToast from '../../helper/hook/CustomToast';
import {
  FAILED_TITLE,
  LOGIN_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../constants/texts/title-and-message';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successToast, errorToast } = useCustomToast();
  const [loading, isLoading] = useState(false);
  const [errorMesssage, setErrorMessage] = useState('');

  const [login] = useLoginMutation();

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
        const decodedJwt: JWTDecoder = jwtDecode(res.accessToken);
        const { name, accessToken } = res;
        const { sub, role, userId } = decodedJwt;

        localStorage.setItem('name', name);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', sub);
        localStorage.setItem('role', role[0]);
        localStorage.setItem('userId', userId.toString());

        dispatch(
          userLoggedIn({ ...res, ...decodedJwt, email: decodedJwt.sub })
        );
        successToast(SUCCESS_TITLE, LOGIN_SUCCESS_MESSAGE);
        navigate(PROFILE_DETAILS_PATH, { replace: true });
      })
      .catch(error => {
        errorToast(FAILED_TITLE, error.data.message);
        setErrorMessage(error?.data?.message);
      })
      .finally(() => {
        isLoading(false);
      });
  };

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

        {errorMesssage && <ErrorMessage message={errorMesssage} width="full" />}
      </Box>
    </Flex>
  );
};

export default Login;
