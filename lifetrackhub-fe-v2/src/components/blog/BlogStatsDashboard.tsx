import React from 'react';
import { IBlogStats } from '../../types/blog';
import { FaEye, FaLock, FaTrash, FaEdit } from 'react-icons/fa';

const statusIcon = {
  PUBLIC: <FaEye className="text-green-600" />,
  PRIVATE: <FaLock className="text-yellow-600" />,
  DELETED: <FaTrash className="text-red-600" />,
  DRAFT: <FaEdit className="text-gray-600" />,
};

const BlogStatsDashboard: React.FC<{ stats: IBlogStats }> = ({ stats }) => {
  const { statusCounts } = stats;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-4">Visibility</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statusCounts.map(({ status, count }) => (
          <div
            key={status}
            className="flex items-center p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-sm hover:shadow-md transition justify-center border-gray-200 dark:border-gray-700"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mr-4">
              {statusIcon[status]}
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{status}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{count}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogStatsDashboard;
