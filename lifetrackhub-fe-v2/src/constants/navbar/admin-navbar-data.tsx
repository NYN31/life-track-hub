import {
  BLOG_PATH,
  BLOG_CREATED_PATH,
  BLOG_STATS_PATH,
  PROFILE_UPDATE_PATH,
  PROFILE_DETAILS_PATH,
} from '../../constants/title-and-paths';
import { LuListTodo } from 'react-icons/lu';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { IoStatsChartOutline } from 'react-icons/io5';
import { GoPerson } from 'react-icons/go';
import { LiaUserEditSolid } from 'react-icons/lia';

export const ICON_SIZE = 18;

export const ADMIN_NAV_ITEMS = [
  {
    label: 'Blogs',
    path: BLOG_PATH,
    children: [
      {
        label: 'All Blogs',
        path: BLOG_PATH,
        icon: <LuListTodo size={ICON_SIZE} />,
      },
      {
        label: 'Create Blog',
        path: BLOG_CREATED_PATH,
        icon: <MdOutlineCreateNewFolder size={ICON_SIZE} />,
      },
      {
        label: 'Stats',
        path: BLOG_STATS_PATH,
        icon: <IoStatsChartOutline size={ICON_SIZE} />,
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
        icon: <GoPerson size={ICON_SIZE} />,
      },
      {
        label: 'Update',
        path: PROFILE_UPDATE_PATH,
        icon: <LiaUserEditSolid size={ICON_SIZE} />,
      },
    ],
  },
];
