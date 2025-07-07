import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { IBlog, IBlogFormInputs, TagOption } from '../../types/blog';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { blogContentDraft, blogReset } from '../../features/blog/blogSlice';
import { useCreateBlogMutation } from '../../features/blog/blogApi';
import ErrorMessage from '../common/ErrorMessage';
import { resetDraftBlogStorage } from '../../helper/local-storage/reset-blog-storage';
import { useNavigate } from 'react-router-dom';
import { BLOG_DETAILS_PATH } from '../../constants/title-and-paths';
import { tagOptions } from '../../constants/tag-options';

const BlogCreateForm: React.FC<{
  blogDetails: IBlog;
  currentTags: TagOption[];
}> = ({ blogDetails, currentTags }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  } = useForm<IBlogFormInputs>({
    mode: 'all',
    defaultValues: {
      title: blogDetails.title,
      visibility: blogDetails.visibility || 'PUBLIC',
      tags: currentTags,
      coverImagePath: blogDetails.coverImagePath,
      content: blogDetails.content,
    },
  });

  const watchedValues = watch();

  const onSubmit: SubmitHandler<IBlogFormInputs> = async data => {
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
      const { title, visibility, content, tags, coverImagePath } =
        watchedValues;
      if (title || content || visibility || tags || coverImagePath) {
        const newDraft = {
          title,
          visibility,
          content,
          tags: tags.map(tag => tag.value),
          coverImagePath,
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
    watchedValues.coverImagePath,
    dispatch,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Blog Title */}
      <div>
        <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
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
        <label htmlFor="tags" className="block mb-1 font-medium text-gray-700">
          Tags <span className="text-gray-500 text-sm">(Select multiple)</span>
        </label>

        <Controller
          name="tags"
          control={control}
          defaultValue={currentTags}
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
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
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
  );
};

export default BlogCreateForm;
