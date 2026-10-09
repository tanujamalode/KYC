import React from 'react';
import { NotificationItem, ScreenType } from '../../types';

interface NotificationsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (notif: NotificationItem) => void;
  onClearAll: () => void;
}

export const NotificationsSheet: React.FC<NotificationsSheetProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col border-l border-[#dde1e6] animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-[#dde1e6] flex items-center justify-between bg-[#f7f8fa]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#fff7f5] text-[#e60000] flex items-center justify-center border border-[#fee2e2]">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#20242b]">Factory Alerts & Feed</h3>
              <p className="text-[11px] text-[#5a5f68]">ABB KYC Live Stream</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-3 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                item.type === 'critical'
                  ? 'bg-[#fff7f5] border-[#fecaca] hover:bg-[#fee2e2]/60'
                  : item.type === 'alert'
                  ? 'bg-white border-[#dde1e6] hover:bg-[#f7f8fa]'
                  : 'bg-white border-[#dde1e6] hover:bg-[#f7f8fa]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[16px] shrink-0 ${
                      item.type === 'critical'
                        ? 'text-[#ba1a1a]'
                        : item.type === 'alert'
                        ? 'text-[#e60000]'
                        : 'text-[#107c41]'
                    }`}
                  >
                    {item.type === 'critical'
                      ? 'report_problem'
                      : item.type === 'alert'
                      ? 'schedule'
                      : 'verified'}
                  </span>
                  <span className="font-bold text-xs text-[#20242b] truncate">{item.title}</span>
                </div>
                <span className="text-[10px] text-[#5a5f68] font-mono shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-xs text-[#5a5f68] mt-1.5 leading-snug">{item.message}</p>
              {item.poRef && (
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[10px] font-bold text-[#b70100] bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">
                    {item.poRef}
                  </span>
                  <span className="text-[#b70100] font-semibold flex items-center gap-0.5">
                    View <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#dde1e6] bg-[#f7f8fa] flex items-center justify-between">
          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-[#5a5f68] hover:text-[#20242b] cursor-pointer"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#20242b] hover:bg-black text-white text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
