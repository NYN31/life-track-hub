import { PageDto } from '../../types/file';
import {
  ITodoRequestDto,
  ITodoResponseDto,
  TodoSearchRequestDto,
} from '../../types/todo';
import { apiSlice } from '../api/apiSlice';

export const ADMIN_TODO_API_PATH = '/admin/api/todo';

export const todoApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Todo', 'TodoByEmail'] })
  .injectEndpoints({
    endpoints: builder => ({
      getTodosWithFilterCriteria: builder.query<
        PageDto<ITodoResponseDto>,
        TodoSearchRequestDto
      >({
        query: data => ({
          url: `${ADMIN_TODO_API_PATH}/all`,
          method: 'POST',
          body: data,
        }),

        providesTags: ['Todo'],
      }),

      getTodoByEmail: builder.query<ITodoResponseDto, string>({
        query: email => `${ADMIN_TODO_API_PATH}/by-email/${email}`,

        providesTags: (_result, _error, arg) => [
          { type: 'TodoByEmail', email: arg },
        ],
      }),

      addTodo: builder.mutation<ITodoResponseDto, ITodoRequestDto>({
        query: dto => ({
          url: `${ADMIN_TODO_API_PATH}/add`,
          method: 'POST',
          body: dto,
        }),

        invalidatesTags: ['Todo', 'TodoByEmail'],
      }),

      updateTodo: builder.mutation<ITodoResponseDto, ITodoResponseDto>({
        query: dto => ({
          url: `${ADMIN_TODO_API_PATH}/update`,
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
  useLazyGetTodosWithFilterCriteriaQuery,
  useGetTodoByEmailQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
