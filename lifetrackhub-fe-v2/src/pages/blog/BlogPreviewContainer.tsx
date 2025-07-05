import React from 'react';
import DisplayBlog from '../../components/blog/DisplayBlog';
import { useSelector } from 'react-redux';

const BlogPreviewContainer: React.FC = () => {
  const draftBlog = useSelector((state: any) => state.blog);

  return (
    <div className="flex items-center justify-center">
      <DisplayBlog blogData={draftBlog} />
    </div>
  );
};

export default BlogPreviewContainer;
