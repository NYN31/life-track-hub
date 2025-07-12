import React from 'react';

interface PaginationProps {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  currentPageNo: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  handlePreviousPage,
  handleNextPage,
  currentPageNo,
  hasPrevious,
  hasNext,
  totalPages,
  onPageChange,
}) => {
  // Show up to 5 page numbers, centered on current page
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(0, currentPageNo - 2);
    let end = Math.min(totalPages - 1, currentPageNo + 2);
    if (currentPageNo <= 1) {
      end = Math.min(4, totalPages - 1);
    }
    if (currentPageNo >= totalPages - 2) {
      start = Math.max(0, totalPages - 5);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex justify-center items-center gap-2 select-none">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPrevious}
        className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        &larr;
      </button>
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange && onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-semibold transition border-2 ${
            page === currentPageNo
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white border-purple-500 shadow'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-purple-50 hover:border-purple-400'
          }`}
          disabled={page === currentPageNo}
          aria-current={page === currentPageNo ? 'page' : undefined}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={!hasNext}
        className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
