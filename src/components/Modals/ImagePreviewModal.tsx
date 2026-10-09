import React from 'react';
import { EvidenceFile } from '../../types';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: EvidenceFile | null;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  file,
}) => {
  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#20242b] text-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3.5 border-b border-gray-700/80 flex items-center justify-between bg-[#181c23]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[20px] text-[#ffb4a8]">
              {file.type === 'pdf' ? 'picture_as_pdf' : 'image'}
            </span>
            <div className="min-w-0">
              <h3 className="text-xs font-bold truncate leading-tight">{file.name}</h3>
              <p className="text-[11px] text-gray-400 font-mono">
                {file.size} • {file.uploadedAt} • Ref: {file.poNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-auto flex flex-col items-center justify-center bg-[#13161c]">
          {file.type === 'image' && file.previewUrl ? (
            <div className="relative rounded-lg overflow-hidden border border-gray-700 max-h-[60vh]">
              <img
                src={file.previewUrl}
                alt={file.name}
                className="w-full h-auto object-contain max-h-[55vh]"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs px-2.5 py-1.5 rounded text-[11px] font-mono flex items-center justify-between text-gray-200">
                <span className="flex items-center gap-1 text-[#107c41]">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  CMM Coordinate Verified ±0.05mm
                </span>
                <span>2400 × 1600 px</span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#93000a]/30 text-[#ffb4a8] flex items-center justify-center mx-auto border border-[#93000a]">
                <span className="material-symbols-outlined text-[36px]">picture_as_pdf</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{file.name}</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Mill Test Certificate (MTC) with 99.9% Electrolytic Copper Purity & Chemical Spectrometry assay.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Digitally Signed by Metallurgical Laboratory
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700/80 bg-[#181c23] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-800">
              {file.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Exporting ${file.name} for ABB QA inspection audit pack.`);
              }}
              className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download File</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-[#b70100] hover:bg-[#e60000] text-xs font-bold text-white cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
