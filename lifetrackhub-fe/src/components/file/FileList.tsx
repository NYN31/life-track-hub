import React, { useEffect, useState } from 'react';
import {
  useDeleteFileMutation,
  useGetFilesQuery,
} from '../../features/file/fileApi';
import { FileDto, FileType } from '../../types/file';
import Pagination from '../common/Pagination';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import { FILE_PATH } from '../../constants/title-and-paths';
import { useNavigate } from 'react-router-dom';
import { getValidParams } from '../../helper/utils/get-valid-params';
import useQuery from '../../helper/hooks/useQuery';
import FileCard from './FileCard';
import CommonSearchBox from '../common/CommonSearchBox';
import { OptionType } from '../../types/common';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import OnClickFilterIcon from '../common/button/OnClickFilterIcon';
import SuccessMessage from '../common/SuccessMessage';

const imageOptions: OptionType[] = [
  { value: 'IMG', label: 'Image' },
  { value: 'PDF', label: 'Pdf' },
];

interface FileListProps {
  reloadKey: number;
}

const FileList: React.FC<FileListProps> = ({ reloadKey }) => {
  const navigate = useNavigate();

  const queryPageNo = useQuery().get('page') || '0';
  const queryFileType = useQuery().get('fileType') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [fileType, setFileType] = useState<OptionType | null>(
    queryFileType ? { label: queryFileType, value: queryFileType } : null
  );

  const [successMessage, setSuccessMessage] = useState('');
  //const [errorMessage, setErrorMessage] = useState('');
  const {
    data,
    isLoading,
    isError: isErrorInGettingFiles,
    error: filesError,
    refetch,
  } = useGetFilesQuery({
    page: Number(queryPageNo),
    size: 10,
    fileType: queryFileType as FileType,
  });
  const [
    triggerDeleteFile,
    {
      isLoading: isDeleteFileLoading,
      error: deleteFileError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteFileMutation();

  //console.log(isDeleteFileLoading, deleteFileError, isDeleteSuccess);

  const [results, setResults] = useState<FileDto[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [totalPages, setTotalPages] = useState(-1);

  useEffect(() => {
    if (data) {
      setResults(data.content);
      setHasNext(data.hasNext);
      setHasPrevious(data.hasPrevious);
      setPageNumber(data.pageNumber);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const updateAndPushUrl = (page: string, fileType: string) => {
    const params = new URLSearchParams({
      page,
      fileType,
    });
    navigate(`${FILE_PATH}${getValidParams(params.toString())}`);
  };

  const handleNextPage = () => {
    const nextPage = Number(queryPageNo) + 1;
    updateAndPushUrl(String(nextPage), queryFileType.toString());
  };

  const handlePreviousPage = () => {
    const previousPage = Number(queryPageNo) - 1;
    updateAndPushUrl(String(previousPage), queryFileType.toString());
  };

  const handleFileSearch = () => {
    updateAndPushUrl('0', fileType ? fileType.value : '');
  };

  const handleReset = () => {
    const pageNo = '0';
    const fileType = '';
    updateAndPushUrl(pageNo, fileType);
    setFileType(null);
    setResults([]);
  };

  const handleFileDelete = async (filePath: string) => {
    console.log(filePath);
    setSuccessMessage('');
    await triggerDeleteFile(filePath)
      .unwrap()
      .then(res => {
        console.log(res);
        refetch();
        setSuccessMessage(res.message);
      });
  };

  useEffect(() => {
    setFileType(
      queryFileType ? { label: queryFileType, value: queryFileType } : null
    );
    refetch();
  }, [reloadKey, refetch, location.search]);

  console.log(isLoading, isDeleteFileLoading);
  if (isLoading || isDeleteFileLoading) return <Spinner />;

  return (
    <div className="">
      <div className="flex items-center justify-end mb-4">
        <OnClickFilterIcon
          showFilter={showFilters}
          showFilterHandler={() => setShowFilters(v => !v)}
        />
      </div>

      {showFilters && (
        <div className="gap-6">
          <CommonSearchBox
            selectDropdowns={[
              {
                name: 'File Type',
                option: fileType,
                options: imageOptions,
                setOption: setFileType,
                isMandatory: true,
              },
            ]}
            handleSearch={handleFileSearch}
            handleReset={handleReset}
          />
        </div>
      )}

      {results.length === 0 ? (
        <ErrorMessage message="No files found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {results.map((file: FileDto) => (
            <FileCard
              key={file.filePath}
              file={file}
              fileDeleteHandler={handleFileDelete}
            />
          ))}
        </div>
      )}

      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPageNo={pageNumber}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        totalPages={totalPages}
        onPageChange={page =>
          updateAndPushUrl(String(page), fileType?.value || '')
        }
      />
      {isDeleteSuccess && <SuccessMessage message={successMessage} />}
      {isErrorInGettingFiles ||
        (deleteFileError && (
          <ErrorMessage
            message={extractErrorMessage(filesError || deleteFileError) || ''}
          />
        ))}
    </div>
  );
};

export default FileList;
