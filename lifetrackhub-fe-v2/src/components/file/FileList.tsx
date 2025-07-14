import React, { useEffect } from 'react';
import { useGetFilesQuery } from '../../features/file/fileApi';
import { FileDto } from '../../types/file';
import { HiOutlineDocumentText } from 'react-icons/hi';
import Pagination from '../common/Pagination';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import { FILE_PATH } from '../../constants/title-and-paths';
import { useNavigate } from 'react-router-dom';
import { getValidParams } from '../../helper/utils/get-valid-params';
import useQuery from '../../helper/hooks/useQuery';

interface FileListProps {
  reloadKey: number;
}

const FileList: React.FC<FileListProps> = ({ reloadKey }) => {
  const navigate = useNavigate();

  const queryPageNo = useQuery().get('page') || '0';

  const { data, isLoading, isError, error, refetch } = useGetFilesQuery({
    page: Number(queryPageNo),
    size: 3,
  });

  const updateAndPushUrl = (page: string) => {
    const params = new URLSearchParams({
      page,
    });
    navigate(`${FILE_PATH}${getValidParams(params.toString())}`);
  };

  useEffect(() => {
    refetch();
  }, [reloadKey, refetch]);

  const handleNextPage = () => {
    const nextPage = Number(queryPageNo) + 1;
    updateAndPushUrl(String(nextPage));
  };

  const handlePreviousPage = () => {
    const previousPage = Number(queryPageNo) - 1;
    updateAndPushUrl(String(previousPage));
  };

  if (isLoading || !data) return <Spinner />;

  if (isError) {
    return <ErrorMessage message={String(error)} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Files
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.content?.map((file: FileDto) => (
          <div
            key={file.filePath}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
          >
            {file.fileType === 'IMG' ? (
              <img
                src={file.previewUrl}
                alt={file.originalFileName}
                className="w-32 h-32 object-cover rounded mb-2 border dark:border-gray-700"
              />
            ) : (
              <HiOutlineDocumentText className="w-20 h-20 text-blue-600 dark:text-blue-400 mb-2" />
            )}
            <div className="text-center">
              <div className="font-medium text-gray-800 dark:text-gray-100 truncate w-40">
                {file.originalFileName}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {file.fileType}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {new Date(file.createdDate).toLocaleString()}
              </div>
              <a
                href={file.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>

      {data && (
        <Pagination
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPageNo={data?.pageNumber}
          hasPrevious={data?.hasPrevious}
          hasNext={data?.hasNext}
          totalPages={data?.totalPages}
          onPageChange={page => updateAndPushUrl(String(page))}
        />
      )}
    </div>
  );
};

export default FileList;
