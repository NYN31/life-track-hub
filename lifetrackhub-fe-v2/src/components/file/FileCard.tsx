import React from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FileDto } from '../../types/file';

interface FileCardProps {
  file: FileDto;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  return (
    <div
      key={file.filePath}
      className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-2 md:p3 lg:p-4 border border-purple-100 dark:border-gray-700 hover:shadow-md transition duration-200 flex flex-col items-center"
    >
      {file.fileType === 'IMG' ? (
        <img
          src={file.previewUrl}
          alt={file.originalFileName}
          className="w-48 h-48 object-cover rounded mb-2 border dark:border-gray-700"
        />
      ) : (
        <HiOutlineDocumentText className="w-20 h-20 text-blue-600 dark:text-blue-400 mb-2" />
      )}
      <div className="text-center">
        <div className="font-medium text-gray-800 dark:text-gray-100 line-clamp-1 lg:w-44">
          {file.originalFileName}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {file.fileType}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {new Date(file.createdDate).toLocaleString()}
        </div>
        <a
          href={file.previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          View
        </a>
      </div>
    </div>
  );
};

export default FileCard;
