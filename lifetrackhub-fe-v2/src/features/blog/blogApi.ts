import { apiSlice } from '../api/apiSlice';

export const BLOG_API_PATH = '/api/blog';
export const PUBLIC_BLOG_API_PATH = '/public/api/blog';
export const ADMIN_BLOG_API_PATH = '/admin/api/blog';
export const SUPER_ADMIN_BLOG_API_PATH = '/super-admin/api/blog';

export const blogApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Blogs', 'BlogBySlug'] })
  .injectEndpoints({
    endpoints: builder => ({
      getBlogsByUser: builder.query({
        query: data => ({
          url: `${BLOG_API_PATH}/find-all`,
          method: 'POST',
          body: data,
        }),

        providesTags: ['Blogs'],
      }),

      getBlogBySlug: builder.query({
        query: slug => {
          return `${PUBLIC_BLOG_API_PATH}/by-slug/${slug}`;
        },

        providesTags: (_result, _error, arg) => {
          return [{ type: 'BlogBySlug', slug: arg }];
        },
      }),

      createBlog: builder.mutation({
        query: data => ({
          url: `${ADMIN_BLOG_API_PATH}/create`,
          method: 'POST',
          body: data,
        }),

        invalidatesTags: ['Blogs'],
      }),

      updateBlog: builder.mutation({
        query: data => ({
          url: `${ADMIN_BLOG_API_PATH}/update`,
          method: 'PUT',
          body: data,
        }),

        invalidatesTags: (_result, _error, arg) => [
          'Blogs',
          { type: 'BlogBySlug', slug: arg.slug },
        ],
      }),
    }),
  });

export const {
  useLazyGetBlogsByUserQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
