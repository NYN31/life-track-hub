import React from 'react';
import { formatHumanReadableDate } from '../../helper/utils/get-date';
import { Link } from 'react-router-dom';
import { BLOG_DETAILS_PATH } from '../../constants/title-and-paths';
import { extractCleanTextFromMarkdown } from '../../helper/utils/extract-text-from-markdown';
import fallbackImage from '../../assets/blogFallback.png';
import { BlogContentType, BlogVisibility } from '../../types/blog';

const BlogCard: React.FC<{
  title: string;
  content: string;
  username: string;
  visibility: BlogVisibility;
  contentType: BlogContentType;
  slug: string;
  createdDate: string;
  coverImagePath?: string;
}> = ({
  title,
  content,
  username,
  visibility,
  contentType,
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
          className="w-full h-48 object-cover rounded-lg mb-4"
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
        Visibility:{' '}
        <span
          className={`inline-block px-2 py-1 rounded ${
            visibility === 'PUBLIC'
              ? 'bg-green-100 text-green-800'
              : visibility === 'PRIVATE'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {visibility}
        </span>
      </div>

      <div className="text-sm font-medium text-gray-500">
        Content Type:{' '}
        <span
          className={`inline-block px-2 py-1 rounded ${
            contentType === 'PUBLISHED'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {contentType}
        </span>
      </div>

      <div className="text-sm text-gray-500">
        By <span className="font-medium text-gray-600">{username}</span>{' '}
        &middot; <span>{formatHumanReadableDate(createdDate)}</span>
      </div>
    </div>
  );
};

export default BlogCard;
