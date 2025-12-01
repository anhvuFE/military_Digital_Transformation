export type Role = "SOLDIER" | "ADMIN";

export interface User {
  id: string;
  fullName: string;
  rank: string;
  serviceNumber: string;
  role: Role;
  unitId: string;
}
