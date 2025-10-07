import React from 'react';
import { HeaderColumn } from '../../types/common';

const TableHeader: React.FC<{ header: HeaderColumn[] }> = ({ header }) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {header.map((item, idx) => (
          <th
            key={idx}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          >
            {item.description}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
