import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterFormInputs } from '../../types/auth';
import { EMAIL_REGEX_V2 } from '../../constants/regex';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/title-and-paths';
import { useRegistrationMutation } from '../../features/auth/authApi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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
    <div className="h-screen bg-gray-100">
      <div className="flex justify-center p-4 md:p-20">
        <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Register
          </h2>

          <div className="flex items-center justify-center text-sm text-gray-500 mt-4 mb-4">
            <span>Already have an account?</span>&nbsp;
            <span
              onClick={() => navigate(LOGIN_PATH)}
              className="text-blue-600 underline cursor-pointer"
            >
              Sign In
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                {...register('firstname', {
                  required: 'First name is required',
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstname
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.firstname && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                {...register('lastname', { required: 'Last name is required' })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastname
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.lastname && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>

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
            <div className="mb-6">
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
              <span>By registering in, you agree to our</span>&nbsp;
              <span
                onClick={() => navigate('/')}
                className="text-blue-600 underline cursor-pointer"
              >
                Terms and Conditions
              </span>
            </p>

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className={`w-full py-2 rounded-lg transition duration-200 ${
                isLoading || !isValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              }`}
            >
              {isLoading ? 'Register in...' : 'Register'}
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

export default RegisterForm;
