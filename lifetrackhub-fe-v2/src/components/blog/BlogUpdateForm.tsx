import React, { Dispatch } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IBlogFormInputs, BlogStatus, TagOption } from '../../types/blog';
import Select from 'react-select';
import { tagOptions } from '../../constants/tag-options';
import { customItemsForMarkdown } from '../../constants/blog-editor-icons';
import MarkdownEditor from './MarkdownEditor';
import { getCustomSelectStyles } from '../../helper/utils/get-custom-select-styles';
import useDarkMode from '../../helper/hooks/ueDarkMode';

const BlogUpdateForm: React.FC<{
  title: string;
  status: BlogStatus;
  content: string;
  currTags: TagOption[];
  coverImagePath: string;
  isLoadingUpdation: boolean;
  updateHandler: (data: any, reset: () => void) => void;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
}> = ({
  title,
  status,
  content,
  currTags,
  coverImagePath,
  isLoadingUpdation,
  updateHandler,
}) => {
  const isDark = useDarkMode();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
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
    updateHandler(data, reset);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 dark:border-gray-700 animate-fade-in"
    >
      {/* Blog Title */}
      <div>
        <label
          htmlFor="title"
          className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-4 py-2 border border-purple-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none shadow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          placeholder="Enter blog title"
        />
        {errors.title && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
        >
          Status <span className="text-red-500 text-sm">*</span>
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full px-4 py-2 border border-purple-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none shadow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
          className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
        >
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
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            {errors.tags.message}
          </p>
        )}
      </div>

      {/* Blog cover image path */}
      <div>
        <label
          htmlFor="coverImagePath"
          className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
        >
          Cover Image Path <span className="text-red-500">*</span>
        </label>
        <input
          id="coverImagePath"
          {...register('coverImagePath', {
            required: 'Cover image path is required',
          })}
          className="w-full px-4 py-2 border border-purple-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none shadow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          placeholder="Enter cover image path"
        />
        {errors.coverImagePath && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            {errors.coverImagePath.message}
          </p>
        )}
      </div>

      {/* Markdown Content */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
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
        disabled={isLoadingUpdation}
        className="bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-700 dark:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-purple-700 hover:to-purple-600 dark:hover:from-purple-800 dark:hover:to-purple-700 transition flex items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
      >
        {isLoadingUpdation ? (
          <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
        ) : null}
        Update Blog
      </button>
    </form>
  );
};

export default BlogUpdateForm;
