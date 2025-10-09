import React from 'react';
import { useForm } from 'react-hook-form';
import { USER_ROLE_OPTIONS } from '../../../constants/select-options/user-options';
import { useUpdateUserRoleMutation } from '../../../features/user/userApi';
import { useToast } from '../../../context/toast-context';
import { IUser } from '../../../types/user';
import OnSubmitButton from '../../common/button/OnSubmitButton';
import SimpleSelectField from '../../common/form/SimpleSelectField';

interface RoleUpdateProps {
  email: string;
  user: IUser;
}

interface FormData {
  role: {
    value: string;
    label: string;
  };
}

const RoleUpdate: React.FC<RoleUpdateProps> = ({ email, user }) => {
  const toast = useToast();
  const [updateRole, { isLoading }] = useUpdateUserRoleMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      role: USER_ROLE_OPTIONS.find(option => option.value === user.role) || {
        value: '',
        label: '',
      },
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateRole({ email, role: data.role.value }).unwrap();
      // Reset the form with the new value as default to clear dirty state
      reset({
        role: data.role,
      });
      toast('Role updated successfully', 'success', 3000);
    } catch (error: any) {
      toast(error?.data?.message || 'Failed to update role', 'error', 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <label className="form-label">Update Role</label>
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <SimpleSelectField
            id="role"
            name="role"
            label=""
            options={USER_ROLE_OPTIONS}
            defaultValue={USER_ROLE_OPTIONS.find(
              option => option.value === user.role
            )}
            register={register}
            setValue={setValue}
            trigger={trigger}
            error={errors.role?.message}
          />
        </div>

        <div>
          <OnSubmitButton
            height="47px"
            text="Update"
            isSaving={isLoading}
            isDirty={isDirty}
            hasError={false}
          />
        </div>
      </div>
    </form>
  );
};

export default RoleUpdate;
