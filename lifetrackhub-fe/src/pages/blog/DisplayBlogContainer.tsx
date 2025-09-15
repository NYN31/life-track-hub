import React, { useEffect, useState } from 'react';
import DisplayBlog from '../../components/blog/DisplayBlog';
import { useLocation, useParams } from 'react-router-dom';
import {
  useCountLikesAndCommentsQuery,
  useGetBlogBySlugForUnauthUserQuery,
  useGetBlogBySlugQuery,
} from '../../features/blog/blogApi';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import ErrorMessage from '../../components/common/ErrorMessage';
import { IBlog } from '../../types/blog';
import useAuth from '../../helper/hooks/useAuth';
import { useGetBlogCommentsQuery } from '../../features/blog/blogCommentApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBlogComment,
  setTotalComments,
} from '../../features/blog/blogCommentSlice';
import { RootState } from '../../app/store';
import { setLikesCount } from '../../features/blog/blogLikeSlice';

const DisplayBlogContainer: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const isBlogPreview = location.pathname.includes('/blog/preview');
  const currentCommentPageNo = useSelector(
    (state: RootState) => state.blogComment.pageNumber
  );

  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);

  const { data: blogDataBySlug, error: errorBlogDataBySlug } =
    useGetBlogBySlugQuery(slug ?? '', { skip: !slug || !auth });

  const { data: blogDataBySlugUnauth, error: errorBlogDataBySlugUnauth } =
    useGetBlogBySlugForUnauthUserQuery(slug ?? '', { skip: !slug || auth });

  const blogData = auth ? blogDataBySlug : blogDataBySlugUnauth;
  const errorBlogData = auth ? errorBlogDataBySlug : errorBlogDataBySlugUnauth;

  const { data: blogCommentData, error: errorBlogCommentBySlug } =
    useGetBlogCommentsQuery(
      {
        slug: slug ?? '',
        page: currentCommentPageNo,
        size: 10,
      },
      { skip: !auth }
    );

  const { data: countLikesCommentsBySlug } = useCountLikesAndCommentsQuery(
    slug ?? '',
    { skip: !auth }
  );

  useEffect(() => {
    if (blogData) {
      const modifiedBlogData = {
        ...blogData,
        tags: blogData?.tags.split(',').map((tag: string) => tag),
      };
      setCurrentBlog(modifiedBlogData);
    }
  }, [blogData, slug, location.pathname]);

  useEffect(() => {
    if (blogCommentData) {
      dispatch(setBlogComment(blogCommentData));
    }
  }, [blogCommentData, slug]);

  useEffect(() => {
    if (countLikesCommentsBySlug) {
      const { commentCount, likeCount } = countLikesCommentsBySlug;
      dispatch(setLikesCount(likeCount));
      dispatch(setTotalComments(commentCount));
    }
  }, [countLikesCommentsBySlug, slug]);

  return (
    <div className="common-box-container animate-fade-in">
      {currentBlog && <DisplayBlog blogData={currentBlog} />}

      {extractErrorMessage(errorBlogData) ||
        (errorBlogCommentBySlug && !isBlogPreview && (
          <ErrorMessage
            message={
              extractErrorMessage(errorBlogData || errorBlogCommentBySlug) || ''
            }
          />
        ))}
    </div>
  );
};

export default DisplayBlogContainer;
