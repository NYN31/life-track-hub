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
import OnSubmitButton from '../../common/button/OnSubmitButton';
import OnClickAddButton from '../../common/button/OnClickAddButton';
import OnClickTrashIcon from '../../common/button/OnClickTrashIcon';

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
      className="space-y-8 common-box animate-fade-in"
    >
      <h3 className="text-center tracking-tight">Social Links</h3>

      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div key={field.id} className="common-box-container relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Platform Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`socialLinks.${idx}.socialPlatformName`, {
                    required: 'Platform name is required',
                    minLength: {
                      value: 3,
                      message:
                        'Platform name must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Platform name cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Platform Name"
                />
                {errors.socialLinks?.[idx]?.socialPlatformName && (
                  <span className="form-field-error">
                    {errors.socialLinks[idx]?.socialPlatformName?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="form-label">
                  Link<span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`socialLinks.${idx}.link`, {
                    required: 'Link is required',
                    minLength: {
                      value: 3,
                      message: 'Link must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Link cannot exceed 100 characters',
                    },
                  })}
                  className="form-input-field"
                  placeholder="Link"
                />
                {errors.socialLinks?.[idx]?.link && (
                  <span className="form-field-error">
                    {errors.socialLinks[idx]?.link?.message}
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
          text="Add New Social Link"
          handleClick={() => append({ socialPlatformName: '', link: '' })}
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

export default SocialLinksForm;
