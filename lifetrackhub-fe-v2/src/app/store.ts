import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import blogSliceReducer from '../features/blog/blogSlice';
import userSliceReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    blog: blogSliceReducer,
    user: userSliceReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === 'development',
});
