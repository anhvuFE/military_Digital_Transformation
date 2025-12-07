export interface Commendation {
  id: string;
  title: string;
  description?: string;
  type: "MEDAL" | "CERTIFICATE" | "ACHIEVEMENT";
  level: "INDIVIDUAL" | "UNIT";
  date: string;
  recipientName?: string;
  unit?: string;
  criteria?: string;
  approvedBy?: string;
  status?: "PENDING" | "APPROVED" | "AWARDED";
}