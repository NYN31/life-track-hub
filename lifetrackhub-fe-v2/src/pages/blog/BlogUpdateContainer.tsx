import { useEffect, useState } from 'react';
import {
  useGetBlogBySlugQuery,
  useUpdateBlogMutation,
} from '../../features/blog/blogApi';
import BlogUpdateForm from '../../components/blog/BlogUpdateForm';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import { BLOG_DETAILS_PATH } from '../../constants/title-and-paths';
import { IBlog, TagOption } from '../../types/blog';
import { MdOutlineImageSearch } from 'react-icons/md';

const BlogUpdateContainer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);
  const [currBlogTags, setCurrBlogTags] = useState<TagOption[]>([]);

  const { data: blogDataBySlug, error: errorBlogDataBySlug } =
    useGetBlogBySlugQuery(slug);
  const [triggerBlogUpdate, { isLoading: isLoadingBlogUpdation }] =
    useUpdateBlogMutation();

  const blogUpdateHandler = async (data: any, reset: () => void) => {
    setErrorMessage('');

    const blogData = {
      ...data,
      tags: data.tags.map((tag: TagOption) => tag.value).join(','),
      slug,
    };

    await triggerBlogUpdate(blogData)
      .unwrap()
      .then(() => {
        reset();
        navigate(`${BLOG_DETAILS_PATH}/${slug}`);
      })
      .catch(err => {
        setErrorMessage(err?.data?.message);
      });
  };

  useEffect(() => {
    if (blogDataBySlug) {
      setCurrentBlog(blogDataBySlug);
      setCurrBlogTags(
        blogDataBySlug.tags
          .split(',')
          .map((tag: string) => ({ value: tag, label: tag }))
      );
      setErrorMessage('');
    }
  }, [blogDataBySlug, slug]);

  if (isLoadingBlogUpdation) return <Spinner />;

  return (
    <div className="common-box-container animate-fade-in">
      <div className="flex items-start justify-between">
        <h1>Update Blog</h1>
        <button
          onClick={() => navigate(`${BLOG_DETAILS_PATH}/${slug}`)}
          className="btn-primary"
        >
          <MdOutlineImageSearch size="18" /> Details
        </button>
      </div>

      {currentBlog && (
        <BlogUpdateForm
          title={currentBlog?.title || ''}
          content={currentBlog?.content || ''}
          status={currentBlog?.status || 'PUBLIC'}
          currTags={currBlogTags}
          coverImagePath={currentBlog?.coverImagePath || ''}
          updateHandler={blogUpdateHandler}
          isSaving={isLoadingBlogUpdation}
          setErrorMessage={setErrorMessage}
        />
      )}

      {(errorMessage || extractErrorMessage(errorBlogDataBySlug)) && (
        <ErrorMessage
          message={
            errorMessage || extractErrorMessage(errorBlogDataBySlug) || ''
          }
        />
      )}
    </div>
  );
};

export default BlogUpdateContainer;
