import React from 'react';
import { formatHumanReadableDate } from '../../helper/utils/get-date';
import { Link } from 'react-router-dom';
import { BLOG_DETAILS_PATH } from '../../constants/title-and-paths';
import { extractCleanTextFromMarkdown } from '../../helper/utils/extract-text-from-markdown';
import fallbackImage from '../../assets/blogFallback.png';

const BlogCard: React.FC<{
  title: string;
  content: string;
  username: string;
  slug: string;
  createdDate: string;
  coverImage?: string;
}> = ({ title, content, username, slug, createdDate, coverImage }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <Link to={`${BLOG_DETAILS_PATH}/${slug}`}>
        <img
          src={coverImage || fallbackImage}
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
      <Link to={`${BLOG_DETAILS_PATH}/${slug}`}>
        <p className="text-gray-600 mb-3">
          {extractCleanTextFromMarkdown(content).slice(0, 100)}

          <span>{' ['}</span>
          <span className="text-blue-500 cursor-pointer hover:underline">
            {'See more'}
          </span>
          <span>{']'}</span>
        </p>
      </Link>
      <div className="text-sm text-gray-500">
        By <span className="font-medium text-gray-600">{username}</span>{' '}
        &middot; <span>{formatHumanReadableDate(createdDate)}</span>
      </div>
      <div></div>
    </div>
  );
};

export default BlogCard;
