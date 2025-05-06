import { PROFILE_API_PATH } from '../../constants/sidebar/items-title-and-path';
import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['UserByEmail', 'UserById'] })
  .injectEndpoints({
    endpoints: builder => ({
      userFindByEmail: builder.query({
        query: email => {
          return `${PROFILE_API_PATH}/find-by-email/${email}`;
        },
        providesTags: (_, __, arg) => [{ type: 'UserByEmail', id: arg }],
      }),

      findSelfDetails: builder.query({
        query: () => {
          return `${PROFILE_API_PATH}/find-self-details`;
        },
        providesTags: (_, __, arg) => [{ type: 'UserByEmail', id: arg }],
      }),

      userFindById: builder.query({
        query: userId => {
          return `${PROFILE_API_PATH}/find-by-id/${userId}`;
        },
        keepUnusedDataFor: 0,
        providesTags: (_, __, arg) => [{ type: 'UserById', id: arg }],
      }),

      updateUser: builder.mutation({
        query: user => ({
          url: `${PROFILE_API_PATH}/update`,
          method: 'PUT',
          body: { ...user },
        }),

        invalidatesTags: (_, __, arg) => [
          { type: 'UserByEmail', id: arg.id },
          { type: 'UserById', id: arg.id },
        ],
      }),
    }),
  });

export const {
  useUserFindByEmailQuery,
  useFindSelfDetailsQuery,
  useUserFindByIdQuery,
  useUpdateUserMutation,
} = userApi;
