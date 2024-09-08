import { apiSlice } from '../api/apiSlice';
import { userLoggedOut } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          localStorage.clear();
          dispatch(userLoggedOut());
        } catch (err) {
          throw new Error('Logout has been failed...!');
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
