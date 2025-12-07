export interface ReportEntity {
  id: string;
  title: string;
  description?: string;
  type: "TRAINING" | "PERFORMANCE" | "ATTENDANCE" | "EQUIPMENT";
  period: {
    from: string;
    to: string;
  };
  unitId?: string;
  unitName?: string;
  createdBy: string;
  createdAt: string;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED";
  data?: {
    totalSessions?: number;
    completionRate?: number;
    pendingSoldiers?: number;
    excellentCount?: number;
    passCount?: number;
    failCount?: number;
  };
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
}