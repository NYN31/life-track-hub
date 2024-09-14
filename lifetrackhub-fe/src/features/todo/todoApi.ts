import { TODO_API_PATH } from '../../constants/sidebar/items-title-and-path';
import { ITodoItemsRequest, ITodoItemsResponse } from '../../types/todo';
import { apiSlice } from '../api/apiSlice';

export const todoApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Todos'] })
  .injectEndpoints({
    endpoints: builder => ({
      getTodosByUserId: builder.query({
        query: ({ userId, page = 0, size = 10 }) => {
          return `${TODO_API_PATH}/by-user-id/${userId}/${page}/${size}`;
        },
        providesTags: ['Todos'],
      }),

      getTodoById: builder.query({
        query: ({ id }) => {
          return `${TODO_API_PATH}/by-id/${id}`;
        },
        keepUnusedDataFor: 0,
      }),

      addTodo: builder.mutation<ITodoItemsResponse, ITodoItemsRequest>({
        query: todo => ({
          url: `${TODO_API_PATH}/add`,
          method: 'POST',
          body: { ...todo },
        }),
      }),

      updateTodo: builder.mutation<ITodoItemsResponse, ITodoItemsRequest>({
        query: todo => ({
          url: `${TODO_API_PATH}/update`,
          method: 'PUT',
          body: { ...todo },
        }),
      }),
    }),
  });

export const {
  useLazyGetTodosByUserIdQuery,
  useLazyGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
