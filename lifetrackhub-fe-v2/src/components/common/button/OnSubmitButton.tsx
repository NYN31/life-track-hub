import Spinner from '../Spinner';

interface OnSubmitButtonProps {
  text: string;
  isSaving: boolean;
  isDirty: boolean;
}

const OnSubmitButton: React.FC<OnSubmitButtonProps> = ({
  text,
  isSaving,
  isDirty,
}) => {
  return (
    <button
      type="submit"
      className={
        isSaving || !isDirty ? 'btn-submit-disabled' : 'btn-submit-enabled'
      }
      disabled={isSaving || !isDirty}
    >
      {isSaving ? (
        <span className="flex items-center gap-2">
          <Spinner /> Saving...
        </span>
      ) : (
        <span className='line-clamp-1'>💾 {text}</span>
      )}
    </button>
  );
};

export default OnSubmitButton;
