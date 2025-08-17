import { FiTrash } from 'react-icons/fi';

interface OnClickDeleteButtonProps {
  handleRemover: () => void;
  absolute?: boolean;
  title?: string;
  text?: string;
}

const OnClickTrashIcon: React.FC<OnClickDeleteButtonProps> = ({
  handleRemover,
  absolute = true,
  title = 'Delete',
  text = '',
}) => {
  return (
    <button
      type="button"
      onClick={handleRemover}
      className={`${
        absolute ? 'absolute top-3 right-3' : ''
      } p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-900 transition flex flex-row items-center gap-2 text-red-500`}
      title={title}
    >
      <FiTrash className="text-red-500 text-lg" /> {text}
    </button>
  );
};

export default OnClickTrashIcon;
