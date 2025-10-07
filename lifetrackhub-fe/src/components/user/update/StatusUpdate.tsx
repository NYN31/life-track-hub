import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { OptionType } from '../../../types/common';
import { getCustomSelectStyles } from '../../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../../helper/hooks/useDarkMode';
import { USER_STATUS_OPTIONS } from '../../../constants/select-options/user-options';
import { useUpdateUserAccountStatusMutation } from '../../../features/user/userApi';
import { useToast } from '../../../context/toast-context';
import { IUser } from '../../../types/user';
import { MdUpdate } from 'react-icons/md';
import OnClickButton from '../../common/button/OnClickButton';

interface StatusUpdateProps {
  email: string;
  user: IUser;
}

const StatusUpdate: React.FC<StatusUpdateProps> = ({ email, user }) => {
  const isDark = useDarkMode();
  const toast = useToast();
  const [updateStatus, { isLoading }] = useUpdateUserAccountStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>(null);

  useEffect(() => {
    if (user?.accountStatus) {
      const statusOption = USER_STATUS_OPTIONS.find(
        (option: OptionType) => option.value === user.accountStatus
      );
      setSelectedStatus(statusOption || null);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!selectedStatus) return;

    await updateStatus({ email, status: selectedStatus.value })
      .unwrap()
      .then(() => {
        toast('Status updated successfully', 'success', 3000);
      })
      .catch(error => {
        toast(error?.data?.message || 'Failed to update status', 'error', 3000);
      });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Update Status
      </label>
      <div className="flex gap-2">
        <Select
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={USER_STATUS_OPTIONS}
          placeholder="Select Status"
          className="flex-1 text-sm react-select-container dark:react-select-dark"
          styles={getCustomSelectStyles(isDark)}
        />
        <OnClickButton
          action={handleUpdate}
          text="Update"
          isDisable={!selectedStatus}
          isLoading={isLoading}
          icon={<MdUpdate size="20" />}
        />
      </div>
    </div>
  );
};

export default StatusUpdate;
