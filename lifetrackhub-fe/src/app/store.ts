import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import blogSliceReducer from '../features/blog/blogSlice';
import userSliceReducer from '../features/user/userSlice';
import fileSliceReducer from '../features/file/fileSlice';
import todoSliceReducer from '../features/todo/todoSlice';
import blogCommentSliceReducer from '../features/blog/blogCommentSlice';
import blogLikeSliceReducer from '../features/blog/blogLikeSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    blog: blogSliceReducer,
    user: userSliceReducer,
    file: fileSliceReducer,
    todo: todoSliceReducer,
    blogComment: blogCommentSliceReducer,
    blogLike: blogLikeSliceReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
