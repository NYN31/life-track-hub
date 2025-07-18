import * as data from '../title-and-paths';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuListTodo } from 'react-icons/lu';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { FaUserEdit } from 'react-icons/fa';

const ICON_SIZE = 18;

const SidebarData = [
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
    title: data.PROFILE,
    hasAccordion: [
      {
        title: data.PROFILE_DETAILS,
        label: data.PROFILE_DETAILS_PATH,
        path: data.PROFILE_DETAILS_PATH,
        icon: <TbListDetails size={ICON_SIZE} />,
      },
      {
        title: data.PROFILE_EDIT,
        label: data.PROFILE_EDIT_PATH,
        path: data.PROFILE_EDIT_PATH,
        icon: <FaUserEdit size={ICON_SIZE} />,
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
