import React from 'react';
import { formatHumanReadableDate } from '../../helper/utils/get-date';

const BlogCard: React.FC<{
  title: string;
  content: string;
  username: string;
  slug: string;
  createdDate: string;
}> = ({ title, content, username, slug, createdDate }) => {
  console.log(slug);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-3 line-clamp-3">{content}</p>
      <div className="text-sm text-gray-500">
        By <span className="font-medium text-gray-600">{username}</span>{' '}
        &middot; <span>{formatHumanReadableDate(createdDate)}</span>
      </div>
    </div>
  );
};

export default BlogCard;
