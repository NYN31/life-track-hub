import { Box, Flex, FormControl, Heading, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { REGISTRATION_PAGE_HEADING } from '../../constants/texts/page-headings';
import CustomFormInput from '../Form/CustomFormInput';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import {
  EMAIL_LENGTH_VALIDATION_MESSAGE,
  EMAIL_REQUIRED_VALIDATION_MESSAGE,
  EMAIL_VALIDATION_MESSAGE,
  FIRSTNAME_LENGTH_VALIDATION_MESSAGE,
  FIRSTNAME_REQUIRED_VALIDATION_MESSAGE,
  PASSWORD_LENGTH_VALIDATION_MESSAGE,
  PASSWORD_REQUIRED_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
} from '../../constants/texts/validation-message';
import SubmitButton from '../common/button/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/sidebar/items-title-and-path';
import { useState } from 'react';
import { useRegistrationMutation } from '../../features/auth/authApi';
import useCustomToast from '../../helper/hook/CustomToast';
import {
  FAILED_TITLE,
  REGISTRATION_SUCCESS_MESSAGE,
  SUCCESS_TITLE,
} from '../../constants/texts/title-and-message';
import ErrorMessage from '../common/ErrorMessage';

const Registration = () => {
  const navigate = useNavigate();
  const { successToast, errorToast } = useCustomToast();
  const [loading, isLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [registration] = useRegistrationMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { firstname: '', lastname: '', email: '', password: '' },
  });

  const handleRegistration = async (data: any) => {
    isLoading(true);
    await registration(data)
      .unwrap()
      .then(() => {
        localStorage.setItem('email', data.email);
        successToast(SUCCESS_TITLE, REGISTRATION_SUCCESS_MESSAGE);
        navigate(LOGIN_PATH);
      })
      .catch(err => {
        errorToast(FAILED_TITLE, err.data.message);
        reset({
          firstname: data.firstname,
          lastname: data.lastname,
          email: '',
          password: '',
        });
        setErrorMessage(err.data.message);
      })
      .finally(() => isLoading(false));
  };

  return (
    <Flex direction="column" m={4} justify="center" align="center">
      <Box
        as="form"
        onSubmit={handleSubmit(handleRegistration)}
        w={{ base: '100%', sm: '100%', md: 'auto', lg: 'auto' }}
      >
        <Heading as="h3" size={['sm', 'md', 'lg']}>
          {REGISTRATION_PAGE_HEADING}
        </Heading>

        <Flex>
          <Text color="gray.500">Already have an account?</Text> &nbsp;
          <Text
            as="u"
            color="link"
            cursor="pointer"
            onClick={() => navigate(LOGIN_PATH)}
          >
            Sign In
          </Text>
        </Flex>

        <FormControl isInvalid={!!errors.firstname}>
          <CustomFormInput
            isRequired={true}
            label="First Name"
            type="text"
            placeholder="First name"
            errorMessage={errors?.firstname?.message}
            register={register}
            registerObj={{
              required: FIRSTNAME_REQUIRED_VALIDATION_MESSAGE,
              maxLength: {
                value: 40,
                message: FIRSTNAME_LENGTH_VALIDATION_MESSAGE,
              },
              minLength: {
                value: 3,
                message: FIRSTNAME_LENGTH_VALIDATION_MESSAGE,
              },
            }}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.lastname}>
          <CustomFormInput
            isRequired={false}
            label="Last Name"
            type="text"
            placeholder="Last name"
            errorMessage={errors?.lastname?.message}
            register={register}
            registerObj={{}}
          />
        </FormControl>

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
          text="Sign Up"
          width="full"
          type="submit"
          cursor={isValid ? 'pointer' : 'not-allowed'}
          isDisable={!isValid}
          isLoading={loading}
        />

        {errorMessage && <ErrorMessage message={errorMessage} width="full" />}
      </Box>
    </Flex>
  );
};

export default Registration;
