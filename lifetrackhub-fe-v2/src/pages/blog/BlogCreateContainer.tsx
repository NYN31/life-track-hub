import { useSelector } from 'react-redux';
import BlogCreateForm from '../../components/blog/BlogCreateForm';

const BlogCreateContainer = () => {
  const blogDetails = useSelector((state: any) => state.blog);

  return (
    <div className="common-box-container animate-fade-in">
      <h1>Write a New Blog</h1>

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
