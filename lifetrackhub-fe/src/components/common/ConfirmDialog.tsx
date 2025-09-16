import React, { useState, useRef } from 'react';
import ModalPortal from '../../ModalPortal';
import { useOnClickOutside } from '../../helper/hooks/useOnClickOutside';

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
  useOnClickOutside(cancelRef, () => {
    setIsOpen(false);
  });

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
      {/* Overlay with opacity */}
      <div className="modal" role="dialog" area-modal="true">
        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="common-box-container max-w-md w-full mx-auto">
            <h2>{actionName}</h2>
            <p className="mt-2 text-gray-900 dark:text-gray-50">
              Are you sure you want to perform this action?
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                ref={cancelRef}
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white transition-colors ${
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
      </div>
    </ModalPortal>
  );
};

export default ConfirmDialog;
