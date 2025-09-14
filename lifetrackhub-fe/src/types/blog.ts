import { IBase } from './common';
import { IUser } from './user';

export interface IBlog extends IBase {
  title: string;
  content: string;
  slug: string;
  tags: string;
  status: BlogStatus;
  coverImagePath: string;
  user: IUser;
}

export type TagOption = {
  value: string;
  label: string;
};

export interface IBlogFormInputs {
  title: string;
  status: BlogStatus;
  tags: TagOption[];
  coverImagePath: string;
  content: string;
}

export type BlogStatus = 'PUBLIC' | 'PRIVATE' | 'DELETED' | 'DRAFT';

export interface IBlogStatusStats {
  status: BlogStatus;
  count: number;
}

export interface IBlogStats {
  statusCounts: IBlogStatusStats[];
}

// Blog Comment

export interface BlogCommentResponseDto {
  commentId: number;
  username: string;
  email: string;
  userProfilePictureUrl: string;
  content: string;
  createdDate: string;
}
