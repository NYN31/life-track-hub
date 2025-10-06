import {
  BLOG_PATH,
  BLOG_CREATED_PATH,
  BLOG_STATS_PATH,
  FILE,
  FILE_PATH,
  TODO,
  TODO_PATH,
  ABOUT_PATH,
  ALL_BLOGS,
  BLOG_CREATED,
  ABOUT,
} from '../../constants/title-and-paths';
import { LuListTodo } from 'react-icons/lu';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { MdOutlineFilePresent } from 'react-icons/md';
import { IoStatsChartOutline } from 'react-icons/io5';

export const ICON_SIZE = 18;

export const ADMIN_NAV_ITEMS = [
  {
    label: 'Blogs',
    path: BLOG_PATH,
    children: [
      {
        label: ALL_BLOGS,
        path: BLOG_PATH,
        icon: <LuListTodo size={ICON_SIZE} />,
      },
      {
        label: BLOG_CREATED,
        path: BLOG_CREATED_PATH,
        icon: <MdOutlineCreateNewFolder size={ICON_SIZE} />,
      },
      {
        label: 'My Stats',
        path: BLOG_STATS_PATH,
        icon: <IoStatsChartOutline size={ICON_SIZE} />,
      },
    ],
  },
  {
    label: FILE,
    path: FILE_PATH,
    icon: <MdOutlineFilePresent size={ICON_SIZE} />,
  },
  {
    label: TODO,
    path: TODO_PATH,
    icon: <LuListTodo />,
  },
  {
    label: ABOUT,
    path: ABOUT_PATH,
    icon: <LuListTodo size={18} />,
  },
];
