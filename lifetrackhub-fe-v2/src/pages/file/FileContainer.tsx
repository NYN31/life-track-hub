import React, { useState } from 'react';
import FileUpload from '../../components/file/FileUpload';
import FileList from '../../components/file/FileList';

const FileContainer: React.FC = () => {
  const [reloadKey, setReloadKey] = useState(0);

  const handleUploadSuccess = () => {
    setReloadKey(k => k + 1);
  };

  return (
    <div className="common-box-container">
      <h1>Files Management</h1>
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
