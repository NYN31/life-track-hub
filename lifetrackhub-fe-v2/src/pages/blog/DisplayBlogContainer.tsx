import React, { useEffect, useState } from 'react';
import DisplayBlog from '../../components/blog/DisplayBlog';
import { useLocation, useParams } from 'react-router-dom';
import { useGetBlogBySlugQuery } from '../../features/blog/blogApi';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import ErrorMessage from '../../components/common/ErrorMessage';
import { IBlog } from '../../types/blog';

const DisplayBlogContainer: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const isBlogPreview = location.pathname.includes('/blog/preview');

  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);

  const { data: blogDataBySlug, error: errorBlogDataBySlug } =
    useGetBlogBySlugQuery(slug);

  useEffect(() => {
    if (blogDataBySlug) {
      const modifiedBlogData = {
        ...blogDataBySlug,
        tags: blogDataBySlug?.tags.split(',').map((tag: string) => tag),
      };
      setCurrentBlog(modifiedBlogData);
    }
  }, [blogDataBySlug, slug, location.pathname]);

  return (
    <div className="border border-purple-100 shadow-sm rounded-lg p-4 md:p-6 lg:p-8">
      {currentBlog && <DisplayBlog blogData={currentBlog} />}

      {extractErrorMessage(errorBlogDataBySlug) && !isBlogPreview && (
        <ErrorMessage
          message={extractErrorMessage(errorBlogDataBySlug) || ''}
        />
      )}
    </div>
  );
};

export default DisplayBlogContainer;
