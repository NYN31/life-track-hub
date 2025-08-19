import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginFormInputs } from '../../types/auth';
import { EMAIL_REGEX_V2 } from '../../constants/regex';
import { useNavigate } from 'react-router-dom';
import useLoginCredentialStore from '../../helper/hooks/useLoginCredentialStore';
import { useLoginMutation } from '../../features/auth/authApi';
import { REGISTRATION_PATH } from '../../constants/title-and-paths';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import OnSubmitButton from '../common/button/OnSubmitButton';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  //const { errorToast } = useCustomToast();
  const storeLoginCredential = useLoginCredentialStore();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginFormInputs>({
    defaultValues: {
      email: localStorage.getItem('email') || '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginFormInputs> = async data => {
    setLoading(true);

    await login(data)
      .unwrap()
      .then(res => storeLoginCredential(res))
      .catch(error => {
        setErrorMessage(error?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center p-4 md:p-20">
      <div className="common-box p-2 md:p-4 lg:p-6 xl:p-8 w-full max-w-lg">
        <h2 className="text-center">Login</h2>

        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-300 my-4">
          <span>Don't have an account?</span>&nbsp;
          <span
            onClick={() => navigate(REGISTRATION_PATH)}
            className="link-view underline cursor-pointer"
          >
            Sign Up
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                minLength: {
                  value: 3,
                  message: 'Email must be at least 3 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Email must not exceed 40 characters',
                },
                pattern: {
                  value: EMAIL_REGEX_V2,
                  message: 'Enter a valid email',
                },
              })}
              className="form-input-field"
            />
            {errors.email && (
              <p className="form-field-error">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Password must not exceed 40 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                  },
                })}
                className="form-input-field"
              />
              <span
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {errors.password && (
              <p className="form-field-error">{errors.password.message}</p>
            )}
          </div>

          <p className="flex flex-wrap text-sm text-gray-500 dark:text-gray-300 my-4">
            <span>By logging in, you agree to our</span>&nbsp;
            <span
              onClick={() => navigate('/')}
              className="link-view underline cursor-pointer"
            >
              Terms and Conditions
            </span>
          </p>

          {/* Submit */}
          <div className="flex justify-end">
            <OnSubmitButton
              text="Login"
              isSaving={isLoading}
              isDirty={true}
              hasError={!isValid}
            />
          </div>

          {errorMessage && (
            <p className="form-field-error text-sm text-center mt-4">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
