import React, { useEffect, useState } from 'react';
import useQuery from '../../helper/hooks/useQuery';
import { getDateToString, getStrToDate } from '../../helper/utils/get-date';
import { useLocation, useNavigate } from 'react-router-dom';
import { IBlog } from '../../types/blog';
import { getValidParams } from '../../helper/utils/get-valid-params';
import { BLOG_PATH, PUBLIC_BLOG_PATH } from '../../constants/title-and-paths';
import {
  useLazyGetBlogsByUnauthUserQuery,
  useLazyGetBlogsByUserQuery,
} from '../../features/blog/blogApi';
import Pagination from '../../components/common/Pagination';
import BlogList from '../../components/blog/BlogList';
import Spinner from '../../components/common/Spinner';
import CommonSearchBox from '../../components/common/CommonSearchBox';
import ErrorMessage from '../../components/common/ErrorMessage';
import useAuth from '../../helper/hooks/useAuth';
import { OptionType } from '../../types/common';
import OnClickFilterIcon from '../../components/common/button/OnClickFilterIcon';
import { ROLE } from '../../types/user';

const statusOptions: OptionType[] = [
  { value: 'PUBLIC', label: 'PUBLIC' },
  { value: 'PRIVATE', label: 'PRIVATE' },
  { value: 'DELETED', label: 'DELETED' },
  { value: 'DRAFT', label: 'DRAFT' },
];

const BlogContainer: React.FC = () => {
  const MAX_BLOG_ITEMS_IN_A_PAGE = 10;
  const role = localStorage.getItem('role');
  const isSuperAdmin = role === ROLE.SUPER_ADMIN;

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const queryPageNo = useQuery().get('page') || '0';
  const queryKeywords = useQuery().get('keywords') || '';
  const queryEmail = useQuery().get('email') || '';
  const querySlug = useQuery().get('slug') || '';
  const queryStatus = useQuery().get('status') || '';
  const queryStartDate = getStrToDate(useQuery().get('start') || null);
  const queryEndDate = getStrToDate(useQuery().get('end') || null);

  const [results, setResults] = useState<IBlog[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [totalPages, setTotalPages] = useState(-1);

  const [keywords, setKeywords] = useState('');
  const [email, setEmail] = useState(queryEmail);
  const [slug, setSlug] = useState(querySlug);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    queryStartDate,
    queryEndDate,
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState<OptionType | null>({
    value: queryStatus,
    label: queryStatus,
  });

  const [isBlogContentLoading, setBlogContentLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [triggerGetBlogsByUser] = useLazyGetBlogsByUserQuery();
  const [triggerGetBlogsByUnauthUser] = useLazyGetBlogsByUnauthUserQuery();

  const updateAndPushUrl = (
    page: number,
    keywords: string,
    email: string,
    slug: string,
    status: string,
    dateRange: [Date | null, Date | null]
  ) => {
    const validParams = getValidParams(
      `page=${page}&keywords=${keywords}&email=${email}&slug=${encodeURIComponent(
        slug
      )}&status=${status}&start=${getDateToString(
        dateRange[0]
      )}&end=${getDateToString(dateRange[1])}`
    );
    if (auth) {
      navigate(`${BLOG_PATH}${validParams}`);
    } else {
      navigate(`${PUBLIC_BLOG_PATH}${validParams}`);
    }
  };

  const handleSearch = async (
    pageId: number,
    keywords: string,
    email: string,
    slug: string,
    status: string,
    dateRange: [Date | null, Date | null]
  ) => {
    setBlogContentLoading(true);
    setErrorMessage('');

    if (!auth) {
      keywords = '';
      slug = '';
      email = '';
      status = 'PUBLIC';
      dateRange = [null, null];
    } else if (role === ROLE.ADMIN) {
      status = 'PUBLIC';
    }

    const triggerFn = auth
      ? triggerGetBlogsByUser
      : triggerGetBlogsByUnauthUser;

    await triggerFn({
      page: pageId,
      size: MAX_BLOG_ITEMS_IN_A_PAGE,
      keywords: keywords || null,
      slug: slug || null,
      email: email || null,
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
      })
      .finally(() => setBlogContentLoading(false));
  };

  const handleNextPage = () => {
    const nextPageNo = Number(queryPageNo) + 1;
    updateAndPushUrl(
      nextPageNo,
      queryKeywords,
      queryEmail,
      querySlug,
      queryStatus,
      [queryStartDate, queryEndDate]
    );
  };

  const handlePreviousPage = () => {
    const prevPageNo = Number(queryPageNo) - 1;
    updateAndPushUrl(
      prevPageNo,
      queryKeywords,
      queryEmail,
      querySlug,
      queryStatus,
      [queryStartDate, queryEndDate]
    );
  };

  const handleBlogsSearch = () => {
    updateAndPushUrl(0, keywords, email, slug, status?.value || '', dateRange);
  };

  const handleReset = () => {
    const pageNo = 0;
    const keywords = '';
    const email = '';
    const slug = '';
    const startDate = null;
    const endDate = null;
    const status = '';
    updateAndPushUrl(pageNo, keywords, email, slug, status, [
      startDate,
      endDate,
    ]);
    if (
      queryKeywords ||
      queryEmail ||
      querySlug ||
      queryStatus ||
      queryStartDate ||
      queryEndDate
    ) {
      setKeywords(keywords);
      setEmail(email);
      setSlug(slug);
      setStatus({ value: '', label: '' });
      setDateRange([startDate, endDate]);
    }
    setResults([]);
  };

  useEffect(() => {
    setKeywords(queryKeywords);
    setEmail(queryEmail);
    setSlug(querySlug);
    setStatus({ value: queryStatus, label: queryStatus });
    setDateRange([queryStartDate, queryEndDate]);

    handleSearch(
      Number(queryPageNo),
      queryKeywords,
      queryEmail,
      querySlug,
      queryStatus,
      [queryStartDate, queryEndDate]
    );
  }, [location.search]);

  if (isBlogContentLoading) return <Spinner />;

  return (
    <div className="common-box-container">
      <div className="flex items-start justify-between">
        <h1>Blog List</h1>

        <div className="flex items-center justify-end">
          {auth && (
            <OnClickFilterIcon
              showFilter={showFilters}
              showFilterHandler={() => setShowFilters(v => !v)}
            />
          )}
        </div>
      </div>

      {auth && showFilters && (
        <div className="gap-6">
          <CommonSearchBox
            textFields={[
              {
                name: 'Keywords',
                value: keywords,
                setValue: setKeywords,
                isTrim: false,
                isMandatory: false,
              },
              {
                name: 'Email',
                value: email,
                setValue: setEmail,
                isTrim: true,
                isMandatory: false,
              },
              {
                name: 'Slug',
                value: slug,
                setValue: setSlug,
                isTrim: true,
                isMandatory: false,
              },
            ]}
            selectDropdowns={
              isSuperAdmin
                ? [
                    {
                      name: 'Status',
                      option: status,
                      options: statusOptions,
                      setOption: setStatus,
                      isMandatory: false,
                    },
                  ]
                : undefined
            }
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
            updateAndPushUrl(
              page,
              keywords,
              email,
              slug,
              status?.value || '',
              dateRange
            )
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

export default BlogContainer;
