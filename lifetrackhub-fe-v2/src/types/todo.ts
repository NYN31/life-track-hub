import { IBase } from './common';

export interface ITodoRequestDto {
  email: string;
  title: string;
  todoStatus: TodoStatus;
  todoItems: ITodoItems[];
}

export interface ITodoResponseDto extends IBase {
  email: string;
  title: string;
  todoStatus: TodoStatus
  todoItems: ITodoItems[];
}

export interface ITodoItems {
  todoItemId: string;
  text: string;
  completed: boolean;
}

export type TodoStatus = 'IN_PROGRESS' | 'DONE'; 
