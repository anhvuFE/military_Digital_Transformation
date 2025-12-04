export interface ReportRow {
  unitId: string;
  unitName: string;
  totalSessions: number;
  completionRate: number;
  pendingSoldiers: number;
}

export interface ReportFilter {
  unitId?: string;
  from: string;
  to: string;
}
