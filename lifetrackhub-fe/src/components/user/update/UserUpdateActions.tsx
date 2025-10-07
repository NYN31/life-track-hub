import React from 'react';
import RoleUpdate from './RoleUpdate';
import StatusUpdate from './StatusUpdate';
import AccountTypeUpdate from './AccountTypeUpdate';
import { IUser } from '../../../types/user';

interface UserUpdateActionsProps {
  email: string;
  user: IUser;
}

const UserUpdateActions: React.FC<UserUpdateActionsProps> = ({
  email,
  user,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <RoleUpdate email={email} user={user} />
      <StatusUpdate email={email} user={user} />
      <AccountTypeUpdate email={email} user={user} />
    </div>
  );
};

export default UserUpdateActions;
