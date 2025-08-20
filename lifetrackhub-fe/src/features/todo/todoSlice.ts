import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoItems } from '../../types/todo';

export interface TodoState {
  title: string;
  todos: ITodoItems[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  title: '',
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTitleToLocalTodo: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addLocalTodo: (state, action: PayloadAction<{ text: string }>) => {
      state.todos.push({
        todoItemId: (Date.now() + Math.random()).toString(),
        text: action.payload.text,
        completed: false,
      });
    },
    removeLocalTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(
        todo => todo.todoItemId !== action.payload
      );
    },
    updateLocalTodo: (state, action) => {
      const { title, todoItems } = action.payload;
      state.title = title;
      state.todos = todoItems;
    },
    resetTodoState: () => initialState,
  },
});

export const {
  addTitleToLocalTodo,
  addLocalTodo,
  removeLocalTodo,
  updateLocalTodo,
  resetTodoState,
} = todoSlice.actions;
export default todoSlice.reducer;
