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
import { ISkill } from '../../../types/user';
import { FiTrash } from 'react-icons/fi';
import OnClickAddButton from '../../common/button/OnClickAddButton';
import OnSubmitButton from '../../common/button/OnSubmitButton';

const COMPETENCY_OPTIONS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

interface SkillsFormValues {
  skills: ISkill[];
}

const SkillsForm: React.FC = () => {
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
  } = useForm<SkillsFormValues>({
    defaultValues: { skills: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  useEffect(() => {
    if (data && data.userDetails?.skills) {
      reset({ skills: data.userDetails.skills });
    }
  }, [data, reset]);

  const onSubmit = async (values: SkillsFormValues) => {
    if (!data || !isDirty) return;
    const userDetails = {
      ...data.userDetails,
      skills: values.skills,
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
        Skills
      </h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="border p-5 rounded-xl bg-white dark:bg-gray-900 border-purple-200 dark:border-gray-700 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Skill Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`skills.${idx}.skillName`, {
                    required: 'Skill name is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Skill Name"
                />
                {errors.skills?.[idx]?.skillName && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.skills[idx]?.skillName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Experience Year<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register(`skills.${idx}.skillExperienceYear`, {
                    required: 'Experience year is required',
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Experience Year"
                />
                {errors.skills?.[idx]?.skillExperienceYear && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.skills[idx]?.skillExperienceYear?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  Competency<span className="text-red-500">*</span>
                </label>
                <select
                  {...register(`skills.${idx}.skillCompetency`, {
                    required: 'Competency is required',
                  })}
                  className="mt-1 block w-full border border-purple-200 dark:border-gray-700 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Competency</option>
                  {COMPETENCY_OPTIONS.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.skills?.[idx]?.skillCompetency && (
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    {errors.skills[idx]?.skillCompetency?.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
              title="Remove Skill"
            >
              <FiTrash className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <OnClickAddButton
          text="Add Skill"
          handleClick={() =>
            append({
              skillName: '',
              skillExperienceYear: 0,
              skillCompetency: '',
            })
          }
        />
        <OnSubmitButton
          text="Submit Skills"
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

export default SkillsForm;
