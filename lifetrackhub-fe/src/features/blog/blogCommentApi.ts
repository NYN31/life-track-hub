import { BlogCommentResponseDto } from '../../types/blog';
import { apiSlice } from '../api/apiSlice';
import {
  addBlogCommentOptimistically,
  rollbackBlogComment,
  updateOptimisticBlogComment,
} from './blogCommentSlice';

export const BLOG_COMMENT_API_PATH = '/api/blog/comment';

export const blogCommentApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['BlogComments'] })
  .injectEndpoints({
    endpoints: builder => ({
      getBlogComments: builder.query({
        query: ({ slug, page = 0, size = 10 }) => {
          const params = new URLSearchParams({
            page,
            size,
            slug,
          });
          return `${BLOG_COMMENT_API_PATH}?${params.toString()}`;
        },

        providesTags: (_result, _error, { slug, page = 0 }) => [
          { type: 'BlogComments', id: `${slug}-${page}` },
        ],
      }),

      addComment: builder.mutation({
        query: ({ slug, content }) => {
          const params = new URLSearchParams({
            slug,
            content,
          });

          return {
            url: `${BLOG_COMMENT_API_PATH}/add?${params.toString()}`,
            method: 'POST',
          };
        },

        // Invalidate the first page for the slug (where new comment usually goes)
        invalidatesTags: (_result, _error, { slug }) => [
          { type: 'BlogComments', id: `${slug}-0` },
        ],

        async onQueryStarted({ content }, { dispatch, queryFulfilled }) {
          const optimisticId = Date.now();

          const optimisticComment: BlogCommentResponseDto = {
            commentId: optimisticId,
            username: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
            userProfilePictureUrl: 'null',
            content,
            createdDate: new Date().toISOString() as any,
          };

          dispatch(addBlogCommentOptimistically(optimisticComment));

          try {
            const { data } = await queryFulfilled;

            dispatch(
              updateOptimisticBlogComment({ optimisticId, realComment: data })
            );
          } catch {
            dispatch(rollbackBlogComment(optimisticId));
          }
        },
      }),

      updateComment: builder.mutation({
        query: ({ commentId, content }) => {
          const params = new URLSearchParams({
            commentId,
            content,
          });

          return {
            url: `${BLOG_COMMENT_API_PATH}/update?${params.toString()}`,
            method: 'PUT',
          };
        },

        // Invalidate the first page for the slug (where new comment usually goes)
        invalidatesTags: (_result, _error, { slug, currentPage }) => [
          { type: 'BlogComments', id: `${slug}-${currentPage}` },
        ],
      }),

      deleteComment: builder.mutation({
        query: commentId => {
          return `${BLOG_COMMENT_API_PATH}/delete/${commentId}`;
        },

        invalidatesTags: (_result, _error, { slug, currentPage }) => [
          { type: 'BlogComments', id: `${slug}-${currentPage}` },
        ],
      }),
    }),
  });

export const {
  useGetBlogCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = blogCommentApi;
