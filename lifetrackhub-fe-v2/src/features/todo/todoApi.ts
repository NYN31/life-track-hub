import { PageDto } from '../../types/file';
import { ITodoRequestDto, ITodoResponseDto } from '../../types/todo';
import { apiSlice } from '../api/apiSlice';

export const USER_TODO_API_PATH = '/api/todo';

export const todoApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Todo', 'TodoByEmail'] })
  .injectEndpoints({
    endpoints: builder => ({
      getTodosByEmail: builder.query<
        PageDto<ITodoResponseDto>,
        { email: string; page: number; size: number }
      >({
        query: ({ email, page, size }) =>
          `${USER_TODO_API_PATH}/all/by-email/${email}/${page}/${size}`,

        providesTags: ['Todo'],
      }),

      getTodoByEmail: builder.query<ITodoResponseDto, string>({
        query: email => `${USER_TODO_API_PATH}/by-email/${email}`,

        providesTags: (_result, _error, arg) => [
          { type: 'TodoByEmail', email: arg },
        ],
      }),

      addTodo: builder.mutation<ITodoResponseDto, ITodoRequestDto>({
        query: dto => ({
          url: `${USER_TODO_API_PATH}/add`,
          method: 'POST',
          body: dto,
        }),

        invalidatesTags: ['Todo', 'TodoByEmail'],
      }),

      updateTodo: builder.mutation<ITodoResponseDto, ITodoResponseDto>({
        query: dto => ({
          url: `${USER_TODO_API_PATH}/update`,
          method: 'PUT',
          body: dto,
        }),

        invalidatesTags: (_result, _error, arg) => [
          'Todo',
          { type: 'TodoByEmail', email: arg.email },
        ],
      }),
    }),
  });

export const {
  useGetTodosByEmailQuery,
  useGetTodoByEmailQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
