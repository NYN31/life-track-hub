import React from 'react';
import { formatHumanReadableDate } from '../../helper/utils/get-date';
import { Link } from 'react-router-dom';
import { BLOG_DETAILS_PATH } from '../../constants/title-and-paths';
import { extractCleanTextFromMarkdown } from '../../helper/utils/extract-text-from-markdown';
import fallbackImage from '../../assets/blogFallback.png';
import { BlogStatus } from '../../types/blog';
import { blogStatusColor } from '../../helper/utils/color-code';

const getInitials = (firstname: string, lastname: string) => {
  return (
    (firstname?.[0] || '').toUpperCase() + (lastname?.[0] || '').toUpperCase()
  );
};

const BlogCard: React.FC<{
  title: string;
  content: string;
  username: string;
  status: BlogStatus;
  slug: string;
  createdDate: string;
  coverImagePath?: string;
  tags?: string;
  authorImage?: string;
  firstname?: string;
  lastname?: string;
}> = ({
  title,
  content,
  username,
  status,
  slug,
  createdDate,
  coverImagePath,
  tags,
  authorImage,
  firstname = '',
  lastname = '',
}) => {
  // tags: comma-separated string
  const tagList = tags
    ? tags.split(',').filter(tag => tag.trim() !== '')
    : [];

  return (
    <div className="bg-white shadow-sm rounded-lg p-2 md:p3 lg:p-4 border border-purple-100 hover:shadow-md transition duration-200 flex flex-col h-full">
      <Link to={`${BLOG_DETAILS_PATH}/${slug}`} className="block group">
        <img
          src={coverImagePath || fallbackImage}
          alt={title}
          className="w-full h-56 object-cover rounded-lg mb-4 group-hover:opacity-90 transition"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-col flex-1">
        <Link to={`${BLOG_DETAILS_PATH}/${slug}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition line-clamp-1">
            {title}
          </h2>
        </Link>
        <div className="flex flex-wrap gap-2 mb-2">
          {tagList.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {extractCleanTextFromMarkdown(content).slice(0, 120)}
          {content.length > 120 && '...'}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {authorImage ? (
              <img
                src={authorImage}
                alt={username}
                className="w-8 h-8 rounded-full object-cover border border-purple-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-sm border border-purple-300">
                {getInitials(firstname, lastname)}
              </div>
            )}
            <span className="text-gray-700 font-medium text-sm line-clamp-1">{username}</span>
          </div>
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${blogStatusColor[status]}`}
          >
            {status}
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {formatHumanReadableDate(createdDate)}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
