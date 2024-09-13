export interface IBaseTodo {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
}

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

export interface ITodoItemsResponse extends IBaseTodo {
  userId: number;
  title: string;
  done: boolean;
  todoItems: ITodoItems[];
}

export interface ITodoItems {
  text: string;
  completed: boolean;
}
