export interface IBase {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
}

export type ToastStatus = 'success' | 'error' | 'warning' | 'info';
