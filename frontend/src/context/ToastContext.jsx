import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, Error, Warning, Info, Close } from '@mui/icons-material';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastItem = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <Error className="w-5 h-5 text-red-500" />,
    warning: <Warning className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className={`flex items-start p-4 rounded-lg border shadow-lg ${bgColors[toast.type]} animate-slide-up`}>
      <div className="flex-shrink-0 mr-3">
        {icons[toast.type]}
      </div>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-secondary font-semibold text-gray-900 text-sm mb-1">
            {toast.title}
          </p>
        )}
        <p className="font-primary text-gray-700 text-sm">
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
      >
        <Close className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, title) => {
    addToast({ type: 'success', message, title });
  }, [addToast]);

  const showError = useCallback((message, title) => {
    addToast({ type: 'error', message, title });
  }, [addToast]);

  const showWarning = useCallback((message, title) => {
    addToast({ type: 'warning', message, title });
  }, [addToast]);

  const showInfo = useCallback((message, title) => {
    addToast({ type: 'info', message, title });
  }, [addToast]);

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
          {toasts.map(toast => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};
