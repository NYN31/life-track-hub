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
import OnSubmitButton from '../../common/button/OnSubmitButton';
import SuccessMessage from '../../common/SuccessMessage';

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

  let readOnlyValues = [
    {
      fieldName: 'Email',
      value: data?.email,
    },
    { fieldName: 'Role', value: data?.role },
    { fieldName: 'Account Status', value: data?.accountStatus },
    { fieldName: 'Account Type', value: data?.accountType },
    { fieldName: 'Login Type', value: data?.loginType },
  ];

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
      className="space-y-8 common-box animate-fade-in"
    >
      <h3 className="text-center tracking-tight">Personal Details</h3>

      {/* Editable fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstname" className="form-label">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            id="firstname"
            {...register('firstname', {
              required: 'First name should be required',
              minLength: {
                value: 3,
                message: 'First name must be at least 3 characters long',
              },
              maxLength: {
                value: 40,
                message: 'First name cannot exceed 40 characters',
              },
            })}
            className="form-input-field"
          />
          {errors.firstname && (
            <span className="form-field-error">{errors.firstname.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            id="lastname"
            {...register('lastname')}
            className="form-input-field"
          />
          {errors.lastname && (
            <span className="form-field-error">{errors.lastname.message}</span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="objective" className="form-label">
          Objective
        </label>
        <textarea
          id="objective"
          {...register('objective', {
            maxLength: {
              value: 1000,
              message: 'Description cannot exceed 1000 characters',
            },
          })}
          className="form-input-field h-24 scrollbar-hide"
          rows={4}
        />
        {errors.objective && (
          <span className="form-field-error">{errors.objective.message}</span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {' '}
        <div>
          <label htmlFor="profileImagePath" className="form-label">
            Profile Image URL
          </label>
          <input
            id="profileImagePath"
            {...register('profileImagePath', {
              maxLength: {
                value: 150,
                message: 'Profile image path cannot exceed 150 characters',
              },
            })}
            className="form-input-field"
          />
          {errors.profileImagePath && (
            <span className="form-field-error">
              {errors.profileImagePath.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="cvPdfPath" className="form-label">
            CV/Resume URL
          </label>
          <input
            id="cvPdfPath"
            {...register('cvPdfPath', {
              maxLength: {
                value: 150,
                message: 'Cv PDF path cannot exceed 150 characters',
              },
            })}
            className="form-input-field"
          />
          {errors.cvPdfPath && (
            <span className="form-field-error">{errors.cvPdfPath.message}</span>
          )}
        </div>
      </div>

      {/* Readonly fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {readOnlyValues.map(inputField => (
          <div>
            <label className="form-label">{inputField.fieldName}</label>
            <input
              value={inputField.value || ''}
              readOnly
              className="form-readonly-input-field"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
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

export default PersonalDetailsForm;
