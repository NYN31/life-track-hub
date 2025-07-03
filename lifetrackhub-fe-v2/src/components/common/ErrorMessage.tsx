import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
}) => {
  if (!message) return null;

  return (
    <div
      className={`inline-block bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
