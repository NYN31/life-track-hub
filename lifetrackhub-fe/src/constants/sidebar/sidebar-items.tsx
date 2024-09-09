import * as data from './items-title-and-path';
import { IoHomeOutline } from 'react-icons/io5';
import { TbArrowRoundaboutRight } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { TbDetails } from 'react-icons/tb';
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
    title: data.ABOUT,
    label: data.ABOUT_PATH,
    path: data.ABOUT_PATH,
    icon: <TbArrowRoundaboutRight size={ICON_SIZE} />,
  },
  {
    title: data.SETTING,
    label: data.SETTING_PATH,
    path: data.SETTING_PATH,
    icon: <IoSettingsOutline size={ICON_SIZE} />,
  },
  {
    title: data.EMPLOYEE,
    hasAccordion: [
      {
        title: data.EMPLOYEE_LIST,
        label: data.EMPLOYEE_LIST_PATH,
        path: data.EMPLOYEE_LIST_PATH,
        icon: <GoPeople size={ICON_SIZE} />,
      },
      {
        title: data.EMPLOYEE_DETIALS,
        label: data.EMPLOYEE_DETIALS_PATH,
        path: data.EMPLOYEE_DETIALS_PATH,
        icon: <TbDetails size={ICON_SIZE} />,
      },
    ],
  },
];

export default SidebarData;
