import { ABOUT_PATH, BLOG_PATH } from '../../constants/title-and-paths';
import { LuListTodo } from 'react-icons/lu';

export const USER_NAV_ITEMS = [
  {
    label: 'Blogs',
    path: BLOG_PATH,
    icon: <LuListTodo size={18} />,
  },
  {
    label: 'About',
    path: ABOUT_PATH,
    icon: <LuListTodo size={18} />,
  },
];
