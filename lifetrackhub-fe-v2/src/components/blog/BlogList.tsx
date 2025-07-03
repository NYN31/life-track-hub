import React from 'react';
import { IBlog } from '../../types/blog';
import BlogCard from './BlogCard';

const BlogList: React.FC<{ results: IBlog[] }> = ({ results }) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map(blog => {
        const username = blog.user.firstname + ' ' + blog.user.lastname;

        return (
          <BlogCard
            key={blog.slug}
            title={blog.title}
            content={blog.content}
            username={username}
            slug={blog.slug}
            createdDate={blog.createdDate}
          />
        );
      })}
    </div>
  );
};

export default BlogList;
