import { useEffect, useState } from 'react';
import BlogStatsDashboard from '../../components/blog/BlogStatsDashboard';
import { useGetBlogStatsQuery } from '../../features/blog/blogApi';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import ErrorMessage from '../../components/common/ErrorMessage';
import { IBlogStats } from '../../types/blog';

const BlogStatsContainer = () => {
  const [blogStatsData, setBlogStatsData] = useState<IBlogStats>();

  const { data, error } = useGetBlogStatsQuery(undefined);

  useEffect(() => {
    if (data) {
      setBlogStatsData(data);
    }
  }, [data]);

  return (
    <div className="border border-purple-100 shadow-sm rounded-lg p-4 md:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        📊 Blog Statistics
      </h1>

      {blogStatsData && <BlogStatsDashboard stats={blogStatsData} />}

      {extractErrorMessage(error) && (
        <ErrorMessage message={extractErrorMessage(error) || ''} />
      )}
    </div>
  );
};

export default BlogStatsContainer;
