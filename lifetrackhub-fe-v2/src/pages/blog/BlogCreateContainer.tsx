import { useSelector } from 'react-redux';
import BlogCreateForm from '../../components/blog/BlogCreateForm';

const BlogCreateContainer = () => {
  const blogDetails = useSelector((state: any) => state.blog);

  return (
    <div className="border border-purple-100 shadow-sm rounded-lg p-4 md:p-6 lg:p-8">
      <h2 className="mx-auto text-2xl font-bold mb-6 text-gray-800">
        Write a New Blog
      </h2>

      {blogDetails && (
        <BlogCreateForm
          blogDetails={blogDetails}
          currentTags={blogDetails.tags || []}
        />
      )}
    </div>
  );
};

export default BlogCreateContainer;
