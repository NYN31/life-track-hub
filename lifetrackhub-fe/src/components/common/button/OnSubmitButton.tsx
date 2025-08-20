import Spinner from '../Spinner';
import { FaRegSave } from 'react-icons/fa';

interface OnSubmitButtonProps {
  text: string;
  isSaving: boolean;
  isDirty: boolean;
  hasError?: boolean;
}

const OnSubmitButton: React.FC<OnSubmitButtonProps> = ({
  text,
  isSaving,
  isDirty,
  hasError = false,
}) => {
  return (
    <button
      type="submit"
      className={
        isSaving || !isDirty || hasError
          ? 'btn-submit-disabled'
          : 'btn-submit-enabled'
      }
      disabled={isSaving || !isDirty}
    >
      {isSaving ? (
        <span className="flex items-center gap-2">
          <Spinner /> Saving...
        </span>
      ) : (
        <span className="flex flex-row gap-3 line-clamp-1">
          <FaRegSave size={18} /> {text}
        </span>
      )}
    </button>
  );
};

export default OnSubmitButton;
