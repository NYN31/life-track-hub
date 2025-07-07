import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { BlogFormInputs } from '../../types/blog';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { blogContentDraft, blogReset } from '../../features/blog/blogSlice';
import { useCreateBlogMutation } from '../../features/blog/blogApi';
import ErrorMessage from '../common/ErrorMessage';
import { resetDraftBlogStorage } from '../../helper/local-storage/reset-blog-storage';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_DETAILS_PATH, BLOG_PATH } from '../../constants/title-and-paths';
import { FaEye } from 'react-icons/fa';
import { tagOptions } from '../../constants/tag-options';

const BlogCreateForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogDetails = useSelector((state: any) => state.blog);

  const [currentTags] = useState<string[]>(blogDetails.tags || []);
  const [isLoadingBlogCreation, setLoadingBlogCreation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [triggerBlogCreate] = useCreateBlogMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    mode: 'all',
    defaultValues: {
      title: blogDetails.title,
      visibility: blogDetails.visibility || 'PUBLIC',
      tags: blogDetails?.tags?.map((tag: string) => ({
        value: tag,
        label: tag,
      })),
      coverImagePath: blogDetails.coverImagePath,
      content: blogDetails.content,
    },
  });

  const watchedValues = watch();

  const onSubmit: SubmitHandler<BlogFormInputs> = async data => {
    setLoadingBlogCreation(true);
    setErrorMessage('');

    const blogData = {
      ...data,
      tags: data.tags.map(tag => tag.value).join(','),
    };

    await triggerBlogCreate(blogData)
      .unwrap()
      .then(res => {
        dispatch(blogReset());
        resetDraftBlogStorage();
        reset();
        navigate(`${BLOG_DETAILS_PATH}/${res.slug}`);
      })
      .catch(err => {
        setErrorMessage(err?.data?.message);
      })
      .finally(() => setLoadingBlogCreation(false));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const { title, visibility, content } = watchedValues;
      if (title && content && visibility) {
        const newDraft = {
          title,
          visibility,
          content,
          //tags: tags.map(tag => tag.value),
        };
        dispatch(blogContentDraft(newDraft));
        localStorage.setItem('draftBlog', JSON.stringify(newDraft));
      }
    }, 2000);

    return () => clearTimeout(handler);
  }, [
    watchedValues.title,
    watchedValues.content,
    watchedValues.tags,
    watchedValues.visibility,
    dispatch,
  ]);

  const hasPreviewPermission = () => {
    return blogDetails.title && blogDetails.content && blogDetails.visibility;
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Write a New Blog
        </h2>
        {hasPreviewPermission() && (
          <Link to={`${BLOG_PATH}/preview`} className="flex gap-2">
            <span className="mt-1">
              <FaEye />
            </span>
            <p>Preview</p>
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Visibility */}
        <div>
          <label
            htmlFor="visibility"
            className="block mb-1 font-medium text-gray-700"
          >
            Visibility
          </label>
          <select
            id="visibility"
            {...register('visibility')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
          >
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="DELETED">DELETED</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block mb-1 font-medium text-gray-700"
          >
            Tags{' '}
            <span className="text-gray-500 text-sm">(Select multiple)</span>
          </label>

          <Controller
            name="tags"
            control={control}
            defaultValue={currentTags?.map(tag => ({ value: tag, label: tag }))}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                isSearchable={true}
                placeholder="Select tags"
                options={tagOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={selected => field.onChange(selected)}
                value={field.value}
              />
            )}
          />
          {errors.tags && (
            <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
          )}
        </div>

        {/* Blog cover image path */}
        <div>
          <label
            htmlFor="coverImagePath"
            className="block mb-1 font-medium text-gray-700"
          >
            Cover Image Path <span className="text-red-500">*</span>
          </label>
          <input
            id="coverImagePath"
            {...register('coverImagePath', { required: 'Title is required' })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            placeholder="Enter blog title"
          />
          {errors.coverImagePath && (
            <p className="text-sm text-red-500 mt-1">
              {errors.coverImagePath.message}
            </p>
          )}
        </div>

        {/* Markdown Content */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Content (Markdown)
          </label>
          <Controller
            control={control}
            name="content"
            rules={{ required: 'Content is required' }}
            render={({ field }) => (
              <MarkdownEditor
                {...field}
                height="400px"
                className="fixed rounded border"
                enablePreview={true}
              />
            )}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={isLoadingBlogCreation}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Blog
        </button>

        {errorMessage && <ErrorMessage message={errorMessage} />}
      </form>
    </div>
  );
};

export default BlogCreateForm;
