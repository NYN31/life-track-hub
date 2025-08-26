import React, { useRef, useState } from 'react';
import { useUploadFileMutation } from '../../features/file/fileApi';
import ErrorMessage from '../common/ErrorMessage';
import { extractErrorMessage } from '../../helper/utils/extract-error-message';
import OnSubmitButton from '../common/button/OnSubmitButton';
import SuccessMessage from '../common/SuccessMessage';

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
      className="common-box w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-center">Upload File</h2>

      <div className="flex flex-col gap-2">
        <label className="form-label">Select File</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="form-input-field"
        />
        {selectedFile && (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-bold">File name:</span> {selectedFile.name}
            <br />
            <span className="font-bold">Max file size:</span> 5MB
          </span>
        )}
      </div>

      <div className="flex justify-end">
        <OnSubmitButton
          text="Upload"
          isSaving={isLoading}
          isDirty={true}
          hasError={!selectedFile || isError}
        />
      </div>

      {isSuccess && <SuccessMessage message="File uploaded successfully!" />}
      {isError && <ErrorMessage message={extractErrorMessage(error) || ''} />}
    </form>
  );
};

export default FileUpload;
