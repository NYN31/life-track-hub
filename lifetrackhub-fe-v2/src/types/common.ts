import { Dispatch } from 'react';

export interface IBase {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
}

export interface SidebarItemType {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: SidebarItemType[];
}

export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

export interface SearchField {
  name: string;
  value: string;
  setValue: (value: string) => void;
  isTrim?: boolean;
  isMandatory: boolean;
}

export interface SearchDateRange {
  name: string;
  date: [Date | null, Date | null];
  setDateRange: Dispatch<React.SetStateAction<any>>;
  isMandatory: boolean;
}

export interface SelectDropdown {
  name: string;
  option: OptionType | null;
  options: OptionType[];
  setOption: (option: OptionType) => void;
}

export interface OptionType {
  label: string;
  value: string;
}
