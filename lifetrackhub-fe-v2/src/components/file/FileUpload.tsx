import React, { useRef, useState } from 'react';
import { useUploadFileMutation } from '../../features/file/fileApi';
import ErrorMessage from '../common/ErrorMessage';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';

interface FileUploadProps {
  onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFile, { isLoading, isSuccess, isError, error, reset }] =
    useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type.startsWith('image/') || file.type === 'application/pdf')
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
    reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    await uploadFile({ file: selectedFile }).unwrap();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onUploadSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4 w-full max-w-md mx-auto border border-purple-100 dark:border-purple-700"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Upload File
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-gray-700 dark:text-gray-200">Select File</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
        />
        {selectedFile && (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {selectedFile.name}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={!selectedFile || isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {isSuccess && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
          File uploaded successfully!
        </div>
      )}
      {isError && <ErrorMessage message={extractErrorMessage(error) || ''} />}
    </form>
  );
};

export default FileUpload;
