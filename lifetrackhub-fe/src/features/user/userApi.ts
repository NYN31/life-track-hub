import { apiSlice } from '../api/apiSlice';

export const PROFILE_USER_API_PATH = '/api/user';
export const PROFILE_ADMIN_USER_API_PATH = '/admin/api/user';
export const PROFILE_SUPER_ADMIN_USER_API_PATH = '/super-admin/api/user';

export const userApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Users', 'UserByEmail'] })
  .injectEndpoints({
    endpoints: builder => ({
      getProfile: builder.query({
        query: email => {
          return `${PROFILE_USER_API_PATH}/find-self-details/${email}`;
        },

        providesTags: (_result, _error, arg) => {
          return [{ type: 'UserByEmail', email: arg }];
        },
      }),

      updateProfile: builder.mutation({
        query: body => ({
          url: `${PROFILE_USER_API_PATH}/update`,
          method: 'PUT',
          body,
        }),

        invalidatesTags: (_result, _error, arg) => [
          { type: 'UserByEmail', email: arg.slug },
        ],
      }),

      getUserByEmail: builder.query({
        query: email => `${PROFILE_USER_API_PATH}/find-by-email/${email}`,
        providesTags: (_result, _error, arg) => [
          { type: 'UserByEmail', email: arg },
        ],
      }),

      getUsers: builder.query({
        query: data => ({
          url: `${PROFILE_SUPER_ADMIN_USER_API_PATH}/all`,
          method: 'POST',
          body: data,
        }),

        providesTags: ['Users'],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUserByEmailQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = userApi;
