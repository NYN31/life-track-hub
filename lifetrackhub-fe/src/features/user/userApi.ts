import { PROFILE_API_PATH } from '../../constants/sidebar/items-title-and-path';
import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    userFindByEmail: builder.query({
      query: email => {
        return `${PROFILE_API_PATH}/find-by-email/${email}`;
      },
    }),

    userFindById: builder.query({
      query: userId => {
        return `${PROFILE_API_PATH}/find-by-id/${userId}`;
      },
    }),

    updateUser: builder.mutation({
      query: user => ({
        url: `${PROFILE_API_PATH}/update`,
        method: 'PUT',
        body: { ...user },
      }),
    }),
  }),
});

export const {
  useUserFindByEmailQuery,
  useUserFindByIdQuery,
  useUpdateUserMutation,
} = userApi;
