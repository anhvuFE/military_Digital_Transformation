export interface UserManagement {
  id: string;
  fullName: string;
  rank: string;
  serviceNumber: string;
  role: "SOLDIER" | "OFFICER" | "ADMIN" | "INSTRUCTOR";
  unitId: string;
  unitName?: string;
  email?: string;
  phone?: string;
  joinDate: string;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TRANSFERRED";
  position?: string;
  specialization?: string;
  trainingRecords?: {
    completedCourses: number;
    excellentCount: number;
    averageScore: number;
  };
  lastActive?: string;
  notes?: string;
}