import { createSlice } from '@reduxjs/toolkit';
import { ITodoItems, ITodoItemsRequest } from '../../types/todo';

const initialTodo: ITodoItemsRequest = {
  userId: null,
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
    updateTodoObject: (state, action) => {
      state.todoObject.title = action.payload.title;
      state.todoObject.done = action.payload.done;
      state.todoObject.userId = action.payload.userId;
      state.todoObject.todoItems = action.payload.todoItems;
    },

    setTitleOfTodo: (state, action) => {
      state.todoObject.userId = Number(localStorage.getItem('userId'));
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

      console.log(newTodoItems);

      // todo done logic
      const isAllChecked = newTodoItems.find(item => item.completed === false);
      console.log(isAllChecked);
      if (!isAllChecked) state.todoObject.done = true;
      else state.todoObject.done = false;

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
  updateTodoObject,
  setTitleOfTodo,
  checkboxToggler,
  addTodoItemText,
  removeSignleTodo,
  setErrorMessage,
  resetTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
