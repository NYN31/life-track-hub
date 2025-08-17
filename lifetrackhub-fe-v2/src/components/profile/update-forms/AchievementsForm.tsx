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
import { IAchievement } from '../../../types/user';
import OnClickAddButton from '../../common/button/OnClickAddButton';
import OnSubmitButton from '../../common/button/OnSubmitButton';
import OnClickTrashIcon from '../../common/button/OnClickTrashIcon';
import SuccessMessage from '../../common/SuccessMessage';

interface AchievementsFormValues {
  achievements: IAchievement[];
}

const AchievementsForm: React.FC = () => {
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
  } = useForm<AchievementsFormValues>({
    defaultValues: { achievements: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'achievements',
  });

  useEffect(() => {
    if (data && data.userDetails?.achievements) {
      reset({ achievements: data.userDetails.achievements });
    }
  }, [data, reset]);

  const onSubmit = async (values: AchievementsFormValues) => {
    if (!data || !isDirty) return;
    const userDetails = {
      ...data.userDetails,
      achievements: values.achievements,
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
      className="space-y-8 common-box animate-fade-in"
    >
      <h3 className="text-center tracking-tight">Achievements</h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div key={field.id} className="common-box-container relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`achievements.${idx}.achievementTitle`, {
                    required: 'Title is required',
                    minLength: {
                      value: 3,
                      message: 'Title must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Title cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Title"
                />
                {errors.achievements?.[idx]?.achievementTitle && (
                  <span className="form-field-error">
                    {errors.achievements[idx]?.achievementTitle?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">Link</label>
                <input
                  {...register(`achievements.${idx}.link`, {
                    maxLength: {
                      value: 100,
                      message: 'Link cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Link (optional)"
                />
              </div>
              <div></div>
            </div>
            <div className="mt-4">
              <label className="form-label">
                Description{' '}
                <span className="text-sm text-gray-500">
                  (markdown allowed)
                </span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register(`achievements.${idx}.description`, {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters long',
                  },
                  maxLength: {
                    value: 300,
                    message: 'Description cannot exceed 300 characters',
                  },
                })}
                className="form-input-field h-24 scrollbar-hide"
                placeholder="Description"
              />
              {errors.achievements?.[idx]?.description && (
                <span className="form-field-error">
                  {errors.achievements[idx]?.description?.message}
                </span>
              )}
            </div>
            <OnClickTrashIcon handleRemover={() => remove(idx)} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <OnClickAddButton
          text="Add New Achievement"
          handleClick={() =>
            append({ achievementTitle: '', description: '', link: '' })
          }
        />
        <OnSubmitButton
          text="Submit"
          isSaving={isSaving}
          isDirty={isDirty}
          hasError={Object.keys(errors).length > 0}
        />
      </div>

      {success && <SuccessMessage />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default AchievementsForm;
