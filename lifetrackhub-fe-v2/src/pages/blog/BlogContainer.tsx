import React, { useEffect, useState } from 'react';
import useQuery from '../../helper/hooks/useQuery';
import { getDateToString, getStrToDate } from '../../helper/utils/get-date';
import { useLocation, useNavigate } from 'react-router-dom';
import { IBlog } from '../../types/blog';
import { getValidParams } from '../../helper/utils/get-valid-params';
import { BLOG_PATH } from '../../constants/title-and-paths';
import { useLazyGetBlogsByUserQuery } from '../../features/blog/blogApi';
import Pagination from '../../components/common/Pagination';
import BlogList from '../../components/blog/BlogList';
import Spinner from '../../components/common/Spinner';
import CommonSearchBox from '../../components/common/CommonSearchBox';
import ErrorMessage from '../../components/common/ErrorMessage';
import useAuth from '../../helper/hooks/useAuth';

const BlogContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const queryPageNo = useQuery().get('page') || '0';
  const queryEmail = useQuery().get('email') || '';
  const queryStartDate = getStrToDate(useQuery().get('start') || null);
  const queryEndDate = getStrToDate(useQuery().get('end') || null);

  const [results, setResults] = useState<IBlog[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [totalPages, setTotalPages] = useState(-1);

  const [email, setEmail] = useState(queryEmail);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    queryStartDate,
    queryEndDate,
  ]);

  const [isBlogContentLoading, setBlogContentLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [triggerGetBlogsByUser] = useLazyGetBlogsByUserQuery();

  const updateAndPushUrl = (
    page: number,
    email: string,
    dateRange: [Date | null, Date | null]
  ) => {
    const validParams = getValidParams(
      `page=${page}&email=${email}&start=${getDateToString(
        dateRange[0]
      )}&end=${getDateToString(dateRange[1])}`
    );
    navigate(`${BLOG_PATH}${validParams}`);
  };

  const handleSearch = async (
    pageId: number,
    email: string,
    dateRange: [Date | null, Date | null]
  ) => {
    setBlogContentLoading(true);
    await triggerGetBlogsByUser({
      page: pageId,
      size: 10,
      email,
      start: getDateToString(dateRange[0]),
      end: getDateToString(dateRange[1]),
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
      })
      .finally(() => setBlogContentLoading(false));
  };

  const handleNextPage = () => {
    const nextPageNo = Number(queryPageNo) + 1;
    updateAndPushUrl(nextPageNo, queryEmail, [queryStartDate, queryEndDate]);
  };

  const handlePreviousPage = () => {
    const prevPageNo = Number(queryPageNo) - 1;
    updateAndPushUrl(prevPageNo, queryEmail, [queryStartDate, queryEndDate]);
  };

  const handleBlogsSearch = () => {
    updateAndPushUrl(0, email, dateRange);
  };

  const handleReset = () => {
    const pageNo = 0;
    const email = '';
    const startDate = null;
    const endDate = null;
    updateAndPushUrl(pageNo, email, [startDate, endDate]);
    setEmail(email);
    setDateRange([startDate, endDate]);
    setResults([]);
  };

  useEffect(() => {
    setEmail(queryEmail);
    setDateRange([queryStartDate, queryEndDate]);

    handleSearch(Number(queryPageNo), queryEmail, [
      queryStartDate,
      queryEndDate,
    ]);
  }, [location.search]);

  if (isBlogContentLoading) return <Spinner />;

  return (
    <>
      {auth && (
        <div className="max-w-6xl mx-auto gap-6">
          <CommonSearchBox
            textFields={[
              {
                name: 'Email',
                value: email,
                setValue: setEmail,
                isTrim: true,
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

      {results.length === 0 && (
        <ErrorMessage message="No blog found within filter criteria" />
      )}

      {results.length > 0 && (
        <Pagination
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPageNo={pageNumber}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          totalPages={totalPages}
        />
      )}

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
};

export default BlogContainer;
