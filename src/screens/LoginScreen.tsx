import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>('supplier');
  const [email, setEmail] = useState('rajesh.sharma@precisionmetals.com');
  const [password, setPassword] = useState('Precision#2024Secure!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'supplier') {
      setEmail('rajesh.sharma@precisionmetals.com');
    } else {
      setEmail('rajesh.sharma@ch.abb.com');
    }
  };

  const handleAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess(role);
      }, 700);
    }, 900);
  };

  const handleSSO = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess('employee');
      }, 700);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col justify-center items-center px-4 py-8 antialiased">
      <div className="w-full max-w-[420px] flex flex-col">
        {/* Primary Industrial Login Card */}
        <div className="bg-white rounded-xl p-5 shadow-lg border border-[#dde1e6] flex flex-col">
          {/* ABB Branding Header & SSL Security Badge */}
          <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#dde1e6]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#E60000] flex items-center justify-center shadow-sm shrink-0">
                <span className="font-extrabold text-white tracking-tighter text-sm">ABB</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[16px] font-bold text-[#181c23] tracking-tight leading-tight">
                    ABB KYC
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ebeef7] px-1.5 py-0.5 rounded text-[#5a5f68] font-mono">
                    PORTAL
                  </span>
                </div>
                <span className="text-[12px] text-[#5a5f68] font-medium leading-none mt-0.5">
                  Supplier Collaboration
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] px-2 py-1 rounded-md text-[11px] font-bold tracking-wide">
              <span className="material-symbols-outlined text-[13px] font-bold">lock</span>
              <span>SSL 256-bit</span>
            </div>
          </div>

          {/* Role Toggle Segmented Control */}
          <div className="mb-4">
            <div className="w-full bg-[#f1f3fd] p-1 rounded-lg flex items-center">
              <button
                type="button"
                onClick={() => handleRoleChange('supplier')}
                className={`flex-1 py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  role === 'supplier'
                    ? 'bg-white shadow-sm text-[#181c23] font-bold'
                    : 'text-[#5a5f68] hover:text-[#181c23] font-medium'
                } text-[13px]`}
              >
                <span className="w-2 h-2 rounded-full bg-[#E60000]" />
                <span>Supplier / Vendor</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('employee')}
                className={`flex-1 py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  role === 'employee'
                    ? 'bg-white shadow-sm text-[#181c23] font-bold'
                    : 'text-[#5a5f68] hover:text-[#181c23] font-medium'
                } text-[13px]`}
              >
                <span className="w-2 h-2 rounded-full bg-[#195b9e]" />
                <span>ABB Employee</span>
              </button>
            </div>
          </div>

          {/* Credential Inputs Form */}
          <form onSubmit={handleAuth} className="flex flex-col gap-3.5">
            {/* Work / Business Email */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-semibold text-[#181c23]">
                  Business Email
                </label>
                {role === 'supplier' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5a5f68] bg-[#ebeef7] px-1.5 py-0.5 rounded font-mono">
                    <span className="material-symbols-outlined text-[12px] text-[#5a5f68]">
                      factory
                    </span>
                    Plant #402 - Vadodara
                  </span>
                )}
              </div>
              <div className="flex items-center w-full bg-[#f1f3fd] rounded-lg px-3 py-2.5 border border-[#dde1e6] focus-within:border-[#e60000] focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[#5a5f68] mr-2 text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-[14px] text-[#181c23] placeholder:text-[#5a5f68] font-medium p-0"
                  placeholder="name@company.com"
                  required
                />
                <span
                  className="material-symbols-outlined text-[#16a34a] text-[18px] ml-1.5 shrink-0"
                  title="Verified Account"
                >
                  verified
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#181c23]">
                Password
              </label>
              <div className="flex items-center w-full bg-[#f1f3fd] rounded-lg px-3 py-2.5 border border-[#dde1e6] focus-within:border-[#e60000] focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[#5a5f68] mr-2 text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-[14px] text-[#181c23] placeholder:text-[#5a5f68] font-medium p-0 tracking-wider"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 rounded text-[#5a5f68] hover:text-[#181c23] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#E60000] focus:ring-[#E60000] accent-[#E60000] cursor-pointer"
                />
                <span className="text-[12px] text-[#181c23] font-medium">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset instructions dispatched to your verified email.')}
                className="text-[12px] text-[#195b9e] hover:underline font-semibold cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className={`w-full mt-1 min-h-[46px] rounded-lg text-white text-[14px] font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer ${
                authSuccess
                  ? 'bg-[#16a34a]'
                  : 'bg-[#E60000] hover:bg-[#cc0000] active:bg-[#b30000]'
              }`}
            >
              {isAuthenticating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  <span>Verifying Credentials...</span>
                </>
              ) : authSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    check_circle
                  </span>
                  <span>Access Granted</span>
                </>
              ) : (
                <>
                  <span>Sign In to KYC Portal</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* SSO Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#dde1e6]" />
            <span className="relative bg-white px-2.5 text-[11px] font-bold text-[#5a5f68] uppercase tracking-wider whitespace-nowrap">
              Or sign in with Single Sign-On
            </span>
          </div>

          {/* Microsoft Azure AD SSO Button */}
          <button
            type="button"
            onClick={handleSSO}
            className="w-full min-h-[44px] rounded-lg bg-[#f1f3fd] hover:bg-[#e5e8f2] border border-[#dde1e6] text-[#181c23] text-[13px] flex items-center justify-center gap-2.5 transition-colors font-semibold cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
              <rect fill="#F25022" height="10" width="10" />
              <rect fill="#7FBA00" height="10" width="10" x="11" />
              <rect fill="#00A4EF" height="10" width="10" y="11" />
              <rect fill="#FFB900" height="10" width="10" x="11" y="11" />
            </svg>
            <span>Sign in with ABB Azure AD</span>
          </button>
        </div>

        {/* Support & Compliance Footer */}
        <div className="flex flex-col items-center text-center px-2 gap-1.5 mt-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-[#5a5f68]">Need help?</span>
            <button
              onClick={() => alert('ABB Supplier Desk: +91 (0265) 264-1000 or supplier.support@abb.com')}
              className="text-[12px] text-[#195b9e] font-semibold hover:underline cursor-pointer"
            >
              Contact ABB Support
            </button>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-[#5a5f68] text-[11px]">
            <a href="#privacy" className="hover:underline hover:text-[#181c23]">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:underline hover:text-[#181c23]">
              Terms of Use
            </a>
            <span>•</span>
            <span className="font-semibold">ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
