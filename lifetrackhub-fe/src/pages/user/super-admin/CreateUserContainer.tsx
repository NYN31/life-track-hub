import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SimpleInputField from '../../../components/common/form/SimpleInputField';
import SimpleSelectField from '../../../components/common/form/SimpleSelectField';
import { OptionType } from '../../../types/common';
import { useCreateUserMutation } from '../../../features/user/userApi';
import { useToast } from '../../../context/toast-context';
import OnClickButton from '../../../components/common/button/OnClickButton';
import { SUPER_ADMIN_USER_LIST_PATH } from '../../../constants/title-and-paths';
import OnSubmitButton from '../../../components/common/button/OnSubmitButton';
import { EMAIL_REGEX_V2 } from '../../../constants/regex';

// Role options
const ROLE_OPTIONS: OptionType[] = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'USER', label: 'User' },
];

interface CreateUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: {
    value: string;
    label: string;
  };
}

const CreateUserContainer: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [createUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateUserFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role.value,
      }).unwrap();

      toast('User created successfully', 'success', 3000);
      reset();
      navigate(SUPER_ADMIN_USER_LIST_PATH);
    } catch (error: any) {
      toast(error?.data?.message || 'Failed to create user', 'error', 3000);
    }
  };

  return (
    <div className="common-box-container">
      <h1>Create New User</h1>
      <div className="common-box">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SimpleInputField
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
              register={register}
              validation={{
                required: 'First name is required',
                minLength: {
                  value: 3,
                  message: 'First name must be at least 3 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'First name must not exceed 40 characters',
                },
              }}
              error={errors.firstName?.message}
            />

            <SimpleInputField
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              register={register}
              validation={{
                maxLength: {
                  value: 40,
                  message: 'Last name must not exceed 40 characters',
                },
              }}
              error={errors.lastName?.message}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SimpleInputField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email address"
              required
              register={register}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: EMAIL_REGEX_V2,
                  message: 'Invalid email address',
                },
              }}
              error={errors.email?.message}
            />

            <SimpleSelectField
              id="role"
              name="role"
              label="Role"
              options={ROLE_OPTIONS}
              required
              register={register}
              setValue={setValue}
              error={errors.role?.message}
            />
          </div>

          <div className="flex gap-4 justify-end mt-6">
            <OnClickButton
              action={() => navigate(SUPER_ADMIN_USER_LIST_PATH)}
              text="Cancel"
            />
            <OnSubmitButton
              text="Create User"
              isSaving={isSubmitting}
              isDirty={true}
              hasError={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserContainer;
