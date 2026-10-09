export type ScreenType = 
  | 'login' 
  | 'home' 
  | 'orders' 
  | 'order-detail' 
  | 'proof-and-docs' 
  | 'exceptions';

export type UserRole = 'supplier' | 'employee';

export interface Milestone {
  id: number;
  stageNumber: number;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'active' | 'locked';
  signoffNote?: string;
  signedBy?: string;
}

export interface EvidenceFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf' | 'doc';
  status: string;
  statusType: 'success' | 'info' | 'warning';
  previewUrl?: string;
  uploadedAt: string;
  poNumber: string;
}

export interface Order {
  id: string;
  poNumber: string;
  title: string;
  stageDescription: string;
  currentStage: number;
  totalStages: number;
  progressPercent: number;
  status: 'active' | 'overdue' | 'completed';
  statusLabel: string;
  quantity: string;
  deliveryDue: string;
  deliveryDueSubtitle: string;
  supplier: string;
  supplierCode: string;
  destination: string;
  destinationSub: string;
  imageUrl: string;
  specBadge: string;
  hasException?: boolean;
  exceptionRef?: string;
  exceptionDescription?: string;
  milestones: Milestone[];
  evidenceFiles: EvidenceFile[];
}

export interface ExceptionItem {
  id: string;
  poNumber: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  status: 'open' | 'in-review' | 'resolved';
  reportedDate: string;
  reportedBy: string;
  impact: string;
  rootCause: string;
  mitigationPlan: string;
  actionRequired: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'critical' | 'alert' | 'success';
  unread: boolean;
  poRef?: string;
}
