import React from 'react';

const BlogCard: React.FC<{
  title: string;
  content: string;
  slug: string;
  createdDate: string;
}> = ({ title, content, slug, createdDate }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-3 line-clamp-3">{content}</p>
      <div className="text-sm text-gray-500">
        <span>By {slug}</span> &middot;{' '}
        <span>{new Date(createdDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default BlogCard;
