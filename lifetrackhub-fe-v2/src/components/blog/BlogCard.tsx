import React from 'react';
import { formatHumanReadableDate } from '../../helper/utils/get-date';
import { Link } from 'react-router-dom';
import { BLOG_DETAILS_PATH } from '../../constants/title-and-paths';
import { extractCleanTextFromMarkdown } from '../../helper/utils/extract-text-from-markdown';
import fallbackImage from '../../assets/blogFallback.png';
import { BlogStatus } from '../../types/blog';
import { blogStatusColor } from '../../helper/utils/color-code';

const BlogCard: React.FC<{
  title: string;
  content: string;
  username: string;
  status: BlogStatus;
  slug: string;
  createdDate: string;
  coverImagePath?: string;
}> = ({
  title,
  content,
  username,
  status,
  slug,
  createdDate,
  coverImagePath,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <Link to={`${BLOG_DETAILS_PATH}/${slug}`}>
        <img
          src={coverImagePath || fallbackImage}
          alt={title}
          className="w-full h-96 object-cover rounded-lg mb-4"
          loading="lazy"
        />
      </Link>

      <Link to={`${BLOG_DETAILS_PATH}/${slug}`}>
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:underline hover:text-blue-500  line-clamp-1">
          {title}
        </h2>
      </Link>
      <div>
        <p className="text-gray-600 mb-3">
          {extractCleanTextFromMarkdown(content).slice(0, 100)}

          <span>{' ['}</span>
          <Link
            to={`${BLOG_DETAILS_PATH}/${slug}`}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {'Read more'}
          </Link>
          <span>{']'}</span>
        </p>
      </div>

      <div className="text-sm font-medium text-gray-500 pb-2">
        Status:{' '}
        <span
          className={`inline-block px-2 py-1 rounded ${blogStatusColor[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-500">
        Author: <span className="font-medium text-gray-600">{username}</span>
      </div>
      <div className="text-sm text-gray-500">
        Created Date: <span>{formatHumanReadableDate(createdDate)}</span>
      </div>
    </div>
  );
};

export default BlogCard;
