import { MdOutlineCancel } from 'react-icons/md';
import { Toast, ToastType } from '../../context/toast-context';

const typeClasses: Record<ToastType, string> = {
  error: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
  info: 'bg-blue-600 text-white',
  warning: 'bg-yellow-400 text-black',
};

interface ToastProps {
  toast: Toast;
  removeToast: (id: number) => void;
}

const CustomToast: React.FC<ToastProps> = ({ toast, removeToast }) => {
  return (
    <div
      className={`flex items-center justify-between space-x-2 px-5 py-3 rounded-lg shadow-lg 
                 transition-all duration-700 ease-in-out
                 ${typeClasses[toast.type]}
                 ${
                   toast.visible
                     ? 'opacity-100 translate-y-0'
                     : 'opacity-0 translate-y-6'
                 }`}
      role="alert"
    >
      <div className="flex items-center space-x-2">
        <span>{toast.message}</span>
      </div>

      {/* Close button */}
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-4 text-white font-bold focus:outline-none"
      >
        <MdOutlineCancel size="20" color="black" />
      </button>
    </div>
  );
};

export default CustomToast;
