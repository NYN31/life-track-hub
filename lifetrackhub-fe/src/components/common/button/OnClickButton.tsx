import React from 'react';
import { IoHelpCircleOutline } from 'react-icons/io5';

interface OnClickButtonProps {
  color?: string;
  text?: string;
  width?: string;
  cursor?: string;
  isDisable?: boolean;
  isLoading?: boolean;
  action: () => void;
  borderRadius?: string;
  icon?: React.ReactNode;
}

const OnClickButton: React.FC<OnClickButtonProps> = ({
  text = '',
  width = 'auto',
  cursor = 'pointer',
  isDisable = false,
  isLoading = false,
  action,
  borderRadius = '0.5rem', // default 8px
  icon = null,
}) => {
  const isDisabled = isDisable || isLoading;

  return (
    <button
      onClick={action}
      disabled={isDisabled}
      className={`btn-secondary  ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        width,
        cursor,
        borderRadius,
      }}
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="flex items-center gap-2">
          {icon ? (
            <span className="inline-block">{icon}</span>
          ) : (
            <IoHelpCircleOutline size="20" />
          )}{' '}
          <span className="hidden md:block">{text}</span>{' '}
        </div>
      )}
    </button>
  );
};

export default OnClickButton;
