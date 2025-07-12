import {
  BLOG_PATH,
  PROFILE_UPDATE_PATH,
  PROFILE_DETAILS_PATH,
} from '../../constants/title-and-paths';
import { LuListTodo } from 'react-icons/lu';
import { FaUserEdit } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

export const USER_NAV_ITEMS = [
  //   {
  //     label: 'Todos',
  //     icon: <LuListTodo size={18} />,
  //     children: [
  //       {
  //         label: 'Todos',
  //         path: TODO_LIST_PATH,
  //         icon: <LuListTodo size={18} />,
  //       },
  //       {
  //         label: 'Create',
  //         path: TODO_CREATE_PATH,
  //         icon: <MdOutlineCreateNewFolder size={18} />,
  //       },
  //     ],
  //   },
  {
    label: 'Blogs',
    path: BLOG_PATH,
    children: [
      {
        label: 'All Blogs',
        path: BLOG_PATH,
        icon: <LuListTodo size={18} />,
      },
    ],
  },
  {
    label: 'Profile',
    path: PROFILE_DETAILS_PATH,
    children: [
      {
        label: 'Details',
        path: PROFILE_DETAILS_PATH,
        icon: <FaUserEdit size={18} />,
      },
      {
        label: 'Edit',
        path: PROFILE_UPDATE_PATH,
        icon: <FiSettings size={18} />,
      },
    ],
  },
];
