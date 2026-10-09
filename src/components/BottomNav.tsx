import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  exceptionCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  exceptionCount = 1,
}) => {
  // Hide on login and order-detail to match the exact shell design in the screenshots
  if (currentScreen === 'login' || currentScreen === 'order-detail') {
    return null;
  }

  const navItems = [
    {
      id: 'home' as ScreenType,
      label: 'Home',
      icon: 'dashboard',
    },
    {
      id: 'orders' as ScreenType,
      label: 'Orders',
      icon: 'inventory_2',
    },
    {
      id: 'proof-and-docs' as ScreenType,
      label: 'Proof & Docs',
      icon: 'fact_check',
    },
    {
      id: 'exceptions' as ScreenType,
      label: 'Exceptions',
      icon: 'warning',
      badge: exceptionCount > 0 ? exceptionCount : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#dde1e6] shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[64px] h-12 transition-all cursor-pointer ${
                isActive
                  ? 'text-[#b70100] font-bold'
                  : 'text-[#5a5f68] hover:text-[#20242b]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <span className={`material-symbols-outlined text-[22px] transition-transform ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                {item.badge && item.id === 'exceptions' && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#ba1a1a] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#b70100] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
