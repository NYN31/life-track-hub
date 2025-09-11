import { apiSlice } from '../api/apiSlice';

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

          return `${BLOG_COMMENT_API_PATH}/add?${params.toString()}`;
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
