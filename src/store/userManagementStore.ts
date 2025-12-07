import { create } from "zustand";
import type { UserManagement } from "@/types/user-management";

const seedUsers: UserManagement[] = [
  {
    id: "user-1",
    fullName: "Nguyễn Văn An",
    rank: "Thượng úy",
    serviceNumber: "SQ001234",
    role: "OFFICER",
    unitId: "unit-1",
    unitName: "Đại đội 1",
    email: "nguyenvanan@army.vn",
    phone: "0901234567",
    joinDate: "2020-01-15",
    status: "ACTIVE",
    position: "Đại đội trưởng",
    specialization: "Bộ binh",
    trainingRecords: {
      completedCourses: 12,
      excellentCount: 8,
      averageScore: 85
    },
    lastActive: "2024-04-30",
  },
  {
    id: "user-2",
    fullName: "Trần Văn Bình",
    rank: "Trung sĩ",
    serviceNumber: "SQ002345",
    role: "SOLDIER",
    unitId: "unit-2",
    unitName: "Đại đội 2",
    phone: "0902345678",
    joinDate: "2022-06-01",
    status: "ACTIVE",
    specialization: "Thông tin",
    trainingRecords: {
      completedCourses: 6,
      excellentCount: 3,
      averageScore: 78
    },
    lastActive: "2024-04-30",
  },
  {
    id: "user-3",
    fullName: "Lê Thị Cẩm",
    rank: "Đại úy",
    serviceNumber: "SQ003456",
    role: "INSTRUCTOR",
    unitId: "unit-1",
    unitName: "Đại đội 1",
    email: "lethicam@army.vn",
    phone: "0903456789",
    joinDate: "2018-03-20",
    status: "ACTIVE",
    position: "Giảng viên chính",
    specialization: "Y tế quân sự",
    trainingRecords: {
      completedCourses: 20,
      excellentCount: 18,
      averageScore: 92
    },
    lastActive: "2024-04-29",
  },
  {
    id: "user-4",
    fullName: "Phạm Đức Dũng",
    rank: "Thiếu tá",
    serviceNumber: "SQ004567",
    role: "ADMIN",
    unitId: "unit-3",
    unitName: "Ban chỉ huy",
    email: "phamducdung@army.vn",
    phone: "0904567890",
    joinDate: "2015-08-10",
    status: "ACTIVE",
    position: "Trưởng phòng hành chính",
    specialization: "Quản lý",
    lastActive: "2024-04-30",
  },
  {
    id: "user-5",
    fullName: "Hoàng Minh Đức",
    rank: "Hạ sĩ",
    serviceNumber: "SQ005678",
    role: "SOLDIER",
    unitId: "unit-2",
    unitName: "Đại đội 2",
    joinDate: "2023-12-01",
    status: "ON_LEAVE",
    specialization: "Pháo binh",
    trainingRecords: {
      completedCourses: 2,
      excellentCount: 1,
      averageScore: 72
    },
    notes: "Nghỉ phép từ 25/04 đến 05/05"
  }
];

interface UserManagementState {
  users: UserManagement[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  createUser: (payload: Omit<UserManagement, "id">) => void;
  updateUser: (id: string, payload: Partial<UserManagement>) => void;
  deleteUser: (id: string) => void;
  getUsersByUnit: (unitId: string) => UserManagement[];
  getUsersByRole: (role: UserManagement["role"]) => UserManagement[];
  getUsersByStatus: (status: UserManagement["status"]) => UserManagement[];
}

export const useUserManagementStore = create<UserManagementState>((set, get) => ({
  users: seedUsers,
  loading: false,

  async fetchUsers() {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 400));
    set({ loading: false });
  },

  createUser(payload) {
    const id = crypto.randomUUID();
    set((state) => ({
      users: [...state.users, { ...payload, id }]
    }));
  },

  updateUser(id, payload) {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...payload } : u
      ),
    }));
  },

  deleteUser(id) {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },

  getUsersByUnit(unitId) {
    return get().users.filter((u) => u.unitId === unitId);
  },

  getUsersByRole(role) {
    return get().users.filter((u) => u.role === role);
  },

  getUsersByStatus(status) {
    return get().users.filter((u) => u.status === status);
  },
}));