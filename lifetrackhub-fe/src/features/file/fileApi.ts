import { apiSlice } from '../api/apiSlice';
import { FileDto, PageDto, FileType } from '../../types/file';
import { getValidRequestParams } from '../../helper/utils/get-valid-params';

export const FILE_ADMIN_USER_API_PATH = '/admin/api/file';

export const fileApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['File'] })
  .injectEndpoints({
    endpoints: builder => ({
      getFiles: builder.query<
        PageDto<FileDto>,
        { page?: number; size?: number; fileType?: FileType }
      >({
        query: ({ page = 0, size = 10, fileType = 'IMG' }) => {
          const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            fileType,
          });

          return `${FILE_ADMIN_USER_API_PATH}/all?${getValidRequestParams(
            params.toString()
          )}`;
        },

        providesTags: ['File'],
      }),

      uploadFile: builder.mutation<FileDto, { file: File }>({
        query: ({ file }) => {
          const formData = new FormData();
          formData.append('file', file);
          //formData.append('fileType', fileType);
          return {
            url: `${FILE_ADMIN_USER_API_PATH}/upload`,
            method: 'POST',
            body: formData,
          };
        },

        invalidatesTags: ['File'],
      }),

      deleteFile: builder.mutation({
        query: filePath => {
          const params = new URLSearchParams({
            filePath: filePath,
          });

          return {
            url: `${FILE_ADMIN_USER_API_PATH}/delete?${getValidRequestParams(
              params.toString()
            )}`,
            method: 'DELETE',
          };
        },

        invalidatesTags: ['File'],
      }),
    }),
  });

export const {
  useGetFilesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
} = fileApi;
