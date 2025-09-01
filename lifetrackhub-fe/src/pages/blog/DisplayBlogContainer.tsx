import React, { useEffect, useState } from 'react';
import DisplayBlog from '../../components/blog/DisplayBlog';
import { useLocation, useParams } from 'react-router-dom';
import {
  useGetBlogBySlugForUnauthUserQuery,
  useGetBlogBySlugQuery,
} from '../../features/blog/blogApi';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import ErrorMessage from '../../components/common/ErrorMessage';
import { IBlog } from '../../types/blog';
import useAuth from '../../helper/hooks/useAuth';

const DisplayBlogContainer: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const auth = useAuth();
  const isBlogPreview = location.pathname.includes('/blog/preview');

  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);

  const { data: blogDataBySlug, error: errorBlogDataBySlug } =
    useGetBlogBySlugQuery(slug ?? '', { skip: !slug || !auth });

  const { data: blogDataBySlugUnauth, error: errorBlogDataBySlugUnauth } =
    useGetBlogBySlugForUnauthUserQuery(slug ?? '', { skip: !slug || auth });

  const blogData = auth ? blogDataBySlug : blogDataBySlugUnauth;
  const errorBlogData = auth ? errorBlogDataBySlug : errorBlogDataBySlugUnauth;

  useEffect(() => {
    if (blogData) {
      const modifiedBlogData = {
        ...blogData,
        tags: blogData?.tags.split(',').map((tag: string) => tag),
      };
      setCurrentBlog(modifiedBlogData);
    }
  }, [blogData, slug, location.pathname]);

  return (
    <div className="common-box-container animate-fade-in">
      {currentBlog && <DisplayBlog blogData={currentBlog} />}

      {extractErrorMessage(errorBlogData) && !isBlogPreview && (
        <ErrorMessage message={extractErrorMessage(errorBlogData) || ''} />
      )}
    </div>
  );
};

export default DisplayBlogContainer;
