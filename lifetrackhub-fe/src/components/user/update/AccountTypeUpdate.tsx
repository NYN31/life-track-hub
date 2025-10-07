import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { OptionType } from '../../../types/common';
import { getCustomSelectStyles } from '../../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../../helper/hooks/useDarkMode';
import { USER_ACCOUNT_TYPE_OPTIONS } from '../../../constants/select-options/user-options';
import { useUpdateUserAccountTypeMutation } from '../../../features/user/userApi';
import { useToast } from '../../../context/toast-context';
import { IUser } from '../../../types/user';
import OnClickButton from '../../common/button/OnClickButton';
import { MdUpdate } from 'react-icons/md';

interface AccountTypeUpdateProps {
  email: string;
  user: IUser;
}

const AccountTypeUpdate: React.FC<AccountTypeUpdateProps> = ({
  email,
  user,
}) => {
  const isDark = useDarkMode();
  const toast = useToast();
  const [updateType, { isLoading }] = useUpdateUserAccountTypeMutation();
  const [selectedType, setSelectedType] = useState<OptionType | null>(null);

  useEffect(() => {
    if (user?.accountType) {
      const typeOption = USER_ACCOUNT_TYPE_OPTIONS.find(
        (option: OptionType) => option.value === user.accountType
      );
      setSelectedType(typeOption || null);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!selectedType) return;

    await updateType({ email, type: selectedType.value })
      .unwrap()
      .then(() => {
        toast('Account type updated successfully', 'success', 3000);
      })
      .catch(error => {
        toast(
          error?.data?.message || 'Failed to update account type',
          'error',
          3000
        );
      });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Update Account Type
      </label>
      <div className="flex gap-2">
        <Select
          value={selectedType}
          onChange={setSelectedType}
          options={USER_ACCOUNT_TYPE_OPTIONS}
          placeholder="Select Type"
          className="flex-1 text-sm react-select-container dark:react-select-dark"
          styles={getCustomSelectStyles(isDark)}
        />

        <OnClickButton
          action={handleUpdate}
          text="Update"
          isDisable={!selectedType}
          isLoading={isLoading}
          icon={<MdUpdate size="20" />}
        />
      </div>
    </div>
  );
};

export default AccountTypeUpdate;
