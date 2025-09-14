import { BlogCommentResponseDto } from '../../types/blog';
import { apiSlice } from '../api/apiSlice';
import {
  addBlogCommentOptimistically,
  rollbackBlogComment,
  updateOptimisticBlogComment,
} from './blogCommentSlice';

export const BLOG_COMMENT_API_PATH = '/api/blog/comment';

export const blogCommentApi = apiSlice
  .enhanceEndpoints({ addTagTypes: [] })
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

        async onQueryStarted({ content }, { dispatch, queryFulfilled }) {
          const optimisticId = Date.now();

          const optimisticComment: BlogCommentResponseDto = {
            commentId: optimisticId,
            username: localStorage.getItem('name') || '',
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

      deleteComment: builder.mutation({
        query: commentId => {
          return `${BLOG_COMMENT_API_PATH}/delete/${commentId}`;
        },
      }),
    }),
  });

export const {
  useGetBlogCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = blogCommentApi;
