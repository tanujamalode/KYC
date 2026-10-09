import React, { useState } from 'react';

interface ReportDelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPo?: string;
  onSubmitDelay: (delayData: {
    poNumber: string;
    category: string;
    duration: string;
    notes: string;
  }) => void;
}

export const ReportDelayModal: React.FC<ReportDelayModalProps> = ({
  isOpen,
  onClose,
  defaultPo = 'PO-9115',
  onSubmitDelay,
}) => {
  const [selectedPo, setSelectedPo] = useState(defaultPo);
  const [category, setCategory] = useState('Raw Material Shortage');
  const [duration, setDuration] = useState('3-5 business days');
  const [notes, setNotes] = useState('Delay in incoming raw copper supply from certified foundry. Production line rescheduled.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitDelay({
        poNumber: selectedPo,
        category,
        duration,
        notes,
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#dde1e6] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#dde1e6] flex items-center justify-between bg-[#fff7f5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#fee2e2] text-[#93000a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">report_problem</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#20242b]">Report Floor Delay Incident</h3>
              <p className="text-[11px] text-[#5a5f68]">Direct sync to ABB Vadodara Plant 04 Dispatch Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          {/* PO Selector */}
          <div>
            <label className="block text-xs font-bold text-[#5a5f68] uppercase tracking-wider mb-1">
              Purchase Order Reference
            </label>
            <select
              value={selectedPo}
              onChange={(e) => setSelectedPo(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#dde1e6] text-xs font-semibold text-[#20242b] bg-white focus:outline-none focus:border-[#e60000]"
            >
              <option value="PO-9115">PO-9115: Copper Busbar Power Distributor 1250A</option>
              <option value="PO-5290">PO-5290: M12 High Voltage Epoxy Bushing Insulator</option>
              <option value="PO-8831">PO-8831: 36kV Front Cover Enclosure</option>
            </select>
          </div>

          {/* Root Cause Category */}
          <div>
            <label className="block text-xs font-bold text-[#5a5f68] uppercase tracking-wider mb-1">
              Delay Root Cause
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#dde1e6] text-xs font-semibold text-[#20242b] bg-white focus:outline-none focus:border-[#e60000]"
            >
              <option value="Raw Material Shortage">Raw Material / Ceramic / Metal Shortage</option>
              <option value="CNC Tooling Calibration Hold">CNC Milling / Tooling Calibration Hold</option>
              <option value="Surface Treatment / Plating Bottleneck">Surface Treatment / Plating Bottleneck</option>
              <option value="ABB On-Site Inspector Awaiting">ABB On-Site Inspector Awaiting Verification</option>
              <option value="Logistics / SAP Gate Pass Delay">Logistics / SAP Gate Pass Congestion</option>
            </select>
          </div>

          {/* Estimated Impact */}
          <div>
            <label className="block text-xs font-bold text-[#5a5f68] uppercase tracking-wider mb-1">
              Estimated Schedule Shift
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['1-2 Days', '3-5 Days', '1-2 Weeks'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setDuration(opt)}
                  className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all cursor-pointer text-center ${
                    duration === opt
                      ? 'border-[#e60000] bg-[#fff7f5] text-[#e60000]'
                      : 'border-[#dde1e6] bg-white text-[#5a5f68] hover:border-gray-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#5a5f68] uppercase tracking-wider mb-1">
              Floor Notes & Remediation Action
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#dde1e6] text-xs text-[#20242b] font-medium focus:outline-none focus:border-[#e60000]"
              placeholder="Detail the floor observation, current hold status, and corrective measures..."
            />
          </div>

          {/* Alert Callout */}
          <div className="p-2.5 rounded-lg bg-[#fff7f5] border border-[#fee2e2] text-[11px] text-[#93000a] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] shrink-0">info</span>
            <span>Submitting will log an exception ticket and notify the ABB Plant 04 Planning Officer.</span>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[44px] rounded-lg border border-[#dde1e6] text-xs font-semibold text-[#5a5f68] hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 min-h-[44px] rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span>Transmit Delay Incident</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
