import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

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
    <div className="mt-10 flex justify-center items-center gap-1 md:gap-2 select-none">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPrevious}
        className="btn-pagination-arrow"
        aria-label="Previous page"
      >
        <MdOutlineKeyboardArrowLeft size={20} />
      </button>
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange && onPageChange(page)}
          className={
            page === currentPageNo
              ? 'btn-pagination-selected'
              : 'btn-pagination-not-selected'
          }
          disabled={page === currentPageNo}
          aria-current={page === currentPageNo ? 'page' : undefined}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={!hasNext}
        className="btn-pagination-arrow"
        aria-label="Next page"
      >
        <MdOutlineKeyboardArrowRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
