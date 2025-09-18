import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginFormInputs } from '../../types/auth';
import { EMAIL_REGEX_V2 } from '../../constants/regex';
import { useNavigate } from 'react-router-dom';
import { useUserVerifyMutation } from '../../features/auth/authApi';
import { LOGIN_PATH, REGISTRATION_PATH } from '../../constants/title-and-paths';
import OnSubmitButton from '../../components/common/button/OnSubmitButton';
import { useToast } from '../../context/toast-context';
import useQuery from '../../helper/hooks/useQuery';

const UserVerifyFormContainer: React.FC = () => {
  const token = useQuery().get('token') || '';
  const navigate = useNavigate();
  const toast = useToast();

  const [errorMessage, setErrorMessage] = useState('');

  const [verifyUser, { isLoading: isVerifyUserLoading }] =
    useUserVerifyMutation();

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
    await verifyUser({
      verifyToken: token || '',
      email: data.email,
    })
      .unwrap()
      .then(res => {
        toast(res.message, 'success');
        localStorage.setItem('email', data.email);
        navigate(LOGIN_PATH, { replace: true });
      })
      .catch(error => {
        setErrorMessage(error?.data?.message);
      });
  };

  return (
    <div className="flex justify-center p-4 md:p-20">
      <div className="common-box p-2 md:p-4 lg:p-6 xl:p-8 w-full max-w-lg">
        <h2 className="text-center">Verify Account</h2>

        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-300 my-4">
          <span>Didn't create an account?</span>&nbsp;
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

          {/* Submit */}
          <div className="flex justify-end">
            <OnSubmitButton
              text="Verify"
              isSaving={isVerifyUserLoading}
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

export default UserVerifyFormContainer;
