import React from 'react';
import { useForm } from 'react-hook-form';
import { USER_STATUS_OPTIONS } from '../../../constants/select-options/user-options';
import { useUpdateUserAccountStatusMutation } from '../../../features/user/userApi';
import { useToast } from '../../../context/toast-context';
import { IUser } from '../../../types/user';
import OnSubmitButton from '../../common/button/OnSubmitButton';
import SimpleSelectField from '../../common/form/SimpleSelectField';

interface StatusUpdateProps {
  email: string;
  user: IUser;
}

interface FormData {
  status: {
    value: string;
    label: string;
  };
}

const StatusUpdate: React.FC<StatusUpdateProps> = ({ email, user }) => {
  const toast = useToast();
  const [updateStatus, { isLoading }] = useUpdateUserAccountStatusMutation();

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
      status: USER_STATUS_OPTIONS.find(
        option => option.value === user.accountStatus
      ) || { value: '', label: '' },
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateStatus({ email, status: data.status.value }).unwrap();
      // Reset the form with the new value as default to clear dirty state
      reset({
        status: data.status,
      });
      toast('Status updated successfully', 'success', 3000);
    } catch (error: any) {
      toast(error?.data?.message || 'Failed to update status', 'error', 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <label className="form-label">Update Status</label>
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <SimpleSelectField
            id="status"
            name="status"
            label=""
            options={USER_STATUS_OPTIONS}
            defaultValue={USER_STATUS_OPTIONS.find(
              option => option.value === user.accountStatus
            )}
            register={register}
            setValue={setValue}
            trigger={trigger}
            error={errors.status?.message}
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

export default StatusUpdate;
