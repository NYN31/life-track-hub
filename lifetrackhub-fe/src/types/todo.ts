export interface ITodoItems {
  text: string;
  completed: boolean;
}

export interface ITodoListItem {
  id: number;
  userId: number;
  title: string;
  done: boolean;
  createdDate: string;
  lastModifiedDate: string;
  todoItems: ITodoItems[];
}
