import { Box, Flex, FormControl, Heading, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { LOGIN_PAGE_HEADING } from '../../constants/texts/page-headings';
import CustomFormInput from '../Form/CustomFormInput';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import {
  EMAIL_LENGTH_VALIDATION_MESSAGE,
  EMAIL_REQUIRED_VALIDATION_MESSAGE,
  EMAIL_VALIDATION_MESSAGE,
  PASSWORD_LENGTH_VALIDATION_MESSAGE,
  PASSWORD_REQUIRED_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
} from '../../constants/texts/validation-message';
import SubmitButton from '../common/Button/SubmitButton';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = (data: any) => {
    console.log(data);
  };

  return (
    <Flex direction="column" m={4} justify="center" align="center">
      <Box
        as="form"
        onSubmit={handleSubmit(handleLogin)}
        w={{ base: '100%', sm: '100%', md: 'auto', lg: 'auto' }} // Responsive width
      >
        <Heading as="h3" size={['sm', 'md', 'lg']}>
          {LOGIN_PAGE_HEADING}
        </Heading>

        <FormControl isInvalid={!!errors.email}>
          <CustomFormInput
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
          text="Login"
          width="full"
          type="submit"
          cursor={isValid ? 'pointer' : 'not-allowed'}
          isDisable={!isValid}
          isLoading={false}
        />
      </Box>
    </Flex>
  );
};

export default Login;
