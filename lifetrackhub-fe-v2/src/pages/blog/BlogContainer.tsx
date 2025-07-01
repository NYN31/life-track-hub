import React, { useState } from 'react';
import BlogCard from '../../components/blog/BlogCard';

const dummyBlogs = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  title: `Sample Blog Post ${i + 1}`,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel malesuada nulla. Duis dignissim.',
  slug: 'Md Sajjad Hosen Noyon',
  createdDate: new Date(Date.now() - i * 86400000).toISOString(),
}));

const BLOGS_PER_PAGE = 12;

const BlogContainer: React.FC = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(dummyBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = dummyBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  const handlePrev = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBlogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            content={blog.content}
            slug={blog.slug}
            createdDate={blog.createdDate}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BlogContainer;
