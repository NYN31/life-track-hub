import { createSlice } from '@reduxjs/toolkit';
import { ITodoItems, ITodoItemsRequest } from '../../types/todo';

const initialTodo: ITodoItemsRequest = {
  userId: Number(localStorage.getItem('userId')),
  title: '',
  done: false,
  todoItems: [],
};

const initialState: {
  todoObject: ITodoItemsRequest;
  errorMessage: string;
} = {
  todoObject: initialTodo,
  errorMessage: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTitleOfTodo: (state, action) => {
      state.todoObject.title = action.payload;
    },

    checkboxToggler: (state, action) => {
      const newTodoItems = [...state.todoObject.todoItems].map(
        (item, index) => {
          if (index === action.payload) {
            return {
              ...item,
              completed: !item.completed,
            };
          }

          return item;
        }
      );
      state.todoObject.todoItems = newTodoItems;
    },

    addTodoItemText: (state, action) => {
      const currentTodoItems = state.todoObject.todoItems;
      const newTodoItems: ITodoItems[] = [...currentTodoItems, action.payload];
      state.todoObject.todoItems = newTodoItems;
    },

    removeSignleTodo: (state, action) => {
      const newTodoItems = [...state.todoObject.todoItems].filter(
        (item, index) => {
          if (index != action.payload) {
            return item;
          }
        }
      );

      state.todoObject.todoItems = newTodoItems;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },

    resetTodo: state => {
      state.todoObject = initialTodo;
      state.errorMessage = '';
    },
  },
});

export const {
  setTitleOfTodo,
  checkboxToggler,
  addTodoItemText,
  removeSignleTodo,
  setErrorMessage,
  resetTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
