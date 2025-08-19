import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterFormInputs } from '../../types/auth';
import { EMAIL_REGEX_V2 } from '../../constants/regex';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import { useRegistrationMutation } from '../../features/auth/authApi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import OnSubmitButton from '../common/button/OnSubmitButton';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [registration] = useRegistrationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IRegisterFormInputs>();

  const onSubmit: SubmitHandler<IRegisterFormInputs> = async data => {
    setLoading(true);
    await registration(data)
      .unwrap()
      .then(() => {
        localStorage.setItem('email', data.email);
        navigate(LOGIN_PATH);
      })
      .catch(err => {
        reset({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: '',
        });
        setErrorMessage(err.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center p-4 md:p-20">
      <div className="common-box p-2 md:p-4 lg:p-6 xl:p-8 w-full max-w-lg">
        <h2 className="text-center">Register</h2>

        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-300 mt-4 mb-4">
          <span>Already have an account?</span>&nbsp;
          <span
            onClick={() => navigate(LOGIN_PATH)}
            className="link-view underline cursor-pointer"
          >
            Sign In
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstname" className="form-label">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstname"
              type="text"
              {...register('firstname', {
                required: 'First name should be required',
                minLength: {
                  value: 3,
                  message: 'First name must be at least 3 characters long',
                },
                maxLength: {
                  value: 40,
                  message: 'First name cannot exceed 40 characters',
                },
              })}
              className="form-input-field"
            />
            {errors.firstname && (
              <p className="form-field-error">{errors.firstname.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              {...register('lastname', { required: 'Last name is required' })}
              className="form-input-field"
            />
            {errors.lastname && (
              <p className="form-field-error">{errors.lastname.message}</p>
            )}
          </div>

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
          <div className="mb-6">
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
            <span>By registering in, you agree to our</span>&nbsp;
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
              text="Register"
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

export default RegisterForm;
