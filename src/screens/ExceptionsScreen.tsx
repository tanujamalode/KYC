import React, { useState } from 'react';
import { ExceptionItem, ScreenType } from '../types';
import { MOCK_EXCEPTIONS } from '../data/mockData';

interface ExceptionsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenReportDelay: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const ExceptionsScreen: React.FC<ExceptionsScreenProps> = ({
  onNavigate,
  onOpenReportDelay,
  onShowToast,
}) => {
  const [exceptions, setExceptions] = useState<ExceptionItem[]>(MOCK_EXCEPTIONS);
  const [activeTab, setActiveTab] = useState<'open' | 'resolved'>('open');
  const [isResolving, setIsResolving] = useState(false);

  const activeException = exceptions.find((e) => e.id === 'EX-104');

  const handleResolveException = (id: string) => {
    setIsResolving(true);
    setTimeout(() => {
      setExceptions((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: 'resolved' } : e))
      );
      setIsResolving(false);
      onShowToast('Exception #EX-104 marked resolved. Replacement ceramic MTC submitted.');
    }, 900);
  };

  const openExceptions = exceptions.filter((e) => e.status !== 'resolved');
  const resolvedExceptions = exceptions.filter((e) => e.status === 'resolved');

  return (
    <div className="flex flex-col w-full pb-24 space-y-4 pt-1">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a]">
            Incident Management
          </span>
          <span className="font-mono text-[11px] text-[#ba1a1a] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-bold">
            {openExceptions.length} Open Floor Exception
          </span>
        </div>
        <h1 className="text-[24px] font-bold text-[#181c23] tracking-tight">
          Floor Exceptions
        </h1>
        <p className="text-[14px] text-[#5a5f68]">
          Review component shortages, line holds, and submit corrective action reports for ABB Plant 04.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#dde1e6] pb-1">
        <button
          onClick={() => setActiveTab('open')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'open'
              ? 'border-[#b70100] text-[#b70100]'
              : 'border-transparent text-[#5a5f68] hover:text-[#181c23]'
          }`}
        >
          Open Exceptions ({openExceptions.length})
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'resolved'
              ? 'border-[#b70100] text-[#b70100]'
              : 'border-transparent text-[#5a5f68] hover:text-[#181c23]'
          }`}
        >
          Resolved Archive ({resolvedExceptions.length})
        </button>
      </div>

      {activeTab === 'open' ? (
        activeException && activeException.status !== 'resolved' ? (
          <div className="space-y-4">
            {/* Primary Open Exception Box */}
            <div className="bg-[#fff7f5] rounded-xl p-4 border-2 border-[#ba1a1a]/40 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#ba1a1a] uppercase tracking-wider">
                      Exception #{activeException.id} • {activeException.poNumber}
                    </span>
                    <h3 className="text-[15px] font-bold text-[#181c23] leading-snug">
                      {activeException.title}
                    </h3>
                  </div>
                </div>
                <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                  Critical
                </span>
              </div>

              {/* Detail fields */}
              <div className="p-3 bg-white rounded-lg border border-[#fecaca] space-y-2 text-xs">
                <div>
                  <span className="font-bold text-[#5a5f68] block">Affected Line:</span>
                  <span className="text-[#181c23] font-medium">CNC Precision Milling Line B-2 (Rajesh S. Supervisor)</span>
                </div>
                <div>
                  <span className="font-bold text-[#5a5f68] block">Root Cause Analysis:</span>
                  <p className="text-[#181c23] font-medium mt-0.5">{activeException.rootCause}</p>
                </div>
                <div>
                  <span className="font-bold text-[#5a5f68] block">Mitigation & Countermeasure:</span>
                  <p className="text-[#181c23] font-medium mt-0.5">{activeException.mitigationPlan}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  disabled={isResolving}
                  onClick={() => handleResolveException(activeException.id)}
                  className="w-full h-11 rounded-lg bg-[#b70100] hover:bg-[#930100] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  {isResolving ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[16px]">
                        progress_activity
                      </span>
                      <span>Submitting Resolution to SAP...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Sign Off Mitigation & Close Exception</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onShowToast('Connecting to ABB Plant 04 Dispatch desk (Phone: +91 265 264 1000)...', 'call');
                    }}
                    className="h-10 rounded-lg bg-white border border-[#dde1e6] hover:bg-gray-50 text-[#181c23] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#195b9e]">call</span>
                    <span>Contact Dispatch</span>
                  </button>

                  <button
                    onClick={onOpenReportDelay}
                    className="h-10 rounded-lg bg-white border border-[#dde1e6] hover:bg-gray-50 text-[#ba1a1a] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">update</span>
                    <span>Adjust Line ETA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-[#dde1e6] space-y-2">
            <span className="material-symbols-outlined text-[32px] text-[#107c41]">
              check_circle
            </span>
            <h4 className="font-bold text-sm text-[#181c23]">All exceptions resolved!</h4>
            <p className="text-xs text-[#5a5f68]">There are currently no active blockers on the factory floor.</p>
          </div>
        )
      ) : (
        /* Resolved List */
        <div className="space-y-3">
          {resolvedExceptions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 border border-[#dde1e6] shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#107c41] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  #{item.id} • {item.poNumber}
                </span>
                <span className="text-[11px] font-bold text-[#107c41] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Resolved
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#181c23]">{item.title}</h4>
              <p className="text-xs text-[#5a5f68] leading-snug">{item.mitigationPlan}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
