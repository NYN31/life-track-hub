import React from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FileDto } from '../../types/file';
import { FiGlobe } from 'react-icons/fi';
import OnClickTrashIcon from '../common/button/OnClickTrashIcon';

interface FileCardProps {
  file: FileDto;
  fileDeleteHandler: (filePath: string) => {};
}

const FileCard: React.FC<FileCardProps> = ({ file, fileDeleteHandler }) => {
  return (
    <div key={file.filePath} className="common-box flex flex-col items-center">
      {file.fileType === 'IMG' ? (
        <img
          src={file.previewUrl}
          alt={file.originalFileName}
          className="w-48 h-48 object-cover rounded mb-2 border dark:border-gray-700"
        />
      ) : (
        <HiOutlineDocumentText className="w-20 h-20 text-blue-600 dark:text-blue-400 mb-2" />
      )}
      <div className="flex flex-col items-center">
        <div className="font-medium text-gray-800 dark:text-gray-100 line-clamp-1 lg:w-44">
          {file.originalFileName}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {file.fileType}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {new Date(file.createdDate).toLocaleString()}
        </div>

        <div className="flex flex-col items-center gap-2 mt-2">
          <a
            href={file.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-view"
          >
            <FiGlobe /> View
          </a>

          {/* TODO: will implement download functionality later */}
          <OnClickTrashIcon
            handleRemover={() => fileDeleteHandler(file.filePath)}
            absolute={false}
            title="Image Delete"
            text="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
