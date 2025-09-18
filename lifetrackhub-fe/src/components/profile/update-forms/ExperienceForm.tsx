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
import OnClickAddButton from '../../common/button/OnClickAddButton';
import OnSubmitButton from '../../common/button/OnSubmitButton';
import OnClickTrashIcon from '../../common/button/OnClickTrashIcon';

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
      className="space-y-8 common-box animate-fade-in"
    >
      <h3 className="text-center tracking-tight">Experience</h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div key={field.id} className="common-box-container relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Organization<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`experiences.${idx}.organizationName`, {
                    required: 'Organization name is required',
                    minLength: {
                      value: 3,
                      message:
                        'Organization name must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Organization name cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Organization Name"
                />
                {errors.experiences?.[idx]?.organizationName && (
                  <span className="form-field-error">
                    {errors.experiences[idx]?.organizationName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">
                  Designation<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`experiences.${idx}.designation`, {
                    required: 'Designation is required',
                    minLength: {
                      value: 3,
                      message: 'Designation must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Designation cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Designation"
                />
                {errors.experiences?.[idx]?.designation && (
                  <span className="form-field-error">
                    {errors.experiences[idx]?.designation?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="form-label">
                  Start Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register(`experiences.${idx}.startDate`, {
                    required: 'Start date is required',
                  })}
                  className="form-input-field"
                  placeholder="Start Date"
                />
                {errors.experiences?.[idx]?.startDate && (
                  <span className="form-field-error">
                    {errors.experiences[idx]?.startDate?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  {...register(`experiences.${idx}.endDate`)}
                  className="form-input-field"
                  placeholder="End Date"
                />
              </div>
              <div>
                <label className="form-label">Link</label>
                <input
                  {...register(`experiences.${idx}.link`, {
                    maxLength: {
                      value: 100,
                      message: 'Link cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Link (optional)"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="form-label">
                Description{' '}
              </label>
              <textarea
                {...register(`experiences.${idx}.description`, {
                  maxLength: {
                    value: 2000,
                    message: 'Description cannot exceed 2000 characters',
                  },
                })}
                className="form-input-field h-24 scrollbar-hide"
                placeholder="Description (optional)"
              />
              {errors.experiences?.[idx]?.description && (
                <span className="form-field-error">
                  {errors.experiences[idx]?.description?.message}
                </span>
              )}
            </div>
            <OnClickTrashIcon handleRemover={() => remove(idx)} />
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
          text="Submit"
          isSaving={isSaving}
          isDirty={isDirty}
          hasError={Object.keys(errors).length > 0}
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
