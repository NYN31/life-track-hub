import { useSelector } from 'react-redux';
import BlogCreateForm from '../../components/blog/BlogCreateForm';
import { useEffect, useState } from 'react';
import { TagOption } from '../../types/blog';

const BlogCreateContainer = () => {
  const blogDetails = useSelector((state: any) => state.blog);
  console.log(blogDetails);
  const [currTags, setCurrTags] = useState<TagOption[]>([]);
  console.log(currTags);

  useEffect(() => {
    setCurrTags(blogDetails.tags);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Write a New Blog
      </h2>

      <BlogCreateForm blogDetails={blogDetails} currentTags={currTags} />
    </div>
  );
};

export default BlogCreateContainer;
