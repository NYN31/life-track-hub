import React from 'react';
import { useForm } from 'react-hook-form';
import { USER_ACCOUNT_TYPE_OPTIONS } from '../../../constants/select-options/user-options';
import { useUpdateUserAccountTypeMutation } from '../../../features/user/userApi';
import { useToast } from '../../../context/toast-context';
import { IUser } from '../../../types/user';
import OnSubmitButton from '../../common/button/OnSubmitButton';
import SimpleSelectField from '../../common/form/SimpleSelectField';

interface AccountTypeUpdateProps {
  email: string;
  user: IUser;
}

interface FormData {
  accountType: {
    value: string;
    label: string;
  };
}

const AccountTypeUpdate: React.FC<AccountTypeUpdateProps> = ({
  email,
  user,
}) => {
  const toast = useToast();
  const [updateType, { isLoading }] = useUpdateUserAccountTypeMutation();

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
      accountType: USER_ACCOUNT_TYPE_OPTIONS.find(
        option => option.value === user.accountType
      ) || { value: '', label: '' },
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateType({ email, type: data.accountType.value }).unwrap();
      // Reset the form with the new value as default to clear dirty state
      reset({
        accountType: data.accountType,
      });
      toast('Account type updated successfully', 'success', 3000);
    } catch (error: any) {
      toast(
        error?.data?.message || 'Failed to update account type',
        'error',
        3000
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <label className="form-label">Update Account Type</label>
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <SimpleSelectField
            id="accountType"
            name="accountType"
            label=""
            options={USER_ACCOUNT_TYPE_OPTIONS}
            defaultValue={USER_ACCOUNT_TYPE_OPTIONS.find(
              option => option.value === user.accountType
            )}
            register={register}
            setValue={setValue}
            trigger={trigger}
            error={errors.accountType?.message}
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

export default AccountTypeUpdate;
