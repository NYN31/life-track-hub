import React, { Dispatch } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IBlogFormInputs, BlogStatus, TagOption } from '../../types/blog';
import Select from 'react-select';
import { tagOptions } from '../../constants/tag-options';
import { customItemsForMarkdown } from '../../constants/blog-editor-icons';
import MarkdownEditor from './MarkdownEditor';
import { getCustomSelectStyles } from '../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../helper/hooks/useDarkMode';
import OnSubmitButton from '../common/button/OnSubmitButton';

const BlogUpdateForm: React.FC<{
  title: string;
  status: BlogStatus;
  content: string;
  currTags: TagOption[];
  coverImagePath: string;
  isSaving: boolean;
  updateHandler: (data: any, reset: () => void) => void;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
}> = ({
  title,
  status,
  content,
  currTags,
  coverImagePath,
  isSaving,
  updateHandler,
}) => {
  const isDark = useDarkMode();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IBlogFormInputs>({
    mode: 'onChange',
    defaultValues: {
      title,
      status,
      content,
      tags: currTags,
      coverImagePath,
    },
  });

  const onSubmit: SubmitHandler<IBlogFormInputs> = async data => {
    if (!data || !isDirty) return;

    updateHandler(data, reset);
  };

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
          <option value="DELETED">DELETED</option>
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
          defaultValue={currTags}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              {...register('tags')}
              isSearchable={true}
              placeholder="Select tags"
              options={tagOptions}
              className="react-select-container dark:react-select-dark"
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
        text="Update Blog"
        isSaving={isSaving}
        isDirty={isDirty}
        hasError={Object.keys(errors).length > 0}
      />
    </form>
  );
};

export default BlogUpdateForm;
