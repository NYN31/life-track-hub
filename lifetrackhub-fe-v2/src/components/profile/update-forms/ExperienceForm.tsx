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
import { IExperience } from '../../../types/user';
import { FiTrash } from 'react-icons/fi';
import OnClickAddButton from '../../common/button/OnClickAddButton';
import OnSubmitButton from '../../common/button/OnSubmitButton';

interface ExperienceFormValues {
  experiences: IExperience[];
}

const ExperienceForm: React.FC = () => {
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
  } = useForm<ExperienceFormValues>({
    defaultValues: { experiences: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  useEffect(() => {
    if (data && data.userDetails?.experiences) {
      reset({ experiences: data.userDetails.experiences });
    }
  }, [data, reset]);

  const onSubmit = async (values: ExperienceFormValues) => {
    if (!data || !isDirty) return;
    const userDetails = {
      ...data.userDetails,
      experiences: values.experiences,
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
      className="space-y-8 bg-gray-50 dark:bg-gray-800 shadow-sm rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 dark:border-gray-700 animate-fade-in"
    >
      <h3 className="text-3xl font-extrabold mb-6 text-purple-700 dark:text-purple-300 text-center tracking-tight">
        Experience
      </h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="border p-5 rounded-xl bg-white dark:bg-gray-900 border-purple-200 dark:border-gray-700 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Organization<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`experiences.${idx}.organizationName`, {
                    required: 'Organization is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Organization Name"
                />
                {errors.experiences?.[idx]?.organizationName && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.experiences[idx]?.organizationName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Designation<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`experiences.${idx}.designation`, {
                    required: 'Designation is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Designation"
                />
                {errors.experiences?.[idx]?.designation && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.experiences[idx]?.designation?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Start Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register(`experiences.${idx}.startDate`, {
                    required: 'Start date is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Start Date"
                />
                {errors.experiences?.[idx]?.startDate && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.experiences[idx]?.startDate?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  End Date
                </label>
                <input
                  type="date"
                  {...register(`experiences.${idx}.endDate`)}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="End Date"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Link
                </label>
                <input
                  {...register(`experiences.${idx}.link`)}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Link (optional)"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                Description
              </label>
              <input
                {...register(`experiences.${idx}.description`)}
                className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Description (optional)"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
              title="Remove Experience"
            >
              <FiTrash className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <OnClickAddButton
          text="Add New Experience"
          handleClick={() =>
            append({
              organizationName: '',
              designation: '',
              description: '',
              startDate: '',
              endDate: '',
              link: '',
            })
          }
        />
        <OnSubmitButton
          text="Submit Experiences"
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

export default ExperienceForm;
