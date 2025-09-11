import { apiSlice } from '../api/apiSlice';

export const BLOG_LIKE_API_PATH = '/api/blog/like';

export const blogLikeApi = apiSlice
  .enhanceEndpoints({ addTagTypes: [] })
  .injectEndpoints({
    endpoints: builder => ({
      likeUnlikeOperationOfBlog: builder.mutation({
        query: slug => {
          return `${BLOG_LIKE_API_PATH}/${slug}`;
        },
      }),
    }),
  });

export const { useLikeUnlikeOperationOfBlogMutation } = blogLikeApi;
