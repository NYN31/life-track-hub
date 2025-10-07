import React from 'react';
import { HeaderColumn } from '../../types/common';

const TableHeader: React.FC<{ header: HeaderColumn[] }> = ({ header }) => {
  return (
    <thead className="bg-purple-600 dark:bg-purple-700">
      <tr>
        {header.map((item, idx) => (
          <th
            key={idx}
            className="px-2 py-3 text-left text-xs font-semibold text-gray-50 dark:text-gray-50 uppercase tracking-wider"
          >
            {item.description}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
