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
    <section className="space-y-8 common-box animate-fade-in w-full sm:w-[90%] md:w-[80%] xl:w-[50%] mx-auto">
      <h3 className="text-center tracking-tight">Visibility</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statusCounts.map(({ status, count }) => (
          <div
            key={status}
            className="common-box-container flex items-center gap-4 p-4"
          >
            <div className="p-3 bg-gray-200 rounded-full mr-4">
              {statusIcon[status]}
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {status}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogStatsDashboard;
