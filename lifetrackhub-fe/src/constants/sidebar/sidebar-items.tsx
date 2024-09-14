import * as data from './items-title-and-path';
import { IoHomeOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuListTodo } from 'react-icons/lu';
import { MdOutlineCreateNewFolder } from 'react-icons/md';

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
    hasAccordion: [
      {
        title: data.TODO_LIST,
        label: data.TODO_LIST_PATH,
        path: data.TODO_LIST_PATH,
        icon: <LuListTodo size={ICON_SIZE} />,
      },
      {
        title: data.TODO_CREATE,
        label: data.TODO_CREATE_PATH,
        path: data.TODO_CREATE_PATH,
        icon: <MdOutlineCreateNewFolder size={ICON_SIZE} />,
      },
    ],
  },
  {
    title: data.SETTING,
    label: data.SETTING_PATH,
    path: data.SETTING_PATH,
    icon: <IoSettingsOutline size={ICON_SIZE} />,
  },
];

export default SidebarData;
