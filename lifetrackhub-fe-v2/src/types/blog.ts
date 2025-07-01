import { IBase } from './common';
import { IUser } from './user';

export interface IBlog extends IBase {
  title: string;
  content: string;
  slug: string;
  visibility: BlogVisibility;
  user: IUser;
}

export type BlogVisibility = 'PUBLIC' | 'PRIVATE' | 'DELETED';
