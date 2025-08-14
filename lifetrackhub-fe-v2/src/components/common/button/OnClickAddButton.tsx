import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface OnClickAddButtonProps {
  text: string;
  handleClick: () => void;
}

const OnClickAddButton: React.FC<OnClickAddButtonProps> = ({
  text,
  handleClick,
}) => {
  return (
    <div
      className="flex flex-row items-center gap-3 text-gray-900 hover:text-gray-600 dark:text-gray-50 dark:hover:text-gray-300 font-semibold"
      onClick={handleClick}
      role="button"
    >
      <button type="button" className="btn-add">
        <FaPlus />
      </button>

      <span className="text-xl">{text}</span>

      <span className="text-gray-500 dark:text-gray-400 text-sm">
        (Optional)
      </span>
    </div>
  );
};

export default OnClickAddButton;
