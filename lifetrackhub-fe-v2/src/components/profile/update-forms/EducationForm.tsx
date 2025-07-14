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
import { IEducation } from '../../../types/user';
import { FiTrash } from 'react-icons/fi';

interface EducationFormValues {
  educations: IEducation[];
}

const EducationForm: React.FC = () => {
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
  } = useForm<EducationFormValues>({
    defaultValues: { educations: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  useEffect(() => {
    if (data && data.userDetails?.educations) {
      reset({ educations: data.userDetails.educations });
    }
  }, [data, reset]);

  const onSubmit = async (values: EducationFormValues) => {
    if (!data || !isDirty) return;
    const userDetails = {
      ...data.userDetails,
      educations: values.educations,
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
        Education
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
                  Institution Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`educations.${idx}.institutionName`, {
                    required: 'Institution is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Institution Name"
                />
                {errors.educations?.[idx]?.institutionName && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.educations[idx]?.institutionName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Course Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`educations.${idx}.courseName`, {
                    required: 'Course name is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Course Name"
                />
                {errors.educations?.[idx]?.courseName && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.educations[idx]?.courseName?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Start Year<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register(`educations.${idx}.startYear`, {
                    required: 'Start year is required',
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Start Year"
                />
                {errors.educations?.[idx]?.startYear && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.educations[idx]?.startYear?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  End Year
                </label>
                <input
                  type="number"
                  {...register(`educations.${idx}.endYear`, {
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="End Year"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Result
                </label>
                <input
                  type="number"
                  {...register(`educations.${idx}.result`, {
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Result"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
              title="Remove Education"
            >
              <FiTrash className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              institutionName: '',
              courseName: '',
              startYear: new Date().getFullYear(),
              endYear: new Date().getFullYear(),
              result: 0,
            })
          }
          className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 text-white rounded-xl font-semibold shadow-md hover:from-green-700 hover:to-green-600 dark:hover:from-green-800 dark:hover:to-green-700 transition w-full flex items-center justify-center gap-2"
        >
          <span>➕ Add Education</span>
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
          <span>💾 Save Education</span>
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

export default EducationForm;
