import React from 'react';
import { ScreenType, UserRole } from '../types';
import { ASSET_URLS } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  unreadCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  userRole: UserRole;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  unreadCount = 3,
  onOpenNotifications,
  onOpenProfile,
  userRole,
}) => {
  if (currentScreen === 'login') {
    return null;
  }

  if (currentScreen === 'order-detail') {
    return (
      <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-[#dde1e6] pt-safe shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-2 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-1 min-w-0 pr-2">
            <button
              aria-label="Go back"
              onClick={onBack || (() => onNavigate('orders'))}
              className="min-w-[48px] min-h-[48px] w-12 h-12 flex items-center justify-center text-[#20242b] hover:text-[#e60000] active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-[17px] font-bold text-[#20242b] leading-tight truncate">
                Order Detail
              </h1>
              <span className="text-[11px] text-[#5a5f68] font-semibold truncate">
                ABB KYC Collaboration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 pr-3">
            <button
              onClick={onOpenProfile}
              className="w-11 h-11 flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity"
              aria-label="User Profile"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-[#dde1e6]"
                src={ASSET_URLS.profileAvatar}
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Get screen-specific subtitle
  const getSubtitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Supplier Collaboration • Home Dashboard';
      case 'orders':
        return 'Supplier Collaboration • Orders';
      case 'proof-and-docs':
        return 'Supplier Collaboration • Proof & Docs';
      case 'exceptions':
        return 'Supplier Collaboration • Exceptions';
      default:
        return 'Supplier Collaboration';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-[#dde1e6] shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        <div 
          className="flex items-center gap-2.5 min-w-0 cursor-pointer select-none"
          onClick={() => onNavigate('home')}
        >
          <img
            alt="ABB KYC Logo"
            className="h-8 w-auto object-contain shrink-0"
            src={ASSET_URLS.abbLogo}
          />
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-extrabold text-[#20242b] uppercase tracking-tight truncate leading-none">
                ABB KYC
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#e5e8f2] text-[#5a5f68] text-[10px] font-bold shrink-0 uppercase tracking-wide">
                {userRole === 'supplier' ? 'Verified' : 'ABB Staff'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#5a5f68] truncate mt-0.5">
              {getSubtitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onOpenNotifications}
            className="relative w-11 h-11 flex items-center justify-center text-[#5a5f68] hover:text-[#20242b] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-[#b70100] text-white text-[10px] leading-none rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button
            onClick={onOpenProfile}
            className="w-11 h-11 flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity"
            aria-label="User Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-[#dde1e6]"
              src={ASSET_URLS.profileAvatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
