import React, { useState } from 'react';
import { Order, EvidenceFile } from '../types';

interface ProofAndDocsScreenProps {
  orders: Order[];
  onOpenUploadModal: () => void;
  onPreviewFile: (file: EvidenceFile) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const ProofAndDocsScreen: React.FC<ProofAndDocsScreenProps> = ({
  orders,
  onOpenUploadModal,
  onPreviewFile,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mtc' | 'scans' | 'gate-pass'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all files from all orders
  const allFiles: EvidenceFile[] = orders.flatMap((o) => o.evidenceFiles);

  const filteredFiles = allFiles.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.poNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'mtc') return f.name.includes('MTC') || f.status.includes('MTC');
    if (selectedCategory === 'scans') return f.type === 'image' || f.name.includes('Scan');
    if (selectedCategory === 'gate-pass') return f.name.includes('Gate_Pass') || f.name.includes('SAP');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24 space-y-4 pt-1">
      {/* Top Header info */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a5f68]">
            Compliance Archive
          </span>
          <span className="font-mono text-[11px] text-[#107c41] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
            ISO 9001:2015 Verified
          </span>
        </div>
        <h1 className="text-[24px] font-bold text-[#181c23] tracking-tight">
          Proof & Quality Docs
        </h1>
        <p className="text-[14px] text-[#5a5f68]">
          Cryptographically audited Mill Test Certificates, CMM coordinate logs & gate passes.
        </p>
      </div>

      {/* Upload Banner */}
      <div className="bg-gradient-to-r from-[#20242b] to-[#2d3138] rounded-xl p-4 text-white shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm">Need to attach floor certification?</h3>
          <p className="text-xs text-gray-300 mt-0.5">Upload verified MTC or CMM dimension tolerance scan.</p>
        </div>
        <button
          onClick={onOpenUploadModal}
          className="px-3.5 py-2 rounded-lg bg-[#e60000] hover:bg-[#b70100] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">upload_file</span>
          <span>Upload</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a5f68] text-[20px] pointer-events-none">
          search
        </span>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter documents by file name or PO number..."
          className="w-full pl-10 pr-4 py-3 bg-white text-[#181c23] text-[14px] rounded-xl shadow-xs border border-[#dde1e6] placeholder:text-[#5a5f68] focus:outline-none focus:border-[#b70100]"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Files', count: allFiles.length },
          { id: 'mtc', label: 'Mill Test Certs (MTC)', count: 2 },
          { id: 'scans', label: 'CMM Dimensional Scans', count: 2 },
          { id: 'gate-pass', label: 'SAP Gate Passes', count: 1 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-[#181c23] text-white'
                : 'bg-white text-[#5a5f68] border border-[#dde1e6] hover:text-[#181c23]'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-2.5">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-xl p-3.5 shadow-xs border border-[#dde1e6] flex items-center justify-between hover:border-gray-400 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {file.type === 'image' ? (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-[#dde1e6]">
                  <img
                    alt={file.name}
                    src={file.previewUrl}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-black/75 text-[9px] text-white px-1 font-mono">
                    IMG
                  </span>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-[#fee2e2] text-[#93000a] flex items-center justify-center shrink-0 border border-[#fca5a5]">
                  <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#195b9e] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                    {file.poNumber}
                  </span>
                  <span className="text-[10px] text-[#5a5f68] font-mono">{file.uploadedAt}</span>
                </div>
                <h4 className="text-[13px] font-bold text-[#181c23] truncate mt-0.5">
                  {file.name}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-[#5a5f68] font-mono mt-0.5">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span
                    className={`font-semibold flex items-center gap-0.5 ${
                      file.statusType === 'success'
                        ? 'text-[#107c41]'
                        : file.statusType === 'warning'
                        ? 'text-[#ba1a1a]'
                        : 'text-[#195b9e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {file.statusType === 'success' ? 'check_circle' : 'verified'}
                    </span>
                    {file.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                onClick={() => onPreviewFile(file)}
                aria-label="View or Preview"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#ebeef7] text-[#5a5f68] hover:text-[#b70100] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {file.type === 'image' ? 'visibility' : 'download'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
