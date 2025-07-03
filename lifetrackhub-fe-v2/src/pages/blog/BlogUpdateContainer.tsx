import { useState } from 'react';
import {
  useGetBlogBySlugQuery,
  useUpdateBlogMutation,
} from '../../features/blog/blogApi';
import BlogUpdateForm from '../../components/blog/BlogUpdateForm';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';

const BlogUpdateContainer = () => {
  const { slug } = useParams();
  const [isLoadingBlogUpdation, setLoadingBlogUpdation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: blogDataBySlug, error: errorBlogDataBySlug } =
    useGetBlogBySlugQuery(slug);
  const [triggerBlogUpdate] = useUpdateBlogMutation();

  const blogUpdateHandler = async (data: any, reset: () => void) => {
    setLoadingBlogUpdation(true);

    const blogData = {
      ...data,
      //tags: data.tags.map(tag => tag.value),
    };

    await triggerBlogUpdate(blogData)
      .unwrap()
      .then(() => {
        reset();
        // TODO: navigate to Blog details page by-slug
      })
      .catch(err => {
        setErrorMessage(err?.data?.message);
      })
      .finally(() => setLoadingBlogUpdation(false));
  };

  if (isLoadingBlogUpdation) return <Spinner />;

  return (
    <div className="w-full h-full p-6 bg-white rounded-2xl shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Blog</h2>

      {blogDataBySlug && (
        <BlogUpdateForm
          title={blogDataBySlug?.title || ''}
          content={blogDataBySlug?.content || ''}
          visibility={blogDataBySlug?.visibility || ''}
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
