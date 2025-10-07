import React from 'react';
import { HeaderColumn } from '../../types/common';

const TableHeader: React.FC<{ header: HeaderColumn[] }> = ({ header }) => {
  return (
    <thead className="bg-purple-700 dark:bg-purple-600">
      <tr>
        {header.map((item, idx) => (
          <th
            key={idx}
            className="px-6 py-3 text-left text-xs font-semibold text-gray-50 dark:text-gray-300 uppercase tracking-wider"
          >
            {item.description}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
