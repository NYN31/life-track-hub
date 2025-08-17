import { FiTrash } from 'react-icons/fi';

interface OnClickDeleteButtonProps {
  handleRemover: () => void;
  absolute?: boolean;
  title?: string;
}

const OnClickTrashIcon: React.FC<OnClickDeleteButtonProps> = ({
  handleRemover,
  absolute = true,
  title = 'Delete',
}) => {
  return (
    <button
      type="button"
      onClick={handleRemover}
      className={`${
        absolute ? 'absolute top-3 right-3' : ''
      } p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-900 transition`}
      title={title}
    >
      <FiTrash className="text-red-500 text-lg" />
    </button>
  );
};

export default OnClickTrashIcon;
