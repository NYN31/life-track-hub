import * as data from '../title-and-paths';
import { LuListTodo } from 'react-icons/lu';
import { MdOutlineCreateNewFolder, MdOutlineFilePresent } from 'react-icons/md';
import { IoStatsChartOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';

const ICON_SIZE = 18;

const SIDE_MENU_ITEMS = [
  {
    title: data.BLOG,
    children: [
      {
        title: data.ALL_BLOGS,
        path: data.BLOG_PATH,
        icon: <LuListTodo size={ICON_SIZE} />,
      },
      {
        title: data.BLOG_STATS,
        path: data.BLOG_STATS_PATH,
        icon: <IoStatsChartOutline size={ICON_SIZE} />,
      },
    ],
  },
  {
    title: data.SUPER_ADMIN_USER_MANAGEMENT,
    children: [
      {
        title: data.SUPER_ADMIN_USER_LIST,
        path: data.SUPER_ADMIN_USER_LIST_PATH,
        icon: <FaUsers size={ICON_SIZE} />,
      },
      {
        title: data.SUPER_ADMIN_USER_CREATE,
        path: data.SUPER_ADMIN_USER_CREATE_PATH,
        icon: <MdOutlineCreateNewFolder size={ICON_SIZE} />,
      },
    ],
  },
  {
    title: data.FILE,
    path: data.FILE_PATH,
    icon: <MdOutlineFilePresent size={ICON_SIZE} />,
  },
  {
    title: data.TODO,
    path: data.TODO_PATH,
    icon: <LuListTodo size={ICON_SIZE} />,
  },
  {
    title: data.ABOUT,
    path: data.ABOUT_PATH,
    icon: <LuListTodo size={ICON_SIZE} />,
  },
];

export default SIDE_MENU_ITEMS;
