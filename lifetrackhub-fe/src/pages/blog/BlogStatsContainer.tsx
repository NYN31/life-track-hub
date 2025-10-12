import { useEffect, useState } from 'react';
import BlogStatsDashboard from '../../components/blog/BlogStatsDashboard';
import ErrorMessage from '../../components/common/ErrorMessage';
import { IBlogStats } from '../../types/blog';
import BlogStatsGraph from '../../components/blog/BlogStatsGraph';
import CommonSearchBox from '../../components/common/CommonSearchBox';
import OnClickFilterIcon from '../../components/common/button/OnClickFilterIcon';
import Spinner from '../../components/common/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import useQuery from '../../helper/hooks/useQuery';
import { getDateToString, getStrToDate } from '../../helper/utils/get-date';
import { getValidParams } from '../../helper/utils/get-valid-params';
import { BLOG_STATS_PATH } from '../../constants/title-and-paths';
import { useLazyGetBlogStatsQuery } from '../../features/blog/blogApi';

const BlogStatsContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [blogStatsData, setBlogStatsData] = useState<IBlogStats>();
  const [showFilters, setShowFilters] = useState(false);

  // Get query parameters
  const queryStartDate = getStrToDate(useQuery().get('start') || null);
  const queryEndDate = getStrToDate(useQuery().get('end') || null);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    queryStartDate,
    queryEndDate,
  ]);

  const [triggerGetBlogStats] = useLazyGetBlogStatsQuery();

  const updateAndPushUrl = (dateRange: [Date | null, Date | null]) => {
    const validParams = getValidParams(
      `start=${getDateToString(dateRange[0])}&end=${getDateToString(
        dateRange[1]
      )}`
    );
    navigate(`${BLOG_STATS_PATH}${validParams}`);
  };

  const handleStatsSearch = async () => {
    setIsLoading(true);
    await triggerGetBlogStats({
      startDate: getDateToString(dateRange[0]) || null,
      endDate: getDateToString(dateRange[1]) || null,
    })
      .unwrap()
      .then(response => {
        setBlogStatsData(response);
      })
      .finally(() => setIsLoading(false));
  };

  const handleReset = () => {
    const defaultDateRange: [Date | null, Date | null] = [
      new Date(new Date().setMonth(new Date().getMonth() - 1)),
      new Date(),
    ];
    setDateRange(defaultDateRange);
    updateAndPushUrl(defaultDateRange);
  };

  useEffect(() => {
    handleStatsSearch();
  }, [location.search]);

  if (isLoading) return <Spinner />;

  return (
    <div className="common-box-container space-y-3">
      {/* Heading and Date Range */}

      <div className="flex items-start justify-between">
        <h1>Blog Statistics</h1>

        <div className="flex items-center justify-end">
          <OnClickFilterIcon
            showFilter={showFilters}
            showFilterHandler={() => setShowFilters(v => !v)}
          />
        </div>
      </div>

      {showFilters && (
        <CommonSearchBox
          dateFields={[
            {
              name: 'Date Range',
              date: dateRange,
              setDateRange: setDateRange,
              isMandatory: false,
            },
          ]}
          handleSearch={() => {
            updateAndPushUrl(dateRange);
            handleStatsSearch();
          }}
          handleReset={handleReset}
        />
      )}

      {/* Stats Dashboard */}
      {blogStatsData && (
        <div className="flex flex-col xl:flex-row gap-4 w-auto">
          <BlogStatsDashboard stats={blogStatsData} />
          <BlogStatsGraph statusCounts={blogStatsData.statusCounts} />
        </div>
      )}

      {!blogStatsData && !isLoading && (
        <ErrorMessage message="No statistics available for the selected date range" />
      )}
    </div>
  );
};

export default BlogStatsContainer;
