import * as data from './items-title-and-path';
import { IoHomeOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuListTodo } from 'react-icons/lu';

const ICON_SIZE = 18;

const SidebarData = [
  {
    title: data.HOME,
    label: data.HOME_PATH,
    path: data.HOME_PATH,
    icon: <IoHomeOutline size={ICON_SIZE} />,
  },
  {
    title: data.TODO,
    label: data.TODO_PATH,
    path: data.TODO_PATH,
    icon: <LuListTodo size={ICON_SIZE} />,
  },
  {
    title: data.SETTING,
    label: data.SETTING_PATH,
    path: data.SETTING_PATH,
    icon: <IoSettingsOutline size={ICON_SIZE} />,
  },
];

export default SidebarData;
