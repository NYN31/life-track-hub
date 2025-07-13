import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../../features/user/userApi';
import { setUser } from '../../../features/user/userSlice';
import Spinner from '../../common/Spinner';
import ErrorMessage from '../../common/ErrorMessage';
import { FiTrash } from 'react-icons/fi';

interface SocialLink {
  socialPlatformName: string;
  link: string;
}

interface SocialLinksFormValues {
  socialLinks: SocialLink[];
}

const SocialLinksForm: React.FC = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const { data, isLoading, error: fetchError } = useGetProfileQuery(email);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SocialLinksFormValues>({
    defaultValues: { socialLinks: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  useEffect(() => {
    if (data && data.userDetails?.socialLinks) {
      reset({ socialLinks: data.userDetails.socialLinks });
    }
  }, [data, reset]);

  const onSubmit = async (values: SocialLinksFormValues) => {
    if (!data || !isDirty) return;
    const userDetails = {
      ...data.userDetails,
      socialLinks: values.socialLinks,
    };
    const payload = {
      ...data,
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
      className="space-y-8 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 dark:border-gray-700 animate-fade-in"
    >
      <h3 className="text-3xl font-extrabold mb-6 text-purple-700 dark:text-purple-300 text-center tracking-tight">
        Social Links
      </h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="border p-5 rounded-xl bg-purple-50/30 dark:bg-gray-900 border-purple-200 dark:border-gray-700 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Platform Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`socialLinks.${idx}.socialPlatformName`, {
                    required: 'Platform name is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Platform Name"
                />
                {errors.socialLinks?.[idx]?.socialPlatformName && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.socialLinks[idx]?.socialPlatformName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Link<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`socialLinks.${idx}.link`, {
                    required: 'Link is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Link"
                />
                {errors.socialLinks?.[idx]?.link && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.socialLinks[idx]?.link?.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
              title="Remove Social Link"
            >
              <FiTrash className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ socialPlatformName: '', link: '' })}
          className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 text-white rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-green-600 dark:hover:from-green-800 dark:hover:to-green-700 transition w-full flex items-center justify-center gap-2"
        >
          <span>➕ Add Social Link</span>
        </button>
      </div>
      <button
        type="submit"
        className={`px-8 py-3 rounded-xl w-full font-bold text-lg shadow-lg tracking-wide flex items-center justify-center gap-2 transition
        ${
          isSaving || !isDirty
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-700 dark:to-purple-600 text-white hover:from-purple-700 hover:to-purple-600 dark:hover:from-purple-800 dark:hover:to-purple-700'
        }`}
        disabled={isSaving || !isDirty}
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <Spinner /> Saving...
          </span>
        ) : (
          <span>💾 Save Social Links</span>
        )}
      </button>
      {success && (
        <div className="text-green-600 dark:text-green-400 mt-4 text-center font-semibold animate-fade-in">
          Saved!
        </div>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default SocialLinksForm;
