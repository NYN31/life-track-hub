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
import OnClickAddButton from '../../common/button/OnClickAddButton';
import OnSubmitButton from '../../common/button/OnSubmitButton';
import OnClickTrashIcon from '../../common/button/OnClickTrashIcon';

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
    watch,
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
      className="space-y-8 common-box animate-fade-in"
    >
      <h3 className="text-center tracking-tight">Educations</h3>
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div key={field.id} className="common-box-container relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Institution Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`educations.${idx}.institutionName`, {
                    required: 'Institution name is required',
                    minLength: {
                      value: 3,
                      message:
                        'Institution name must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Institution name cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Institution Name"
                />
                {errors.educations?.[idx]?.institutionName && (
                  <span className="form-field-error">
                    {errors.educations[idx]?.institutionName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">
                  Course Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`educations.${idx}.courseName`, {
                    required: 'Course name is required',
                    minLength: {
                      value: 3,
                      message: 'Course name must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Course name cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Course Name"
                />
                {errors.educations?.[idx]?.courseName && (
                  <span className="form-field-error">
                    {errors.educations[idx]?.courseName?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-3 inline-block">
              <label className="form-label flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register(`educations.${idx}.isPresent`)}
                  className="h-4 w-4 cursor-pointer"
                />
                I'm currently present
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <label className="form-label">
                  Start Year<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register(`educations.${idx}.startYear`, {
                    required: 'Start year is required',
                    valueAsNumber: true,
                    min: {
                      value: 1900,
                      message: 'Year must be after 1900',
                    },
                    max: {
                      value: new Date().getFullYear(),
                      message: `Year cannot be after ${new Date().getFullYear()}`,
                    },
                  })}
                  className="form-input-field"
                  placeholder="Start Year"
                />
                {errors.educations?.[idx]?.startYear && (
                  <span className="form-field-error">
                    {errors.educations[idx]?.startYear?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">End Year</label>
                {watch(`educations.${idx}.isPresent`) ? (
                  <input
                    type="number"
                    key="disabled-input"
                    disabled={true}
                    className="form-readonly-input-field"
                    placeholder="End Year"
                  />
                ) : (
                  <input
                    type="number"
                    key="enabled-input"
                    disabled={false}
                    {...register(`educations.${idx}.endYear`, {
                      valueAsNumber: true,
                      min: {
                        value: 1900,
                        message: 'Year must be after 1900',
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: `Year cannot be after ${new Date().getFullYear()}`,
                      },
                    })}
                    className="form-input-field"
                    placeholder="End Year"
                  />
                )}
                {errors.educations?.[idx]?.endYear && (
                  <span className="form-field-error">
                    {errors.educations[idx]?.endYear?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">Result</label>
                <input
                  type="number"
                  step="any"
                  {...register(`educations.${idx}.result`, {
                    required: 'Result is required',
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: 'GPA must be minimum 1',
                    },
                    max: {
                      value: 5,
                      message: 'GPA must not be greater than 5',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Result"
                />
                {errors.educations?.[idx]?.result && (
                  <span className="form-field-error">
                    {errors.educations[idx]?.result?.message}
                  </span>
                )}
              </div>
            </div>
            <OnClickTrashIcon handleRemover={() => remove(idx)} />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <OnClickAddButton
          text="Add New Education"
          handleClick={() =>
            append({
              institutionName: '',
              courseName: '',
              isPresent: true,
              startYear: new Date().getFullYear(),
              endYear: new Date().getFullYear(),
              result: 0,
            })
          }
        />
        <OnSubmitButton text="Submit" isSaving={isSaving} isDirty={isDirty} />
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

export default EducationForm;
