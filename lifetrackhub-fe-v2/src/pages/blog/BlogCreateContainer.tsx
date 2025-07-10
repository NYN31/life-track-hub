import { useSelector } from 'react-redux';
import { BLOG_PATH } from '../../constants/title-and-paths';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import BlogCreateForm from '../../components/blog/BlogCreateForm';
import { useEffect, useState } from 'react';
import { TagOption } from '../../types/blog';

const BlogCreateContainer = () => {
  const blogDetails = useSelector((state: any) => state.blog);

  const [currTags, setCurrTags] = useState<TagOption[]>([]);

  const hasPreviewPermission = () => {
    return (
      blogDetails.title &&
      blogDetails.content &&
      blogDetails.status &&
      blogDetails.tags &&
      blogDetails.coverImagePath
    );
  };

  useEffect(() => {
    if (blogDetails.tags) {
      setCurrTags(
        blogDetails?.tags.map((tag: string) => ({ value: tag, label: tag }))
      );
    }
  }, [blogDetails.tags]);

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Write a New Blog
        </h2>
        {hasPreviewPermission() && (
          <Link to={`${BLOG_PATH}/preview`} className="flex gap-2">
            <span className="mt-1">
              <FaEye />
            </span>
            <p>Preview</p>
          </Link>
        )}
      </div>

      <BlogCreateForm blogDetails={blogDetails} currentTags={currTags} />
    </div>
  );
};

export default BlogCreateContainer;
