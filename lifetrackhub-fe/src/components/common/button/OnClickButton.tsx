import React from 'react';

interface OnClickButtonProps {
  color?: string;
  text?: string;
  width?: string;
  height?: string;
  cursor?: string;
  isDisable?: boolean;
  isLoading?: boolean;
  action: () => void;
  borderRadius?: string;
  icon?: React.ReactNode;
  hasStyle?: boolean;
}

const OnClickButton: React.FC<OnClickButtonProps> = ({
  text = '',
  width = 'auto',
  height = 'auto',
  cursor = 'pointer',
  isDisable = false,
  isLoading = false,
  action,
  borderRadius = '0.5rem', // default 8px
  icon = null,
  hasStyle = true,
}) => {
  const isDisabled = isDisable || isLoading;

  return (
    <button
      onClick={action}
      disabled={isDisabled}
      className={`${
        hasStyle ? 'btn-secondary' : 'p-2 rounded-full hover:bg-teal-200'
      }  ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        width,
        height,
        cursor,
        borderRadius,
      }}
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="flex items-center gap-2">
          {icon && <span className="inline-block">{icon}</span>}
          {text && <span className="block">{text}</span>}
        </div>
      )}
    </button>
  );
};

export default OnClickButton;
