import React, { useEffect, useState } from 'react';
import useQuery from '../../helper/hooks/useQuery';
import { getDateToString, getStrToDate } from '../../helper/utils/get-date';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IBlog } from '../../types/blog';
import { getValidParams } from '../../helper/utils/get-valid-params';
import { BLOG_SELF_PATH } from '../../constants/title-and-paths';
import { useLazyGetSelfBlogsQuery } from '../../features/blog/blogApi';
import Pagination from '../../components/common/Pagination';
import BlogList from '../../components/blog/BlogList';
import Spinner from '../../components/common/Spinner';
import CommonSearchBox from '../../components/common/CommonSearchBox';
import ErrorMessage from '../../components/common/ErrorMessage';
import { OptionType } from '../../types/common';
import OnClickFilterIcon from '../../components/common/button/OnClickFilterIcon';
import { statusOptions } from '../../constants/blog-constants';
import { useToast } from '../../context/toast-context';

const MyBlogContainer: React.FC = () => {
  const { email } = useParams();

  const MAX_BLOG_ITEMS_IN_A_PAGE = 10;

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const queryPageNo = useQuery().get('page') || '0';
  const queryStatus = useQuery().get('status') || '';
  const queryStartDate = getStrToDate(useQuery().get('start') || null);
  const queryEndDate = getStrToDate(useQuery().get('end') || null);

  const [results, setResults] = useState<IBlog[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [totalPages, setTotalPages] = useState(-1);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    queryStartDate,
    queryEndDate,
  ]);
  const [showFilters, setShowFilters] = useState(true);
  const [status, setStatus] = useState<OptionType | null>({
    value: queryStatus,
    label: queryStatus,
  });

  const [isBlogContentLoading, setBlogContentLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [triggerGetSelfBlogsByUser] = useLazyGetSelfBlogsQuery();

  const updateAndPushUrl = (
    page: number,
    status: string,
    dateRange: [Date | null, Date | null]
  ) => {
    const validParams = getValidParams(
      `page=${page}&status=${status}&start=${getDateToString(
        dateRange[0]
      )}&end=${getDateToString(dateRange[1])}`
    );

    navigate(`${BLOG_SELF_PATH}/${email}${validParams}`);
  };

  const handleSearch = async (
    pageId: number,
    status: string,
    dateRange: [Date | null, Date | null]
  ) => {
    setBlogContentLoading(true);
    setErrorMessage('');

    await triggerGetSelfBlogsByUser({
      page: pageId,
      size: MAX_BLOG_ITEMS_IN_A_PAGE,
      status: status || null,
      start: getDateToString(dateRange[0]) || null,
      end: getDateToString(dateRange[1]) || null,
    })
      .unwrap()
      .then(response => {
        const { hasNext, hasPrevious, totalPages, pageNumber, content } =
          response;
        setHasNext(hasNext);
        setHasPrevious(hasPrevious);
        setTotalPages(totalPages);
        setPageNumber(pageNumber);
        setResults(content);
      })
      .catch((error: any) => {
        setErrorMessage(error?.data?.message);
        setResults([]);
        toast(error?.data?.message, 'error');
      })
      .finally(() => setBlogContentLoading(false));
  };

  const handleNextPage = () => {
    const nextPageNo = Number(queryPageNo) + 1;
    updateAndPushUrl(nextPageNo, queryStatus, [queryStartDate, queryEndDate]);
  };

  const handlePreviousPage = () => {
    const prevPageNo = Number(queryPageNo) - 1;
    updateAndPushUrl(prevPageNo, queryStatus, [queryStartDate, queryEndDate]);
  };

  const handleBlogsSearch = () => {
    updateAndPushUrl(0, status?.value || '', dateRange);
  };

  const handleReset = () => {
    const pageNo = 0;
    const startDate = null;
    const endDate = null;
    const status = '';
    updateAndPushUrl(pageNo, status, [startDate, endDate]);
    if (queryStatus || queryStartDate || queryEndDate) {
      setStatus({ value: '', label: '' });
      setDateRange([startDate, endDate]);
    }
    setResults([]);
  };

  useEffect(() => {
    setStatus({ value: queryStatus, label: queryStatus });
    setDateRange([queryStartDate, queryEndDate]);

    handleSearch(Number(queryPageNo), queryStatus, [
      queryStartDate,
      queryEndDate,
    ]);
  }, [location.search]);

  if (isBlogContentLoading) return <Spinner />;

  return (
    <div className="common-box-container">
      <h1>My blogs</h1>

      <OnClickFilterIcon
        showFilter={showFilters}
        showFilterHandler={() => setShowFilters(v => !v)}
      />

      {showFilters && (
        <div className="gap-6">
          <CommonSearchBox
            selectDropdowns={[
              {
                name: 'Status',
                option: status,
                options: statusOptions,
                setOption: setStatus,
                isMandatory: false,
              },
            ]}
            dateFields={[
              {
                name: 'Date Range (Required)',
                date: dateRange,
                setDateRange: setDateRange,
                isMandatory: false,
              },
            ]}
            handleSearch={handleBlogsSearch}
            handleReset={handleReset}
          />
        </div>
      )}

      <BlogList results={results} />

      {results.length > 0 && (
        <Pagination
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPageNo={pageNumber}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          totalPages={totalPages}
          onPageChange={page =>
            updateAndPushUrl(page, status?.value || '', dateRange)
          }
        />
      )}

      {(errorMessage || results.length === 0) && (
        <ErrorMessage
          message={errorMessage || 'No blog found within filter criteria'}
        />
      )}
    </div>
  );
};

export default MyBlogContainer;
