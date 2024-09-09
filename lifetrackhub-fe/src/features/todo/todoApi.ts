import { TODO_API_PATH } from '../../constants/sidebar/items-title-and-path';
import { apiSlice } from '../api/apiSlice';

export const todoApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Todos'] })
  .injectEndpoints({
    endpoints: builder => ({
      getTodosById: builder.query({
        query: ({ userId, page = 0, size = 10 }) => {
          return `${TODO_API_PATH}/by-user-id/${userId}/${page}/${size}`;
        },
        providesTags: ['Todos'],
      }),
    }),
  });

export const { useGetTodosByIdQuery } = todoApi;
