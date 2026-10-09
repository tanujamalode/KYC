import React, { useState } from 'react';
import { Order, EvidenceFile } from '../types';
import { ASSET_URLS } from '../data/mockData';

interface OrderDetailScreenProps {
  order: Order;
  onBack: () => void;
  onOpenUploadEvidence: () => void;
  onOpenReportDelay: () => void;
  onPreviewFile: (file: EvidenceFile) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({
  order,
  onBack,
  onOpenUploadEvidence,
  onOpenReportDelay,
  onPreviewFile,
  onShowToast,
}) => {
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isStage4SignedOff, setIsStage4SignedOff] = useState(false);

  const handleMarkStepComplete = () => {
    setIsMarkingComplete(true);
    setTimeout(() => {
      setIsMarkingComplete(false);
      setIsStage4SignedOff(true);
      onShowToast('Stage 4: ABB Quality Verification & Inspection Complete. SAP Synced.');
    }, 1100);
  };

  const progressPercent = isStage4SignedOff ? 100 : order.progressPercent;
  const progressText = isStage4SignedOff ? '100% (5/5 Milestones)' : '80% (4/5 Milestones)';

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 pt-2">
      {/* Breadcrumb Navigation & PO Reference */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-[#20242b] hover:text-[#e60000] transition-colors py-2 text-[13px] font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to My Orders</span>
        </button>
        <span className="font-mono text-[12px] text-[#20242b] bg-[#ebeef7] border border-[#dde1e6] px-2.5 py-1 rounded font-bold tracking-wide">
          {order.poNumber}
        </span>
      </div>

      {/* 1. Top Order Summary Card with Industrial Product Image */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#dde1e6] space-y-3.5">
        <div className="flex gap-3 items-start">
          {/* Crisp industrial product thumbnail */}
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 border border-[#dde1e6] shrink-0">
            <img
              alt={order.title}
              className="w-full h-full object-cover"
              src={ASSET_URLS.copperBusbarDetail}
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs py-0.5 text-center">
              <span className="text-[9px] font-mono text-white font-semibold">
                {order.specBadge || '1250A CU'}
              </span>
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#5a5f68] uppercase font-bold tracking-wider">
                PO #{order.poNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#fef2f2] text-[#e60000] border border-[#fee2e2] text-[11px] px-2.5 py-0.5 rounded-full shrink-0 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#e60000] animate-pulse" />
                {isStage4SignedOff ? 'QA Approved' : 'In Production'}
              </span>
            </div>
            <h2 className="text-[16px] leading-[21px] text-[#20242b] font-bold pt-1">
              {order.title}
            </h2>
            <span className="text-[11px] text-[#5a5f68] pt-0.5 font-medium">
              {isStage4SignedOff ? 'Stage 5 of 5 (Ready for Dispatch)' : 'Stage 4 of 5 (80% Complete)'}
            </span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-[#20242b]">Overall Milestone Progress</span>
            <span className="font-mono text-[#e60000] font-bold">{progressText}</span>
          </div>
          <div className="w-full bg-[#ebeef7] h-2.5 rounded-full overflow-hidden flex">
            <div
              className="bg-[#107c41] h-full transition-all duration-700"
              style={{ width: isStage4SignedOff ? '100%' : '60%' }}
            />
            {!isStage4SignedOff && (
              <>
                <div className="bg-[#e60000] h-full w-[20%] animate-pulse" />
                <div className="bg-[#ebeef7] h-full w-[20%]" />
              </>
            )}
          </div>
        </div>

        {/* 2x2 Specs Grid */}
        <div className="bg-[#f7f8fa] border border-[#dde1e6] rounded-lg p-3 grid grid-cols-2 gap-3 text-[#20242b]">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#5a5f68] font-semibold">Quantity</span>
            <span className="text-[13px] truncate font-bold text-[#20242b]">
              {order.quantity}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#5a5f68] font-semibold">Delivery Due</span>
            <span className="text-[13px] truncate font-bold text-[#e60000]">
              {order.deliveryDue}{' '}
              <span className="text-[11px] font-normal text-[#5a5f68]">
                {order.deliveryDueSubtitle}
              </span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#5a5f68] font-semibold">Supplier</span>
            <span className="text-[13px] truncate font-bold text-[#20242b]">
              {order.supplier}{' '}
              <span className="text-xs text-[#5a5f68] font-normal">{order.supplierCode}</span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#5a5f68] font-semibold">Destination</span>
            <span
              className="text-[13px] truncate font-bold text-[#20242b]"
              title={`${order.destination} (${order.destinationSub})`}
            >
              {order.destination}
            </span>
            <span className="text-[11px] text-[#5a5f68] truncate">{order.destinationSub}</span>
          </div>
        </div>
      </div>

      {/* 2. Prominent Next Primary Action Banner (for factory floor vendor) */}
      <div className="bg-[#fff7f5] border-2 border-[#e60000]/30 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e60000] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">engineering</span>
            </div>
            <div>
              <span className="text-[11px] text-[#e60000] uppercase font-bold tracking-wider">
                {isStage4SignedOff ? 'Quality Signoff Granted' : 'Required Floor Action'}
              </span>
              <h3 className="text-[16px] leading-[20px] text-[#20242b] font-bold">
                {isStage4SignedOff
                  ? 'Stage 5: Final Packaging & Barcoding Unlocked'
                  : 'Stage 4: ABB Quality Verification & Inspection'}
              </h3>
            </div>
          </div>
          <span
            className={`text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
              isStage4SignedOff ? 'bg-[#107c41]' : 'bg-[#e60000]'
            }`}
          >
            {isStage4SignedOff ? 'Approved' : 'Active'}
          </span>
        </div>

        <p className="text-[12px] text-[#5a5f68] leading-relaxed">
          {isStage4SignedOff
            ? 'Electrochemical conductivity (101% IACS) and CMM dimensional tolerances conforming. SAP gate pass barcode generation ready.'
            : 'Batch sample ready for electrical conductivity & dimensional tolerance signoff. Complete this stage to unblock dispatch barcoding.'}
        </p>

        {/* Action Buttons with 48px+ accessible touch targets */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            disabled={isMarkingComplete || isStage4SignedOff}
            onClick={handleMarkStepComplete}
            className={`w-full min-h-[48px] h-12 text-white text-[13px] font-bold rounded-lg flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
              isStage4SignedOff
                ? 'bg-[#107c41] cursor-default'
                : 'bg-[#e60000] hover:bg-[#b70100] active:scale-[0.99]'
            }`}
          >
            {isMarkingComplete ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
                <span>Submitting QA Verification...</span>
              </>
            ) : isStage4SignedOff ? (
              <>
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Stage 4 Signed Off by QA</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Mark Step Complete</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenUploadEvidence}
              className="min-h-[48px] h-12 bg-white hover:bg-[#f7f8fa] active:scale-[0.99] text-[#20242b] text-[13px] font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-[#dde1e6] shadow-xs transition-colors px-2 text-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#195b9e]">
                upload_file
              </span>
              <span className="truncate">Upload Evidence</span>
            </button>

            <button
              onClick={onOpenReportDelay}
              className="min-h-[48px] h-12 bg-white hover:bg-[#f7f8fa] active:scale-[0.99] text-[#5a5f68] hover:text-[#e60000] text-[13px] font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-[#dde1e6] shadow-xs transition-colors px-2 text-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#e60000]">
                warning
              </span>
              <span className="truncate">Report Delay</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Complete Vertical Milestone Timeline */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#dde1e6] space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-[#dde1e6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#e60000]">
              alt_route
            </span>
            <h3 className="text-[17px] text-[#20242b] font-bold">Lifecycle Milestones</h3>
          </div>
          <span className="font-mono text-[12px] text-[#5a5f68] bg-[#ebeef7] px-2 py-0.5 rounded font-semibold">
            ISO 9001:2015
          </span>
        </div>

        <div className="relative flex flex-col space-y-0">
          {/* Vertical guide line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#dde1e6] -translate-x-1/2 z-0" />

          {/* Milestone 1 (Completed) */}
          <div className="relative flex items-start gap-3 pb-6 group">
            <div className="z-10 w-8 h-8 rounded-full bg-[#107c41] text-white flex items-center justify-center shrink-0 shadow-xs ring-4 ring-white">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col min-w-0 pt-0.5 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] text-[#20242b] font-bold">
                  1. Raw Material Verification & MTC Signoff
                </span>
                <span className="font-mono text-[12px] text-[#107c41] font-semibold shrink-0">
                  02 Oct 2026
                </span>
              </div>
              <p className="text-[12px] text-[#5a5f68] pt-0.5">
                Verified MTC #MTC-8891 attached. Electrolytic copper purity 99.9% matched.
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#107c41] font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Completed & Signed Off
              </div>
            </div>
          </div>

          {/* Milestone 2 (Completed) */}
          <div className="relative flex items-start gap-3 pb-6 group">
            <div className="z-10 w-8 h-8 rounded-full bg-[#107c41] text-white flex items-center justify-center shrink-0 shadow-xs ring-4 ring-white">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col min-w-0 pt-0.5 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] text-[#20242b] font-bold">
                  2. CNC Precision Milling & Boring
                </span>
                <span className="font-mono text-[12px] text-[#107c41] font-semibold shrink-0">
                  10 Oct 2026
                </span>
              </div>
              <p className="text-[12px] text-[#5a5f68] pt-0.5">
                Tolerance ±0.05mm inspected on CMM. Signoff by Rajesh S. (Lead Machinist).
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#107c41] font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Completed & Signed Off
              </div>
            </div>
          </div>

          {/* Milestone 3 (Completed) */}
          <div className="relative flex items-start gap-3 pb-6 group">
            <div className="z-10 w-8 h-8 rounded-full bg-[#107c41] text-white flex items-center justify-center shrink-0 shadow-xs ring-4 ring-white">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col min-w-0 pt-0.5 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] text-[#20242b] font-bold">
                  3. Anti-Corrosion Electroplating & Surface Coating
                </span>
                <span className="font-mono text-[12px] text-[#107c41] font-semibold shrink-0">
                  16 Oct 2026
                </span>
              </div>
              <p className="text-[12px] text-[#5a5f68] pt-0.5">
                Tin plating thickness 12 microns certified with salt spray report. Lab pass.
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#107c41] font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Completed & Signed Off
              </div>
            </div>
          </div>

          {/* Milestone 4 (ACTIVE or SIGNED OFF) */}
          <div className="relative flex items-start gap-3 pb-6">
            <div
              className={`z-10 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold font-mono text-sm shrink-0 shadow-md ${
                isStage4SignedOff
                  ? 'bg-[#107c41] ring-4 ring-white'
                  : 'bg-[#e60000] ring-4 ring-[#ffdad4] animate-pulse'
              }`}
            >
              {isStage4SignedOff ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                '4'
              )}
            </div>
            <div
              className={`flex flex-col min-w-0 pt-0.5 flex-1 p-3.5 rounded-xl space-y-2 border ${
                isStage4SignedOff
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-[#fff7f5] border-[#e60000]/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[13px] font-bold ${
                    isStage4SignedOff ? 'text-[#107c41]' : 'text-[#e60000]'
                  }`}
                >
                  4. ABB Quality Verification & Inspection
                </span>
                <span
                  className={`text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    isStage4SignedOff ? 'bg-[#107c41]' : 'bg-[#e60000]'
                  }`}
                >
                  {isStage4SignedOff ? 'Verified' : 'Active'}
                </span>
              </div>
              <p className="text-[12px] text-[#20242b]">
                {isStage4SignedOff
                  ? 'Batch sample physical inspection conforming. Test report attached. QA certified.'
                  : 'Batch physical inspection scheduled on-site. Requires test report and tolerance scan upload for final signoff.'}
              </p>
              <div
                className={`flex items-center justify-between text-xs pt-1 border-t ${
                  isStage4SignedOff
                    ? 'border-emerald-200 text-emerald-800'
                    : 'border-[#fecaca] text-[#5a5f68]'
                }`}
              >
                <span
                  className={`font-semibold ${
                    isStage4SignedOff ? 'text-[#107c41]' : 'text-[#e60000]'
                  }`}
                >
                  {isStage4SignedOff ? 'Completed (100% Signoff)' : 'In Progress (80% Complete)'}
                </span>
                <span className="font-mono text-[#5a5f68]">
                  {isStage4SignedOff ? 'Signed by Alok V.' : 'Pending Report'}
                </span>
              </div>
            </div>
          </div>

          {/* Milestone 5 (Upcoming or Unlocked) */}
          <div className="relative flex items-start gap-3">
            <div
              className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs shrink-0 ring-4 ring-white border ${
                isStage4SignedOff
                  ? 'bg-[#195b9e] text-white border-transparent'
                  : 'bg-[#ebeef7] text-[#5a5f68] border-[#dde1e6]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isStage4SignedOff ? 'inventory_2' : 'lock'}
              </span>
            </div>
            <div className={`flex flex-col min-w-0 pt-0.5 flex-1 ${isStage4SignedOff ? '' : 'opacity-75'}`}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] text-[#20242b] font-semibold">
                  5. Final Packaging, Barcoding & Dispatch
                </span>
                <span className="font-mono text-[12px] text-[#5a5f68] shrink-0 font-medium">
                  Due 22 Oct 2026
                </span>
              </div>
              <p className="text-[12px] text-[#5a5f68] pt-0.5">
                Palletized crating with QR serial badges and automatic SAP gate pass generation.
              </p>
              <div className="mt-1.5">
                {isStage4SignedOff ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#195b9e] bg-[#d4e3ff] px-2 py-0.5 rounded font-bold">
                    <span className="material-symbols-outlined text-[13px]">lock_open</span>
                    Ready for barcode scanning & crating
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#5a5f68] bg-[#ebeef7] px-2 py-0.5 rounded font-medium">
                    <span className="material-symbols-outlined text-[13px]">lock_clock</span>
                    Locked until Stage 4 quality signoff
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Uploaded Evidence & Product Quality Photos Section */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#dde1e6] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#e60000]">
              photo_library
            </span>
            <h3 className="text-[17px] text-[#20242b] font-bold">
              Uploaded Evidence & Quality Photos
            </h3>
          </div>
          <span className="text-[13px] text-[#5a5f68] font-bold font-mono">
            {order.evidenceFiles.length} Files
          </span>
        </div>

        <div className="space-y-2.5">
          {order.evidenceFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#f7f8fa] hover:bg-[#ebeef7] border border-[#dde1e6] transition-colors min-h-[56px]"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {file.type === 'image' ? (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-[#dde1e6]">
                    <img
                      alt={file.name}
                      src={file.previewUrl || ASSET_URLS.dimensionalScan}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] text-white px-1 font-mono">
                      JPG
                    </span>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-[#fee2e2] text-[#93000a] flex items-center justify-center shrink-0 border border-[#fca5a5]">
                    <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                  </div>
                )}

                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] text-[#20242b] truncate font-semibold">
                    {file.name}
                  </span>
                  <div className="flex items-center gap-2 text-[#5a5f68] font-mono text-[11px]">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span
                      className={`flex items-center gap-0.5 font-bold ${
                        file.statusType === 'success'
                          ? 'text-[#107c41]'
                          : file.statusType === 'warning'
                          ? 'text-[#ba1a1a]'
                          : 'text-[#195b9e]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {file.statusType === 'success' ? 'check_circle' : 'verified'}
                      </span>
                      {file.status}
                    </span>
                  </div>
                </div>
              </div>

              {file.type === 'image' ? (
                <button
                  aria-label="View photo"
                  onClick={() => onPreviewFile(file)}
                  className="min-w-[48px] min-h-[48px] w-12 h-12 flex items-center justify-center text-[#5a5f68] hover:text-[#e60000] active:scale-95 transition-colors shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">visibility</span>
                </button>
              ) : (
                <button
                  aria-label="Download document"
                  onClick={() => onPreviewFile(file)}
                  className="min-w-[48px] min-h-[48px] w-12 h-12 flex items-center justify-center text-[#5a5f68] hover:text-[#e60000] active:scale-95 transition-colors shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">download</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Quick Action for Vendor: Take Photo or Add Evidence (48px height) */}
        <button
          onClick={onOpenUploadEvidence}
          className="w-full min-h-[48px] h-12 bg-white hover:bg-[#f7f8fa] active:scale-[0.99] text-[#20242b] border-2 border-dashed border-[#dde1e6] hover:border-[#e60000] rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all pt-1 pb-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-[#e60000]">
            add_a_photo
          </span>
          <span>Take Photo or Add Evidence</span>
        </button>
      </div>
    </div>
  );
};
