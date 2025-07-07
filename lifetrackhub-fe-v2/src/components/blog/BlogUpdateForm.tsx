import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { BlogFormInputs, BlogVisibility, TagOption } from '../../types/blog';
import Select from 'react-select';
import { tagOptions } from '../../constants/tag-options';

const BlogUpdateForm: React.FC<{
  title: string;
  visibility: BlogVisibility;
  content: string;
  currTags: TagOption[];
  coverImagePath: string;
  isLoadingUpdation: boolean;
  updateHandler: (data: any, reset: () => void) => void;
}> = ({
  title,
  visibility,
  content,
  currTags,
  coverImagePath,
  isLoadingUpdation,
  updateHandler,
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    mode: 'all',
    defaultValues: {
      title,
      visibility,
      content,
      tags: currTags,
      coverImagePath,
    },
  });

  const onSubmit: SubmitHandler<BlogFormInputs> = async data => {
    updateHandler(data, reset);
  };

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
          defaultValue={currTags}
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
          defaultValue={content}
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
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoadingUpdation}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Blog
        </button>
      </div>
    </form>
  );
};

export default BlogUpdateForm;
