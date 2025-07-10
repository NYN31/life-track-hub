import React from 'react';
import { IBlog } from '../../types/blog';
import BlogCard from './BlogCard';

const BlogList: React.FC<{ results: IBlog[] }> = ({ results }) => {
  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {results.map(blog => {
        const username = blog.user.firstname + ' ' + blog.user.lastname;

        return (
          <BlogCard
            key={blog.slug}
            title={blog.title}
            content={blog.content}
            username={username}
            visibility={blog.visibility}
            contentType={blog.contentType}
            slug={blog.slug}
            createdDate={blog.createdDate}
            coverImagePath={blog.coverImagePath}
          />
        );
      })}
    </div>
  );
};

export default BlogList;
