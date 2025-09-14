import React from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

interface PaginationProps {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  currentPageNo: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
}

const SimplePagination: React.FC<PaginationProps> = ({
  handlePreviousPage,
  handleNextPage,
  currentPageNo,
  hasPrevious,
  hasNext,
  totalPages,
}) => {
  return (
    <div className="mt-6 flex justify-center items-center gap-3">
      <button
        className="btn-pagination-arrow"
        disabled={!hasPrevious}
        onClick={handlePreviousPage}
      >
        <MdOutlineKeyboardArrowLeft size={20} />
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-300">
        Page {currentPageNo + 1} of {totalPages}
      </span>
      <button
        className="btn-pagination-arrow"
        disabled={!hasNext}
        onClick={handleNextPage}
      >
        <MdOutlineKeyboardArrowRight size={20} />
      </button>
    </div>
  );
};

export default SimplePagination;
