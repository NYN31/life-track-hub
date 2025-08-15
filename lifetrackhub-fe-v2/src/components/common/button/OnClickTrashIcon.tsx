import { FiTrash } from 'react-icons/fi';

interface OnClickDeleteButtonProps {
  handleRemover: () => void;
}

const OnClickTrashIcon: React.FC<OnClickDeleteButtonProps> = ({
  handleRemover,
}) => {
  return (
    <button
      type="button"
      onClick={handleRemover}
      className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
      title="Remove Social Link"
    >
      <FiTrash className="text-red-500 text-lg" />
    </button>
  );
};

export default OnClickTrashIcon;
