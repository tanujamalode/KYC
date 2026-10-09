import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto transition-all duration-300 transform translate-y-0">
      <div className="bg-[#20242b] text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700/50 flex items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-[20px] text-[#ffb4a8] shrink-0">
            {icon}
          </span>
          <span className="text-xs sm:text-sm font-semibold truncate leading-tight">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};
