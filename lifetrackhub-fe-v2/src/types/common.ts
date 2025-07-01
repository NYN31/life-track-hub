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
