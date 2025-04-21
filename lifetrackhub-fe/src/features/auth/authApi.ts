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

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          localStorage.clear();
          dispatch(userLoggedOut());
        } catch (err) {
          throw new Error('Logout has been failed...!');
        }
      },
    }),

    registration: builder.mutation({
      query: credentials => ({
        url: '/auth/registration',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    googleRedirectUrl: builder.query({
      query: () => ({
        url: '/auth/google-url',
        method: 'POST',
      }),
    }),

    googleCallback: builder.mutation({
      query: (code: string) => ({
        url: `/auth/google-callback?code=${code}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
  useLazyGoogleRedirectUrlQuery,
  useGoogleCallbackMutation,
} = authApi;
