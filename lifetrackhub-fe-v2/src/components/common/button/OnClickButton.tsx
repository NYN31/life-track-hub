import React from 'react';

interface OnClickButtonProps {
  color?: string;
  text: string;
  width?: string;
  cursor?: string;
  isDisable?: boolean;
  isLoading?: boolean;
  action: () => void;
  borderRadius?: string;
}

const OnClickButton: React.FC<OnClickButtonProps> = ({
  color = '#2563eb', // default Tailwind blue-600
  text,
  width = 'auto',
  cursor = 'pointer',
  isDisable = false,
  isLoading = false,
  action,
  borderRadius = '0.5rem', // default 8px
}) => {
  const isDisabled = isDisable || isLoading;

  return (
    <button
      onClick={action}
      disabled={isDisabled}
      className={`text-white px-4 py-2 font-medium transition duration-300 ease-in-out ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        backgroundColor: color,
        width,
        cursor,
        borderRadius,
      }}
    >
      {isLoading ? 'Loading...' : text}
    </button>
  );
};

export default OnClickButton;
