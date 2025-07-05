import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { BlogFormInputs, BlogVisibility } from '../../types/blog';

const BlogUpdateForm: React.FC<{
  title: string;
  visibility: BlogVisibility;
  content: string;
  isLoadingUpdation: boolean;
  updateHandler: (data: any, reset: () => void) => void;
}> = ({ title, visibility, content, isLoadingUpdation, updateHandler }) => {
  //const dispatch = useDispatch();
  //const auth = useAuth();

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
      tags: [],
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
