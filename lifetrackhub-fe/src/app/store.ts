import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/auth/authSlice';
import todoSliceReducer from '../features/todo/todoSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    todo: todoSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === 'development',
});
