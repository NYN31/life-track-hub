import React from 'react';

const Pagination: React.FC<{
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  currentPageNo: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
}> = ({
  handlePreviousPage,
  handleNextPage,
  currentPageNo,
  hasPrevious,
  hasNext,
  totalPages,
}) => {
  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPrevious}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-gray-700 font-medium">
        Page {currentPageNo + 1} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={!hasNext}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
