import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';
import { logoutClearingLocalStorage } from '../../helper/local-storage/logout';

export const API_URL = 'http://localhost:8086'; // localhost
//export const API_URL = 'http://172.16.20.194:8086'; // officeI
//export const API_URL = 'http://192.168.0.111:8086'; // home

//export const API_URL = 'http://api.shnoyon.com/';

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
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    api.dispatch(userLoggedOut());
    logoutClearingLocalStorage();
    location.reload();
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
