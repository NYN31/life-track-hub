import React from 'react';
import { IBlog } from '../../types/blog';
import BlogCard from './BlogCard';

const BlogList: React.FC<{ results: IBlog[] }> = ({ results }) => {
  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-4">
      {results.map(blog => {
        const username = blog.user.firstname + ' ' + blog.user.lastname;
        const authorImage = blog.user.userDetails?.profileImagePath;
        return (
          <BlogCard
            key={blog.slug}
            title={blog.title}
            content={blog.content}
            username={username}
            status={blog.status}
            slug={blog.slug}
            createdDate={blog.createdDate}
            coverImagePath={blog.coverImagePath}
            tags={blog.tags}
            authorImage={authorImage}
            firstname={blog.user.firstname}
            lastname={blog.user.lastname}
          />
        );
      })}
    </div>
  );
};

export default BlogList;
