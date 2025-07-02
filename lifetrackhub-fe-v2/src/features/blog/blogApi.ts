import { getValidRequestParams } from '../../helper/utils/get-valid-params';
import { apiSlice } from '../api/apiSlice';

export const BLOG_API_PATH = '/api/blog';
export const PUBLIC_BLOG_API_PATH = '/public/api/blog';
export const ADMIN_BLOG_API_PATH = '/admin/api/blog';
export const SUPER_ADMIN_BLOG_API_PATH = '/super-admin/api/blog';

export const blogApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBlogsByUser: builder.query({
      query: ({ page = 0, size = 3, email, start, end }) => {
        const requestParams = getValidRequestParams(
          `page=${page}&size=${size}&email=${email}&start=${start}&end=${end}`
        );
        return `${BLOG_API_PATH}/find-all?${requestParams}`;
      },
    }),
  }),
});

export const { useLazyGetBlogsByUserQuery } = blogApi;
