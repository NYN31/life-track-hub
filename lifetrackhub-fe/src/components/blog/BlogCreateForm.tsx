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
import { tagOptions } from '../../constants/select-options/tag-options';
import { customItemsForMarkdown } from '../../constants/blog-editor-icons';
import MarkdownEditor from './MarkdownEditor';
import useDarkMode from '../../helper/hooks/useDarkMode';
import { getCustomSelectStyles } from '../../helper/utils/get-custom-select-styles';
import OnSubmitButton from '../common/button/OnSubmitButton';

const BlogCreateForm: React.FC<{
  blogDetails: IBlog;
  currentTags: TagOption[];
}> = ({ blogDetails, currentTags }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDark = useDarkMode();
  const isSuperAdmin = localStorage.getItem('role') === 'SUPER_ADMIN';

  const [errorMessage, setErrorMessage] = useState('');
  const [triggerBlogCreate, { isLoading: isSaving }] = useCreateBlogMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
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
    if (!data || !isDirty) return;

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
      });
  };

  // --- Autosave Draft ---
  useEffect(() => {
    const handler = setTimeout(() => {
      const { title, status, content, tags, coverImagePath } = watchedValues;
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
      className="common-box space-y-6 animate-fade-in"
    >
      {/* Blog Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="form-label">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters long',
            },
            maxLength: {
              value: 255,
              message: 'Title must not exceed 255 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9\s.,!?'"-]+$/,
              message:
                'Title can only contain letters, numbers, and basic punctuation (.,!?\'"-)',
            },
          })}
          className="form-input-field"
          placeholder="Enter blog title"
        />
        {errors.title && (
          <p className="form-field-error">{errors.title.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label htmlFor="status" className="form-label">
          Status <span className="text-red-500 text-sm">*</span>
        </label>
        <select
          id="status"
          {...register('status')}
          className="form-input-field"
        >
          <option value="PUBLIC">PUBLIC</option>
          <option value="PRIVATE">PRIVATE</option>
          {isSuperAdmin && <option value="DELETED">DELETED</option>}
          <option value="DRAFT">DRAFT</option>
        </select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label htmlFor="tags" className="form-label">
          Tags <span className="text-gray-500 text-sm">(Select multiple)</span>
        </label>
        {/* The Select component should be styled for dark mode via its styles prop or a custom class if possible */}
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
              className="react-select dark:react-select-dark"
              classNamePrefix="react-select"
              onChange={selected => field.onChange(selected)}
              value={field.value}
              styles={getCustomSelectStyles(isDark)}
            />
          )}
        />
        {errors.tags && (
          <p className="form-field-error">{errors.tags.message}</p>
        )}
      </div>

      {/* Blog cover image path */}
      <div className="space-y-2">
        <label htmlFor="coverImagePath" className="form-label">
          Cover Image Path <span className="text-red-500">*</span>
        </label>
        <input
          id="coverImagePath"
          {...register('coverImagePath', {
            required: 'Cover image path is required',
            minLength: {
              value: 5,
              message: 'Cover image path must be at least 5 characters long',
            },
            maxLength: {
              value: 500,
              message: 'Cover image path must not exceed 500 characters',
            },
          })}
          className="form-input-field"
          placeholder="Enter cover image path"
        />
        {errors.coverImagePath && (
          <p className="form-field-error">{errors.coverImagePath.message}</p>
        )}
      </div>

      {/* Markdown Content */}
      <div className="space-y-2">
        <label className="form-label">
          Content <span className="text-sm text-gray-500">(Markdown)</span>
          <span className="text-red-500">*</span>
        </label>
        <Controller
          name="content"
          control={control}
          rules={{
            required: 'Content is required',
            minLength: {
              value: 50,
              message: 'Content must be at least 50 characters long',
            },
            maxLength: {
              value: 10000,
              message: 'Content cannot exceed 10000 characters',
            },
          }}
          render={({ field }) => (
            <MarkdownEditor
              value={field.value}
              onChange={field.onChange}
              customItemsForMarkdown={customItemsForMarkdown}
            />
          )}
        />

        {errors.content && (
          <p className="form-field-error">{errors.content.message}</p>
        )}
      </div>

      {/* Submit Button */}

      <OnSubmitButton
        text="Publish Blog"
        isSaving={isSaving}
        isDirty={isDirty}
        hasError={Object.keys(errors).length > 0}
      />

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default BlogCreateForm;
