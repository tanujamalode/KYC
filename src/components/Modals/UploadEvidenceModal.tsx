import React, { useState } from 'react';
import { EvidenceFile } from '../../types';

interface UploadEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  poNumber: string;
  onFileUpload: (file: EvidenceFile) => void;
}

export const UploadEvidenceModal: React.FC<UploadEvidenceModalProps> = ({
  isOpen,
  onClose,
  poNumber,
  onFileUpload,
}) => {
  const [docType, setDocType] = useState<'Dimensional Scan' | 'Mill Test Certificate' | 'Lab Report' | 'Inspection Photo'>('Dimensional Scan');
  const [fileName, setFileName] = useState('Dimensional_Tolerance_Scan_RunC.jpg');
  const [fileSize, setFileSize] = useState('2.8 MB');
  const [isSimulatingCamera, setIsSimulatingCamera] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const isPdf = fileName.endsWith('.pdf');
      const newFile: EvidenceFile = {
        id: `ev-${Date.now()}`,
        name: fileName || `Inspection_Proof_${Date.now()}.${isPdf ? 'pdf' : 'jpg'}`,
        size: fileSize,
        type: isPdf ? 'pdf' : 'image',
        status: docType === 'Mill Test Certificate' ? 'Verified MTC' : 'Inspected',
        statusType: 'success',
        previewUrl: isPdf ? undefined : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtohNr2PhmDzAG2dEhgzd4UXQWGHtpCmFga1slAgKEa_0v1JLnGN0iARAlFyposNOdQt3iXZf2apdziGYAkQkrnZKH7CZFBb9bGv0qvuvWW5f-ok8EGTBVCZ7F_nFypm8iMd0cpHZ9_QWcHXlUnZ8JTjENhvMME4DayXi0wrthGQuKj2GlpLijKaa2q-Mty7v4hOd5jccjEgYvF9RHFBAsTWSOwYmy8tLbN6ldKe4mNszDI3mgMWw4UQ',
        uploadedAt: 'Just now',
        poNumber: poNumber,
      };

      onFileUpload(newFile);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const setCameraPhoto = () => {
    setIsSimulatingCamera(true);
    setTimeout(() => {
      setDocType('Inspection Photo');
      setFileName(`Factory_Floor_Copper_Inspection_${Math.floor(1000 + Math.random() * 9000)}.jpg`);
      setFileSize('3.4 MB');
      setIsSimulatingCamera(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#dde1e6] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#dde1e6] flex items-center justify-between bg-[#f7f8fa]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#fff7f5] border border-[#e60000]/30 text-[#e60000] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#20242b]">Upload Quality Proof</h3>
              <p className="text-xs text-[#5a5f68]">Attach to PO reference: <strong className="text-[#20242b] font-mono">{poNumber}</strong></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#5a5f68] uppercase tracking-wider mb-1.5">
              Evidence Document Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'Dimensional Scan', icon: 'straighten' },
                { type: 'Mill Test Certificate', icon: 'description' },
                { type: 'Lab Report', icon: 'science' },
                { type: 'Inspection Photo', icon: 'photo_camera' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => {
                    setDocType(item.type as any);
                    if (item.type === 'Mill Test Certificate') {
                      setFileName('MTC_Electrolytic_Purity_Certificate.pdf');
                      setFileSize('1.9 MB');
                    } else if (item.type === 'Lab Report') {
                      setFileName('Conductivity_Salt_Spray_LabReport.pdf');
                      setFileSize('2.1 MB');
                    } else if (item.type === 'Dimensional Scan') {
                      setFileName('Dimensional_Tolerance_Scan_RunC.jpg');
                      setFileSize('2.8 MB');
                    }
                  }}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    docType === item.type
                      ? 'border-[#e60000] bg-[#fff7f5] text-[#e60000] shadow-xs'
                      : 'border-[#dde1e6] bg-white text-[#5a5f68] hover:border-gray-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                  <span className="truncate">{item.type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Capture Button */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={setCameraPhoto}
              className="flex-1 py-2.5 px-3 rounded-lg border border-dashed border-[#e60000] bg-[#fff7f5] hover:bg-[#ffece8] text-[#e60000] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSimulatingCamera ? 'hourglass_top' : 'photo_camera'}
              </span>
              <span>{isSimulatingCamera ? 'Opening Camera...' : 'Capture Floor Photo'}</span>
            </button>
          </div>

          {/* File Selected Card */}
          <div className="p-3 rounded-xl bg-[#f7f8fa] border border-[#dde1e6] flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#dde1e6] flex items-center justify-center text-[#e60000] shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {fileName.endsWith('.pdf') ? 'picture_as_pdf' : 'image'}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#20242b] truncate">{fileName}</div>
                <div className="text-[11px] text-[#5a5f68] flex items-center gap-1.5 font-mono">
                  <span>{fileSize}</span>
                  <span>•</span>
                  <span className="text-[#107c41] font-semibold">Ready for QA Signoff</span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#107c41] text-[20px]">check_circle</span>
          </div>

          {/* Actions */}
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
              className="flex-1 min-h-[44px] rounded-lg bg-[#e60000] hover:bg-[#b70100] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>Attach Evidence</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
