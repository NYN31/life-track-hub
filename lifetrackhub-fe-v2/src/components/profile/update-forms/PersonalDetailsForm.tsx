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
      className="space-y-8 max-w-2xl bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-10 border border-purple-100 mx-auto animate-fade-in"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700 text-center tracking-tight">
        Personal Details
      </h2>
      {/* Readonly fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-base font-semibold text-gray-700">
            Email
          </label>
          <input
            value={data?.email || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700">
            Role
          </label>
          <input
            value={data?.role || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700">
            Account Status
          </label>
          <input
            value={data?.accountStatus || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700">
            Account Type
          </label>
          <input
            value={data?.accountType || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-700">
            Login Type
          </label>
          <input
            value={data?.loginType || ''}
            readOnly
            className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>
      {/* Editable fields */}
      <div className="space-y-3">
        <label
          htmlFor="firstname"
          className="block text-base font-semibold text-gray-700"
        >
          First Name
        </label>
        <input
          id="firstname"
          {...register('firstname')}
          className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        {errors.firstname && (
          <span className="text-red-500 text-sm">
            {errors.firstname.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="lastname"
          className="block text-base font-semibold text-gray-700"
        >
          Last Name
        </label>
        <input
          id="lastname"
          {...register('lastname')}
          className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        {errors.lastname && (
          <span className="text-red-500 text-sm">
            {errors.lastname.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="objective"
          className="block text-base font-semibold text-gray-700"
        >
          Objective
        </label>
        <textarea
          id="objective"
          {...register('objective')}
          className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          rows={4}
        />
        {errors.objective && (
          <span className="text-red-500 text-sm">
            {errors.objective.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="profileImagePath"
          className="block text-base font-semibold text-gray-700"
        >
          Profile Image URL
        </label>
        <input
          id="profileImagePath"
          {...register('profileImagePath')}
          className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        {errors.profileImagePath && (
          <span className="text-red-500 text-sm">
            {errors.profileImagePath.message}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <label
          htmlFor="cvPdfPath"
          className="block text-base font-semibold text-gray-700"
        >
          CV/Resume URL
        </label>
        <input
          id="cvPdfPath"
          {...register('cvPdfPath')}
          className="mt-1 block w-full border border-purple-200 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        {errors.cvPdfPath && (
          <span className="text-red-500 text-sm">
            {errors.cvPdfPath.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className={`px-8 py-3 rounded-xl w-full font-bold text-lg shadow-lg tracking-wide flex items-center justify-center gap-2 transition
          ${
            isSaving || !isDirty
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
          }`}
        disabled={isSaving || !isDirty}
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <Spinner /> Saving...
          </span>
        ) : (
          <span>💾 Save Details</span>
        )}
      </button>
      {success && (
        <div className="text-green-600 mt-4 text-center font-semibold animate-fade-in">
          Saved!
        </div>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default PersonalDetailsForm;
