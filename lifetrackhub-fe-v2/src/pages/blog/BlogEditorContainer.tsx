import BlogEditorForm from '../../components/blog/BlogEditorForm';

const BlogEditorContainer = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full h-full max-w-6xl p-6 bg-white rounded-2xl shadow-md">
        <BlogEditorForm />
      </div>
    </div>
  );
};

export default BlogEditorContainer;
