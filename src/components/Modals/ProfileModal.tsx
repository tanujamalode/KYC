import React from 'react';
import { UserRole } from '../../types';
import { ASSET_URLS } from '../../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userRole,
  onChangeRole,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-[#dde1e6] overflow-hidden flex flex-col">
        {/* Header with ABB red badge */}
        <div className="p-4 bg-gradient-to-r from-[#20242b] to-[#2d3138] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#e60000] text-white font-black text-xs px-2 py-0.5 rounded">
              ABB
            </span>
            <span className="text-xs font-bold tracking-wider text-gray-200">KYC COLLABORATION</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 flex flex-col items-center text-center border-b border-[#dde1e6]">
          <div className="relative mb-2">
            <img
              src={ASSET_URLS.profileAvatar}
              alt="Rajesh Sharma"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-red-100 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <h3 className="font-bold text-base text-[#20242b]">Rajesh Sharma</h3>
          <p className="text-xs text-[#5a5f68]">Lead Plant QA & Machinist Lead</p>
          <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f1f3fd] border border-[#dde1e6] text-xs font-mono text-[#20242b]">
            <span className="material-symbols-outlined text-[14px] text-[#e60000]">factory</span>
            <span>Precision Metals Ltd (V-44910)</span>
          </div>
          <p className="text-[11px] text-[#5a5f68] mt-1">Plant 04 Vadodara • Substation Tech Bay</p>
        </div>

        {/* Role Switcher */}
        <div className="p-4 space-y-3 bg-[#f7f8fa]">
          <div className="text-xs font-bold text-[#5a5f68] uppercase tracking-wider">
            Active Authentication Role
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChangeRole('supplier')}
              className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                userRole === 'supplier'
                  ? 'border-[#e60000] bg-white text-[#e60000] shadow-xs'
                  : 'border-[#dde1e6] bg-white/50 text-[#5a5f68]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#e60000]" />
              <span>Supplier / Vendor</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeRole('employee')}
              className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                userRole === 'employee'
                  ? 'border-[#e60000] bg-white text-[#e60000] shadow-xs'
                  : 'border-[#dde1e6] bg-white/50 text-[#5a5f68]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#195b9e]" />
              <span>ABB Employee</span>
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-[#dde1e6] space-y-1 text-[11px] text-[#5a5f68]">
            <div className="flex justify-between">
              <span>Security Clearance</span>
              <span className="font-semibold text-emerald-700">Level 3 (Floor Signoff)</span>
            </div>
            <div className="flex justify-between">
              <span>SAP Vendor Code</span>
              <span className="font-mono font-semibold text-[#20242b]">#V-44910-GJ</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 border-t border-[#dde1e6] flex flex-col gap-2">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full py-2.5 rounded-lg border border-[#fee2e2] bg-[#fff7f5] hover:bg-[#fee2e2] text-[#e60000] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Switch Account / Open KYC Login Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
