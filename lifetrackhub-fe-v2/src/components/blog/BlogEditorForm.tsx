import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { BlogFormInputs } from '../../types/blog';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import {
  BLOG_DETAILS_PATH,
  PUBLIC_BLOG_DETAILS_PATH,
} from '../../constants/title-and-paths';
import { useDispatch, useSelector } from 'react-redux';
import { blogContentDraft } from '../../features/blog/blogSlice';
import useAuth from '../../helper/hooks/useAuth';

const tagOptions = [
  { value: 'React', label: 'React' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Frontend', label: 'Frontend' },
];

const BlogEditorForm: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const blogDetails = useSelector((state: any) => state.blog);

  const [currentTags] = useState<string[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    mode: 'all',
    defaultValues: {
      title: blogDetails.title,
      visibility: blogDetails.visibility,
      tags: blogDetails.tags.map((tag: string) => ({ value: tag, label: tag })),
      content: blogDetails.content,
    },
  });

  const watchedValues = watch();

  const onSubmit: SubmitHandler<BlogFormInputs> = data => {
    // const tagList = data.tags
    //   .split(',')
    //   .map(tag => tag.trim())
    //   .filter(tag => tag !== '');
    // console.log({ ...data, tags: tagList });
    // Submit to API or handle blog post here

    const res = {
      ...data,
      tags: data.tags.map(tag => tag.value),
    };

    console.log(res);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const { title, visibility, content, tags } = watchedValues;
      if (title && content && visibility) {
        const newContent = {
          title,
          visibility,
          content,
          tags: tags.map(tag => tag.value),
        };
        dispatch(blogContentDraft(newContent));
        localStorage.setItem('draftBlog', JSON.stringify(newContent));
      }
    }, 3000);

    return () => clearTimeout(handler);
  }, [
    watchedValues.title,
    watchedValues.content,
    watchedValues.tags,
    watchedValues.visibility,
    dispatch,
  ]);

  return (
    <>
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

        <div className="flex gap-4">
          <div className="pt-4">
            <Link
              // onClick={() =>
              //   navigate(auth ? BLOG_DETAILS_PATH : PUBLIC_BLOG_DETAILS_PATH)
              // }
              to={auth ? BLOG_DETAILS_PATH : PUBLIC_BLOG_DETAILS_PATH}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview
            </Link>
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
        </div>
      </form>
    </>
  );
};

export default BlogEditorForm;
