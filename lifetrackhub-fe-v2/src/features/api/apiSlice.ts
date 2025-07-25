import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logoutClearingLocalStorage } from '../../helper/local-storage/clear-local-storage';
import { userLoggedOut } from '../auth/authSlice';
import { resetDraftBlogStorage } from '../../helper/local-storage/reset-blog-storage';
import { blogReset } from '../blog/blogSlice';

export const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }: { getState: any }) => {
    const token: string | undefined =
      getState().auth.accessToken || localStorage.getItem('accessToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    api.dispatch(userLoggedOut());
    api.dispatch(blogReset());
    logoutClearingLocalStorage();
    resetDraftBlogStorage();
    location.reload();
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
