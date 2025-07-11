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

const BlogUpdateContainer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [isLoadingBlogUpdation, setLoadingBlogUpdation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);
  const [currBlogTags, setCurrBlogTags] = useState<TagOption[]>([]);

  const { data: blogDataBySlug, error: errorBlogDataBySlug } =
    useGetBlogBySlugQuery(slug);
  const [triggerBlogUpdate] = useUpdateBlogMutation();

  const blogUpdateHandler = async (data: any, reset: () => void) => {
    setLoadingBlogUpdation(true);
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
      })
      .finally(() => setLoadingBlogUpdation(false));
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
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Blog</h2>
        <button
          onClick={() => navigate(`${BLOG_DETAILS_PATH}/${slug}`)}
          className="mx-2 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-gray-50 font-semibold rounded-lg transition duration-200 shadow-sm uppercase"
        >
          Details
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
          isLoadingUpdation={isLoadingBlogUpdation}
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
