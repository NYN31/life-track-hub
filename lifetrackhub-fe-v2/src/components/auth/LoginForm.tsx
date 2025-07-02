import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginFormInputs } from '../../types/auth';
import { EMAIL_REGEX_V2 } from '../../constants/regex';
import { useNavigate } from 'react-router-dom';
import useLoginCredentialStore from '../../helper/hooks/useLoginCredentialStore';
import { useLoginMutation } from '../../features/auth/authApi';
import { REGISTRATION_PATH } from '../../constants/title-and-paths';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center p-4 md:p-20">
        <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Login
          </h2>

          <div className="flex items-center justify-center text-sm text-gray-500 mt-4 mb-4">
            <span>Don't have an account?</span>&nbsp;
            <span
              onClick={() => navigate(REGISTRATION_PATH)}
              className="text-blue-600 underline cursor-pointer"
            >
              Sign Up
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                />
                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <p className="flex text-sm text-gray-500 mt-4 mb-2">
              <span>By logging in, you agree to our</span>&nbsp;
              <span
                onClick={() => navigate('/')}
                className="text-blue-600 underline cursor-pointer"
              >
                Terms and Conditions
              </span>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className={`w-full py-2 rounded-lg transition duration-200 ${
                isLoading || !isValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              }`}
            >
              {isLoading ? 'Loggin in...' : 'Login'}
            </button>

            {errorMessage && (
              <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
