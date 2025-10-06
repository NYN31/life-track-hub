import { HeaderColumn } from '../../types/common';

export const USER_TABLE_HEADERS = [
  {
    key: 'email',
    width: '12.5%',
    description: 'Email',
    align: 'start',
  },
  {
    key: 'name',
    width: '12.5%',
    description: 'Name',
    align: 'start',
  },
  {
    key: 'role',
    width: '12.5%',
    description: 'Role',
    align: 'start',
  },
  {
    key: 'status',
    width: '12.5%',
    description: 'Status',
    align: 'start',
  },
  {
    key: 'type',
    width: '12.5%',
    description: 'Type',
    align: 'start',
  },
  {
    key: 'created-date',
    width: '12.5%',
    description: 'Created Date',
    align: 'start',
  },
  {
    key: 'last-modified-date',
    width: '12.5%',
    description: 'Last Modified Date',
    align: 'start',
  },
  {
    key: 'details',
    width: '12.5%',
    description: '',
    align: 'start',
  },
] as HeaderColumn[];
