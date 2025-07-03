import React from 'react';
import { formatHumanReadableDate } from '../../helper/utils/get-date';
import { Link } from 'react-router-dom';
import { BLOG_UPDATED_PATH } from '../../constants/title-and-paths';

const BlogCard: React.FC<{
  title: string;
  content: string;
  username: string;
  slug: string;
  createdDate: string;
}> = ({ title, content, username, slug, createdDate }) => {
  return (
    <Link to={`${BLOG_UPDATED_PATH}/${slug}`} target="_blank">
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-3 line-clamp-3">{content}</p>
        <div className="text-sm text-gray-500">
          By <span className="font-medium text-gray-600">{username}</span>{' '}
          &middot; <span>{formatHumanReadableDate(createdDate)}</span>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

export default BlogCard;
