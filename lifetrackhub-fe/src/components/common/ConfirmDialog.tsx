import React, { useState, useRef } from 'react';
import ModalPortal from '../../ModalPortal';

interface ConfirmDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  proceedAction: () => void;
  actionName: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  setIsOpen,
  proceedAction,
  actionName,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);

  const onClose = () => setIsOpen(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await proceedAction();
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  }

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="common-box-container">
          <h2>{actionName}</h2>
          <p className="mt-2 text-gray-900 dark:text-gray-50">
            Are you sure you want to perform this action?
          </p>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              ref={cancelRef}
              onClick={onClose}
              className="px-4 py-1 rounded-md border border-gray-300 text-gray-900 dark:text-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading
                  ? 'bg-red-300 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading ? 'Processing...' : 'Proceed'}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ConfirmDialog;
