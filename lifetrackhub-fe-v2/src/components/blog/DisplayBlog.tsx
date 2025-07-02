import MarkdownPreview from '@uiw/react-markdown-preview';

const DisplayBlog = () => {
  const blog = {
    title: 'No title',
    content: 'Empty',
    tags: [],
    visibility: 'PUBLIC',
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{blog.title}</h1>

      {/* Visibility */}
      <div className="text-sm font-medium text-gray-500">
        Visibility:{' '}
        <span
          className={`inline-block px-2 py-1 rounded ${
            blog.visibility === 'PUBLIC'
              ? 'bg-green-100 text-green-800'
              : blog.visibility === 'PRIVATE'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {blog.visibility}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {blog.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Markdown Content Preview */}
      <div className="bg-white p-4">
        <MarkdownPreview source={blog.content} />
      </div>
    </div>
  );
};

export default DisplayBlog;
