import React, { Dispatch, useRef } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IBlogFormInputs, BlogVisibility, TagOption } from '../../types/blog';
import Select from 'react-select';
import { tagOptions } from '../../constants/tag-options';
import { customItemsForMarkdown } from '../../constants/blog-editor-icons';

const BlogUpdateForm: React.FC<{
  title: string;
  visibility: BlogVisibility;
  content: string;
  currTags: TagOption[];
  coverImagePath: string;
  isLoadingUpdation: boolean;
  updateHandler: (data: any, reset: () => void, contentType: string) => void;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
}> = ({
  title,
  visibility,
  content,
  currTags,
  coverImagePath,
  isLoadingUpdation,
  updateHandler,
  setErrorMessage,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IBlogFormInputs>({
    mode: 'all',
    defaultValues: {
      title,
      visibility,
      content,
      tags: currTags,
      coverImagePath,
    },
  });

  const watchedValues = watch();

  const onSubmit: SubmitHandler<IBlogFormInputs> = async data => {
    updateHandler(data, reset, 'PUBLISHED');
  };

  const draftUpdateHandler = () => {
    if (
      !watchedValues.title ||
      !watchedValues.content ||
      !watchedValues.tags ||
      !watchedValues.visibility ||
      !watchedValues.coverImagePath
    ) {
      setErrorMessage('Please add all fields');
      return;
    }

    updateHandler(
      {
        title: watchedValues.title,
        visibility: watchedValues.visibility,
        content: watchedValues.content,
        tags: watchedValues.tags,
        coverImagePath: watchedValues.coverImagePath,
      },
      reset,
      'DRAFT'
    );
  };

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const scrollTop = textarea.scrollTop;
    const scrollLeft = textarea.scrollLeft;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.slice(start, end);

    const newText =
      value.slice(0, start) + before + selected + after + value.slice(end);

    setValue('content', newText, { shouldDirty: true });

    requestAnimationFrame(() => {
      textarea.focus();

      // Restore cursor position
      const cursorPos = start + before.length + selected.length;
      textarea.setSelectionRange(cursorPos, cursorPos);

      // Restore scroll position
      textarea.scrollTop = scrollTop;
      textarea.scrollLeft = scrollLeft;
    });
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
        <div className="py-4 space-y-4">
          <div className="flex flex-wrap gap-4">
            {customItemsForMarkdown.map(item => {
              return (
                <div
                  key={item.title}
                  onClick={() => insertAtCursor(item.prefix, item.suffix)}
                  className="cursor-pointer"
                >
                  {item.icon}
                </div>
              );
            })}
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                ref={textareaRef}
                id="content"
                className="w-full h-[70vh] p-2 border rounded-lg resize-none font-mono"
                placeholder="Write your markdown here..."
                //onChange={text => field.onChange(text)}
              />
            )}
          />
        </div>
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-2 py-4">
        <button
          type="submit"
          onClick={draftUpdateHandler}
          disabled={isLoadingUpdation}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Draft update
        </button>
        <button
          type="submit"
          disabled={isLoadingUpdation}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Blog
        </button>
      </div>
    </form>
  );
};

export default BlogUpdateForm;
