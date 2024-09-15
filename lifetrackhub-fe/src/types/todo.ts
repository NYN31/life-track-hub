import { IBase } from './common';

export interface ITodoResponse {
  content: ITodoItemsResponse[];
  hasNext: boolean;
  hasPrevious: boolean;
  pageNumber: number;
  totalPages: number;
}

export interface ITodoItemsRequest {
  userId: number;
  title: string;
  done: boolean;
  todoItems: ITodoItems[];
}

export interface ITodoItemsResponse extends IBase {
  userId: number;
  title: string;
  done: boolean;
  todoItems: ITodoItems[];
}

export interface ITodoItems {
  text: string;
  completed: boolean;
}
