import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { BlogVisibility } from '../../types/blog';
import Select from 'react-select';

type TagOption = {
  value: string;
  label: string;
};

interface BlogFormInputs {
  title: string;
  visibility: BlogVisibility;
  tags: TagOption[];
  content: string;
}

const tagOptions = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'webdev', label: 'Web Development' },
  { value: 'frontend', label: 'Frontend' },
];

const BlogEditorForm: React.FC = () => {
  const [currentTags] = useState<string[]>([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    defaultValues: {
      title: '',
      visibility: 'PUBLIC',
      tags: [],
      content: '',
    },
  });

  const onSubmit: SubmitHandler<BlogFormInputs> = data => {
    // const tagList = data.tags
    //   .split(',')
    //   .map(tag => tag.trim())
    //   .filter(tag => tag !== '');
    // console.log({ ...data, tags: tagList });
    // Submit to API or handle blog post here

    console.log(data);

    const res = {
      ...data,
      tags: data.tags.map(tag => tag.value),
    };

    console.log(res);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Write a New Blog
      </h2>

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

          {/* Optional: display validation error */}
          {errors.tags && (
            <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
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
                className="rounded border"
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
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditorForm;
