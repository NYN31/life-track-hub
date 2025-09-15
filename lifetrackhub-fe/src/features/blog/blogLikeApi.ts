import { apiSlice } from '../api/apiSlice';

export const BLOG_LIKE_API_PATH = '/api/blog/like';

export const blogLikeApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['BlogStats'] })
  .injectEndpoints({
    endpoints: builder => ({
      likeUnlikeOperationOfBlog: builder.mutation({
        query: slug => ({
          url: `${BLOG_LIKE_API_PATH}/${slug}`,
          method: 'POST',
        }),

        invalidatesTags: (_result, _error, { slug }) => [
          { type: 'BlogStats', id: slug },
        ],
      }),

      isLiked: builder.query({
        query: slug => {
          return `${BLOG_LIKE_API_PATH}/isLiked/${slug}`;
        },

        keepUnusedDataFor: 0,
      }),
    }),
  });

export const { useLikeUnlikeOperationOfBlogMutation, useIsLikedQuery } =
  blogLikeApi;
