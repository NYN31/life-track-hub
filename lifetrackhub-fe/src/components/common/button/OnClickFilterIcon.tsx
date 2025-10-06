import { FiFilter } from 'react-icons/fi';

interface OnClickFilterIconProps {
  showFilter: boolean;
  showFilterHandler: () => void;
}

const OnClickFilterIcon: React.FC<OnClickFilterIconProps> = ({
  showFilter,
  showFilterHandler,
}) => {
  return (
    <div className="flex items-center justify-end my-4">
      <button
        className={`p-2 rounded-full border border-purple-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-800 transition`}
        onClick={showFilterHandler}
        aria-label="Toggle filters"
      >
        <div
          className={`flex items-center gap-2 text-sm font-mediumn ${
            showFilter
              ? 'text-purple-600 dark:text-purple-300'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <FiFilter size={22} />
          Filter
        </div>
      </button>
    </div>
  );
};

export default OnClickFilterIcon;
