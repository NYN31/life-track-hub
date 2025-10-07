import { OptionType } from '../../types/common';

export const USER_ROLE_OPTIONS: OptionType[] = [
  { value: 'SUPER ADMIN', label: 'SUPER ADMIN' },
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'USER', label: 'USER' },
];

export const USER_STATUS_OPTIONS: OptionType[] = [
  { value: 'ACTIVE', label: 'ACTIVE' },
  { value: 'INACTIVE', label: 'INACTIVE' },
  { value: 'DELETED', label: 'DELETED' },
];

export const USER_ACCOUNT_TYPE_OPTIONS: OptionType[] = [
  { value: 'STANDARD', label: 'STANDARD' },
  { value: 'PREMIUM', label: 'PREMIUM' },
];
