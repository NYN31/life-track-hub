import React from 'react';

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
  color = '#9333ea', // default Tailwind purple
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
      className={`btn-primary ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        backgroundColor: color,
        width,
        cursor,
        borderRadius,
      }}
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="flex items-center gap-2">
          {icon && <span className="inline-block">{icon}</span>}{' '}
          <span className="hidden md:block">{text}</span>{' '}
        </div>
      )}
    </button>
  );
};

export default OnClickButton;
