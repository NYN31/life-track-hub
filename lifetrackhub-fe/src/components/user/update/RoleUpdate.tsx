import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { OptionType } from '../../../types/common';
import { getCustomSelectStyles } from '../../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../../helper/hooks/useDarkMode';
import { USER_ROLE_OPTIONS } from '../../../constants/select-options/user-options';
import { useUpdateUserRoleMutation } from '../../../features/user/userApi';
import { useToast } from '../../../context/toast-context';
import { IUser } from '../../../types/user';
import OnClickButton from '../../common/button/OnClickButton';
import { MdUpdate } from 'react-icons/md';

interface RoleUpdateProps {
  email: string;
  user: IUser;
}

const RoleUpdate: React.FC<RoleUpdateProps> = ({ email, user }) => {
  const isDark = useDarkMode();
  const toast = useToast();
  const [updateRole, { isLoading }] = useUpdateUserRoleMutation();
  const [selectedRole, setSelectedRole] = useState<OptionType | null>(null);

  useEffect(() => {
    if (user?.role) {
      const roleOption = USER_ROLE_OPTIONS.find(
        (option: OptionType) => option.value === user.role
      );
      setSelectedRole(roleOption || null);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!selectedRole) return;
    await updateRole({ email, role: selectedRole.value })
      .unwrap()
      .then(() => {
        toast('Role updated successfully', 'success', 3000);
      })
      .catch(error => {
        toast(error?.data?.message || 'Failed to update role', 'error', 3000);
      });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Update Role
      </label>
      <div className="flex gap-2">
        <Select
          value={selectedRole}
          onChange={setSelectedRole}
          options={USER_ROLE_OPTIONS}
          placeholder="Select Role"
          className="flex-1 text-sm react-select-container dark:react-select-dark"
          styles={getCustomSelectStyles(isDark)}
        />
        <OnClickButton
          action={handleUpdate}
          text="Update"
          isDisable={!selectedRole}
          isLoading={isLoading}
          icon={<MdUpdate size="20" />}
        />
      </div>
    </div>
  );
};

export default RoleUpdate;
