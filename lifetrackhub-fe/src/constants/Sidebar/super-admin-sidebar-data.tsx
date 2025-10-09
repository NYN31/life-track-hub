import * as data from '../title-and-paths';
import { LuListTodo } from 'react-icons/lu';
import { MdOutlineCreateNewFolder, MdOutlineFilePresent } from 'react-icons/md';
import { IoStatsChartOutline } from 'react-icons/io5';
import { FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { FaUsers } from 'react-icons/fa';

const ICON_SIZE = 18;

const SIDE_MENU_ITEMS = [
  {
    title: data.BLOG,
    icon: <LuListTodo size={ICON_SIZE} />,
    children: [
      {
        title: data.ALL_BLOGS,
        path: data.BLOG_PATH,
        icon: <LuListTodo size={ICON_SIZE} />,
      },
      {
        title: data.BLOG_CREATED,
        path: data.BLOG_CREATED_PATH,
        icon: <MdOutlineCreateNewFolder size={ICON_SIZE} />,
      },
      {
        title: data.BLOG_STATS,
        path: data.BLOG_STATS_PATH,
        icon: <IoStatsChartOutline size={ICON_SIZE} />,
      },
    ],
  },
  {
    title: data.PROFILE,
    icon: <CgProfile size={ICON_SIZE} />,
    children: [
      {
        title: data.PROFILE_UPDATE,
        path: data.PROFILE_UPDATE_PATH,
        icon: <FiSettings size={ICON_SIZE} />,
      },
      {
        title: data.PROFILE_DETAILS,
        path: data.PROFILE_DETAILS_PATH,
        icon: <CgProfile size={ICON_SIZE} />,
      },
    ],
  },
  {
    title: data.SUPER_ADMIN_USER_MANAGEMENT,
    icon: <FaUsers size={ICON_SIZE} />,
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
