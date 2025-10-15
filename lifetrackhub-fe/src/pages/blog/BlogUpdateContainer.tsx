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
import OnClickButton from '../../components/common/button/OnClickButton';
import { useToast } from '../../context/toast-context';

const BlogUpdateContainer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

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
        toast('Blog updation has been successful.', 'success');
      })
      .catch(err => {
        setErrorMessage(err?.data?.message);
        toast(err?.data?.message, 'error');
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
      <div className="flex items-center justify-between">
        <h1>Update Blog</h1>

        <OnClickButton
          action={() => navigate(`${BLOG_DETAILS_PATH}/${slug}`)}
          text="Details Blog"
          icon={<MdOutlineImageSearch size={18} />}
        />
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
