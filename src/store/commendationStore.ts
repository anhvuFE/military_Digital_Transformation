import { create } from "zustand";
import type { Commendation } from "@/types/commendation";

const seedCommendations: Commendation[] = [
  {
    id: "comm-1",
    title: "Huy chương Chiến sĩ Xuất sắc",
    description: "Hoàn thành xuất sắc nhiệm vụ huấn luyện quý I/2024",
    type: "MEDAL",
    level: "INDIVIDUAL",
    date: "2024-04-12",
    recipientName: "Nguyễn Văn A",
    unit: "Đại đội 1",
    criteria: "Điểm bắn súng cao nhất khóa\nHoàn thành 100% buổi huấn luyện",
    approvedBy: "Thiếu tá Hùng",
    status: "APPROVED"
  },
  {
    id: "comm-2",
    title: "Chứng nhận Đơn vị Tiên tiến",
    description: "Đơn vị xuất sắc trong phong trào thi đua",
    type: "CERTIFICATE",
    level: "UNIT",
    date: "2024-04-10",
    unit: "Đại đội 2",
    criteria: "Hoàn thành 100% chỉ tiêu\nTiến bộ thể lực vượt trội",
    approvedBy: "Trung tá Minh",
    status: "AWARDED"
  },
  {
    id: "comm-3",
    title: "Thành tích Lính giỏi",
    description: "Tham gia đầy đủ và hỗ trợ đồng đội tích cực",
    type: "ACHIEVEMENT",
    level: "INDIVIDUAL",
    date: "2024-04-18",
    recipientName: "Trần Văn B",
    unit: "Đại đội 2",
    status: "PENDING"
  }
];

interface CommendationState {
  commendations: Commendation[];
  loading: boolean;
  fetchCommendations: () => Promise<void>;
  createCommendation: (payload: Omit<Commendation, "id">) => void;
  updateCommendation: (id: string, payload: Partial<Commendation>) => void;
  deleteCommendation: (id: string) => void;
  getCommendationsByUnit: (unit: string) => Commendation[];
  getCommendationsByType: (type: Commendation["type"]) => Commendation[];
}

export const useCommendationStore = create<CommendationState>((set, get) => ({
  commendations: seedCommendations,
  loading: false,

  async fetchCommendations() {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 400));
    set({ loading: false });
  },

  createCommendation(payload) {
    const id = crypto.randomUUID();
    set((state) => ({
      commendations: [...state.commendations, { ...payload, id, status: payload.status || "PENDING" }]
    }));
  },

  updateCommendation(id, payload) {
    set((state) => ({
      commendations: state.commendations.map((c) =>
        c.id === id ? { ...c, ...payload } : c
      ),
    }));
  },

  deleteCommendation(id) {
    set((state) => ({
      commendations: state.commendations.filter((c) => c.id !== id),
    }));
  },

  getCommendationsByUnit(unit) {
    return get().commendations.filter((c) => c.unit === unit);
  },

  getCommendationsByType(type) {
    return get().commendations.filter((c) => c.type === type);
  },
}));