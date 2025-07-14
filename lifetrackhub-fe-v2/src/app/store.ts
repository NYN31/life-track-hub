import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import blogSliceReducer from '../features/blog/blogSlice';
import userSliceReducer from '../features/user/userSlice';
import fileSliceReducer from '../features/file/fileSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    blog: blogSliceReducer,
    user: userSliceReducer,
    file: fileSliceReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === 'development',
});
