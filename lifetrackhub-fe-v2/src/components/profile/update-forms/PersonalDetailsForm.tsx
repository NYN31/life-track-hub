import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../../features/user/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/user/userSlice';
import Spinner from '../../common/Spinner';
import ErrorMessage from '../../common/ErrorMessage';
import OnSubmitButton from '../../common/button/OnSubmitButton';

interface PersonalDetailsFormValues {
  firstname: string;
  lastname: string;
  objective: string;
  profileImagePath: string;
  cvPdfPath: string;
}

const PersonalDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading, error: fetchError } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PersonalDetailsFormValues>({
    defaultValues: {
      firstname: '',
      lastname: '',
      objective: '',
      profileImagePath: '',
      cvPdfPath: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        objective: data.userDetails?.objective || '',
        profileImagePath: data.userDetails?.profileImagePath || '',
        cvPdfPath: data.userDetails?.cvPdfPath || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: PersonalDetailsFormValues) => {
    if (!data || !isDirty) return;
    const userDetails = {
      ...data.userDetails,
      objective: values.objective,
      profileImagePath: values.profileImagePath,
      cvPdfPath: values.cvPdfPath,
    };
    const payload = {
      ...data,
      firstname: values.firstname,
      lastname: values.lastname,
      userDetails,
    };
    await updateProfile(payload)
      .unwrap()
      .then(result => {
        dispatch(setUser(result));
        setSuccess(true);
        setErrorMessage('');
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch(err => {
        setErrorMessage(err?.data?.message || 'Failed to update profile.');
      });
  };

  React.useEffect(() => {
    if (fetchError) {
      setErrorMessage('Failed to fetch profile data.');
    }
  }, [fetchError]);

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-gray-50 dark:bg-gray-800 shadow-sm rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 dark:border-gray-700 animate-fade-in"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700 dark:text-purple-300 text-center tracking-tight">
        Personal Details
      </h2>
      {/* Readonly fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            value={data?.email || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
            Role
          </label>
          <input
            value={data?.role || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
            Account Status
          </label>
          <input
            value={data?.accountStatus || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
            Account Type
          </label>
          <input
            value={data?.accountType || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
            Login Type
          </label>
          <input
            value={data?.loginType || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
          />
        </div>
      </div>
      {/* Editable fields */}
      <div className="space-y-3">
        <label
          htmlFor="firstname"
          className="block text-base font-semibold text-gray-700 dark:text-gray-200"
        >
          First Name
        </label>
        <input
          id="firstname"
          {...register('firstname')}
          className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />
        {errors.firstname && (
          <span className="text-red-500 dark:text-red-400 text-sm">
            {errors.firstname.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="lastname"
          className="block text-base font-semibold text-gray-700 dark:text-gray-200"
        >
          Last Name
        </label>
        <input
          id="lastname"
          {...register('lastname')}
          className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />
        {errors.lastname && (
          <span className="text-red-500 dark:text-red-400 text-sm">
            {errors.lastname.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="objective"
          className="block text-base font-semibold text-gray-700 dark:text-gray-200"
        >
          Objective
        </label>
        <textarea
          id="objective"
          {...register('objective')}
          className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          rows={4}
        />
        {errors.objective && (
          <span className="text-red-500 dark:text-red-400 text-sm">
            {errors.objective.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="profileImagePath"
          className="block text-base font-semibold text-gray-700 dark:text-gray-200"
        >
          Profile Image URL
        </label>
        <input
          id="profileImagePath"
          {...register('profileImagePath')}
          className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />
        {errors.profileImagePath && (
          <span className="text-red-500 dark:text-red-400 text-sm">
            {errors.profileImagePath.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="cvPdfPath"
          className="block text-base font-semibold text-gray-700 dark:text-gray-200"
        >
          CV/Resume URL
        </label>
        <input
          id="cvPdfPath"
          {...register('cvPdfPath')}
          className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />
        {errors.cvPdfPath && (
          <span className="text-red-500 dark:text-red-400 text-sm">
            {errors.cvPdfPath.message}
          </span>
        )}
      </div>
      <div className="flex justify-end">
        <OnSubmitButton
          text="Submit Personal Details"
          isSaving={isSaving}
          isDirty={isDirty}
        />
      </div>
      {success && (
        <div className="text-green-600 dark:text-green-400 mt-4 text-center font-semibold animate-fade-in">
          Saved!
        </div>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default PersonalDetailsForm;
