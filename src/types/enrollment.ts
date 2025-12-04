export interface Enrollment {
  id: string;
  sessionId: string;
  userId: string;
  status: "SCHEDULED" | "COMPLETED" | "ABSENT";
  score?: number;
  passed?: boolean;
  remark?: string;
}
