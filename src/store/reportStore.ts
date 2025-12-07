import { create } from "zustand";
import type { ReportEntity } from "@/types/report-entity";

const seedReports: ReportEntity[] = [
  {
    id: "report-1",
    title: "Báo cáo huấn luyện Quý 1/2024",
    description: "Tổng kết kết quả huấn luyện 3 tháng đầu năm 2024",
    type: "TRAINING",
    period: {
      from: "2024-01-01",
      to: "2024-03-31"
    },
    unitName: "Toàn quân",
    createdBy: "Thiếu tá Hùng",
    createdAt: "2024-04-01",
    status: "APPROVED",
    data: {
      totalSessions: 45,
      completionRate: 85,
      pendingSoldiers: 12,
      excellentCount: 120,
      passCount: 280,
      failCount: 15
    },
    approvedBy: "Trung tá Minh",
    approvedAt: "2024-04-05"
  },
  {
    id: "report-2",
    title: "Báo cáo thể lực Đại đội 1",
    description: "Đánh giá thể lực định kỳ tháng 4/2024",
    type: "PERFORMANCE",
    period: {
      from: "2024-04-01",
      to: "2024-04-30"
    },
    unitId: "unit-1",
    unitName: "Đại đội 1",
    createdBy: "Đại úy Nam",
    createdAt: "2024-04-28",
    status: "SUBMITTED",
    data: {
      totalSessions: 8,
      completionRate: 92,
      excellentCount: 45,
      passCount: 85,
      failCount: 5
    }
  },
  {
    id: "report-3",
    title: "Báo cáo chuyên cần tháng 4",
    description: "Thống kê tình hình chuyên cần của toàn đơn vị",
    type: "ATTENDANCE",
    period: {
      from: "2024-04-01",
      to: "2024-04-30"
    },
    createdBy: "Thượng úy Sơn",
    createdAt: "2024-04-25",
    status: "DRAFT",
    data: {
      totalSessions: 20,
      completionRate: 88,
      pendingSoldiers: 8
    },
    notes: "Cần cải thiện tỷ lệ tham gia của Đại đội 3"
  }
];

interface ReportState {
  reports: ReportEntity[];
  loading: boolean;
  fetchReports: () => Promise<void>;
  createReport: (payload: Omit<ReportEntity, "id">) => void;
  updateReport: (id: string, payload: Partial<ReportEntity>) => void;
  deleteReport: (id: string) => void;
  getReportsByUnit: (unitId: string) => ReportEntity[];
  getReportsByType: (type: ReportEntity["type"]) => ReportEntity[];
  getReportsByStatus: (status: ReportEntity["status"]) => ReportEntity[];
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: seedReports,
  loading: false,

  async fetchReports() {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 400));
    set({ loading: false });
  },

  createReport(payload) {
    const id = crypto.randomUUID();
    set((state) => ({
      reports: [...state.reports, { ...payload, id, createdAt: new Date().toISOString() }]
    }));
  },

  updateReport(id, payload) {
    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === id ? { ...r, ...payload } : r
      ),
    }));
  },

  deleteReport(id) {
    set((state) => ({
      reports: state.reports.filter((r) => r.id !== id),
    }));
  },

  getReportsByUnit(unitId) {
    return get().reports.filter((r) => r.unitId === unitId);
  },

  getReportsByType(type) {
    return get().reports.filter((r) => r.type === type);
  },

  getReportsByStatus(status) {
    return get().reports.filter((r) => r.status === status);
  },
}));