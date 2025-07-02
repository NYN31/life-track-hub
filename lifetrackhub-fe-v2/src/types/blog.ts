import { IBase } from './common';
import { IUser } from './user';

export interface IBlog extends IBase {
  title: string;
  content: string;
  slug: string;
  tag: TagOption[];
  visibility: BlogVisibility;
  user: IUser;
}

export type TagOption = {
  value: string;
  label: string;
};

export interface BlogFormInputs {
  title: string;
  visibility: BlogVisibility;
  tags: TagOption[];
  content: string;
}

export type BlogVisibility = 'PUBLIC' | 'PRIVATE' | 'DELETED';
