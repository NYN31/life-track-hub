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
import OnClickAddButton from '../../common/button/OnClickAddButton';
import OnSubmitButton from '../../common/button/OnSubmitButton';
import OnClickTrashIcon from '../../common/button/OnClickTrashIcon';

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
      className="space-y-8 common-box animate-fade-in"
    >
      <h3 className="text-center tracking-tight">Skills</h3>

      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div key={field.id} className="common-box-container relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">
                  Skill Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`skills.${idx}.skillName`, {
                    required: 'Skill name is required',
                    minLength: {
                      value: 3,
                      message: 'Skill name must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Skill name cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Skill Name"
                />
                {errors.skills?.[idx]?.skillName && (
                  <span className="form-field-error">
                    {errors.skills[idx]?.skillName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">
                  Experience Year<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  {...register(`skills.${idx}.skillExperienceYear`, {
                    required: 'Experience year is required',
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: 'Experience year must have minimum 0',
                    },
                    max: {
                      value: 50,
                      message: 'Experience year should not exceed 50 years',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Experience Year"
                />
                {errors.skills?.[idx]?.skillExperienceYear && (
                  <span className="form-field-error">
                    {errors.skills[idx]?.skillExperienceYear?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">
                  Competency<span className="text-red-500">*</span>
                </label>
                <select
                  {...register(`skills.${idx}.skillCompetency`, {
                    required: 'Competency is required',
                  })}
                  className="form-input-field"
                >
                  <option value="">Select Competency</option>
                  {COMPETENCY_OPTIONS.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.skills?.[idx]?.skillCompetency && (
                  <span className="form-field-error">
                    {errors.skills[idx]?.skillCompetency?.message}
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
          text="Add Skill"
          handleClick={() =>
            append({
              skillName: '',
              skillExperienceYear: 0,
              skillCompetency: '',
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

export default SkillsForm;
