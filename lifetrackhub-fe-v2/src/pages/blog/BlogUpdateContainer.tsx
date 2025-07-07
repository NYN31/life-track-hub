import { useEffect, useState } from 'react';
import {
  useGetBlogBySlugQuery,
  useUpdateBlogMutation,
} from '../../features/blog/blogApi';
import BlogUpdateForm from '../../components/blog/BlogUpdateForm';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import { BLOG_DETAILS_PATH } from '../../constants/title-and-paths';
import { IBlog, TagOption } from '../../types/blog';
import { FaEye } from 'react-icons/fa';

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
      //tags: data.tags.map(tag => tag.value),
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

  const hasPreviewPermission = () => {
    if (!currentBlog) return false;

    return currentBlog.title && currentBlog.content && currentBlog.visibility;
  };

  return (
    <div className="w-full h-full p-6 bg-white rounded-2xl shadow-md border border-gray-300">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Blog</h2>
        {hasPreviewPermission() && (
          <Link to={`${BLOG_DETAILS_PATH}/${slug}`} className="flex gap-2">
            <span className="mt-1">
              <FaEye />
            </span>
            <p>Preview</p>
          </Link>
        )}
      </div>

      {currentBlog && (
        <BlogUpdateForm
          title={currentBlog?.title || ''}
          content={currentBlog?.content || ''}
          visibility={currentBlog?.visibility || 'PUBLIC'}
          currTags={currBlogTags}
          coverImagePath={currentBlog?.coverImagePath || ''}
          updateHandler={blogUpdateHandler}
          isLoadingUpdation={isLoadingBlogUpdation}
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
