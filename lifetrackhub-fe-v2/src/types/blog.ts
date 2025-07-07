import { IBase } from './common';
import { IUser } from './user';

export interface IBlog extends IBase {
  title: string;
  content: string;
  slug: string;
  tags: string;
  visibility: BlogVisibility;
  coverImagePath: string;
  user: IUser;
}

export type TagOption = {
  value: string;
  label: string;
};

export interface IBlogFormInputs {
  title: string;
  visibility: BlogVisibility;
  tags: TagOption[];
  coverImagePath: string;
  content: string;
}

export type BlogVisibility = 'PUBLIC' | 'PRIVATE' | 'DELETED';
