import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
import { customItemsForMarkdown } from '../../constants/blog-editor-icons';
import MarkdownEditor from './MarkdownEditor';

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
    mode: 'onChange',
    defaultValues: {
      title: blogDetails.title,
      status: blogDetails.status || 'PUBLIC',
      tags: currentTags,
      coverImagePath: blogDetails.coverImagePath,
      content: blogDetails.content,
    },
  });

  const watchedValues = watch();

  // --- Handlers ---
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

  // --- Autosave Draft ---
  useEffect(() => {
    const handler = setTimeout(() => {
      const { title, status, content, tags, coverImagePath } = watchedValues;
      console.log('Tags: ', tags);
      if (title || content || status || tags.length > 0 || coverImagePath) {
        const newDraft = {
          title,
          status,
          content,
          tags,
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
    watchedValues.tags.length,
    watchedValues.status,
    watchedValues.coverImagePath,
    dispatch,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white shadow-sm rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 animate-fade-in"
    >
      {/* Blog Title */}
      <div>
        <label
          htmlFor="title"
          className="block mb-1 font-semibold text-gray-700"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow"
          placeholder="Enter blog title"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block mb-1 font-semibold text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow"
        >
          <option value="PUBLIC">PUBLIC</option>
          <option value="PRIVATE">PRIVATE</option>
          <option value="DELETED">DELETED</option>
          <option value="DRAFT">DRAFT</option>
        </select>
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="block mb-1 font-semibold text-gray-700"
        >
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
              styles={{
                control: base => ({
                  ...base,
                  borderColor: '#a78bfa',
                  boxShadow: 'none',
                  '&:hover': { borderColor: '#7c3aed' },
                }),
              }}
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
          className="block mb-1 font-semibold text-gray-700"
        >
          Cover Image Path <span className="text-red-500">*</span>
        </label>
        <input
          id="coverImagePath"
          {...register('coverImagePath', {
            required: 'Cover image path is required',
          })}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow"
          placeholder="Enter cover image path"
        />
        {errors.coverImagePath && (
          <p className="text-sm text-red-500 mt-1">
            {errors.coverImagePath.message}
          </p>
        )}
      </div>

      {/* Markdown Content */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Content (Markdown)
        </label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <MarkdownEditor
              value={field.value}
              onChange={field.onChange}
              error={errors.content?.message}
              customItemsForMarkdown={customItemsForMarkdown}
            />
          )}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoadingBlogCreation}
        className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-purple-700 hover:to-purple-600 transition flex items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500"
      >
        {isLoadingBlogCreation ? (
          <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
        ) : null}
        Publish Blog
      </button>

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default BlogCreateForm;
