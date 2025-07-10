import React from 'react';
import { IBlogStats } from '../../types/blog';
import { FaEye, FaLock, FaTrash, FaFileAlt, FaEdit } from 'react-icons/fa';

const visibilityIcons = {
  PUBLIC: <FaEye className="text-green-600" />,
  PRIVATE: <FaLock className="text-yellow-600" />,
  DELETED: <FaTrash className="text-red-600" />,
};

const contentTypeIcons = {
  PUBLISHED: <FaFileAlt className="text-blue-600" />,
  DRAFT: <FaEdit className="text-gray-600" />,
};

const BlogStatsDashboard: React.FC<{ stats: IBlogStats }> = ({
  stats,
}) => {
  const { visibilityCounts, contentTypeCounts } = stats;

  return (
    <>
      {/* Section 1: Visibility Stats */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Visibility</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {visibilityCounts.map(({ visibility, count }) => (
            <div
              key={visibility}
              className="flex items-center p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
            >
              <div className="p-3 bg-gray-100 rounded-full mr-4">
                {visibilityIcons[visibility]}
              </div>
              <div>
                <p className="text-sm text-gray-600">{visibility}</p>
                <p className="text-xl font-bold">{count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Content Type Stats */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Content Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contentTypeCounts.map(({ contentType, count }) => (
            <div
              key={contentType}
              className="flex items-center p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
            >
              <div className="p-3 bg-gray-100 rounded-full mr-4">
                {contentTypeIcons[contentType]}
              </div>
              <div>
                <p className="text-sm text-gray-600">{contentType}</p>
                <p className="text-xl font-bold">{count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogStatsDashboard;
