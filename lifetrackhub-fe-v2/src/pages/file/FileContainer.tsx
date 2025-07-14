import React, { useState } from 'react';
import FileUpload from '../../components/file/FileUpload';
import FileList from '../../components/file/FileList';

const FileContainer: React.FC = () => {
  const [reloadKey, setReloadKey] = useState(0);

  const handleUploadSuccess = () => {
    setReloadKey(k => k + 1);
  };

  return (
    <div className="border border-purple-100 dark:border-gray-700 shadow-sm rounded-lg p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Files Management
      </h1>
      <div className="flex flex-col gap-8">
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        <div className="flex flex-col">
          <FileList reloadKey={reloadKey} />
        </div>
      </div>
    </div>
  );
};

export default FileContainer;
