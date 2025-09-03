import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomToast from '../components/common/CustomToast';

export type ToastType = 'error' | 'success' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
  visible?: boolean;
}

interface ToastContextProps {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    message: string,
    type: ToastType = 'info',
    duration = 3000
  ) => {
    const id = ++toastId;
    const newToast: Toast = { id, message, type, duration, visible: false };
    setToasts(prev => [...prev, newToast]);

    // Make it visible after next tick for smooth fade-in
    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => (t.id === id ? { ...t, visible: true } : t))
      );
    }, 50);

    // Auto remove after duration
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-[80px] left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 z-50 w-[80%] sm:w-auto">
        {toasts.map(toast => (
          <CustomToast key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context.addToast;
};
