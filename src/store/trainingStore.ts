import { create } from "zustand";
import type { Course } from "@/types/course";
import type { Session } from "@/types/session";
import type { Enrollment } from "@/types/enrollment";
import type { Unit } from "@/types/unit";
import type { ReportFilter, ReportRow } from "@/types/report";

const seedUnits: Unit[] = [
  { id: "unit-1", name: "Đại đội 1", code: "DD1" },
  { id: "unit-2", name: "Đại đội 2", code: "DD2" },
  { id: "unit-3", name: "Đại đội 3", code: "DD3" },
];

const seedCourses: Course[] = [
  { id: "course-1", name: "Bắn súng AK nâng cao", description: "Kỹ năng ngắm, bắn mục tiêu di động", type: "FIRE", required: true },
  { id: "course-2", name: "Thể lực tổng hợp", description: "Chạy 5km, hít đất, kéo xà", type: "PHYSICAL", required: true },
  { id: "course-3", name: "Chiến thuật cấp trung đội", description: "Di chuyển đội hình, ẩn nấp", type: "THEORY", required: true },
  { id: "course-4", name: "Sơ cứu chiến trường", description: "Băng bó, vận chuyển thương binh", type: "THEORY", required: false },
];

const seedSessions: Session[] = [
  {
    id: "session-1",
    courseId: "course-1",
    unitId: "unit-1",
    startTime: "2024-04-01T08:00:00Z",
    endTime: "2024-04-01T10:00:00Z",
    location: "Trường bắn A",
    instructor: "Đại úy Minh",
    title: "Bắn bia ban ngày",
  },
  {
    id: "session-2",
    courseId: "course-2",
    unitId: "unit-2",
    startTime: "2024-04-03T06:00:00Z",
    endTime: "2024-04-03T08:00:00Z",
    location: "Sân vận động",
    instructor: "Thượng úy Sơn",
    title: "Kiểm tra thể lực 5km",
  },
  {
    id: "session-3",
    courseId: "course-3",
    unitId: "unit-2",
    startTime: "2024-04-06T13:00:00Z",
    endTime: "2024-04-06T15:00:00Z",
    location: "Phòng họp 2",
    instructor: "Thiếu tá Hải",
    title: "Chiến thuật tiến công",
  },
  {
    id: "session-4",
    courseId: "course-1",
    unitId: "unit-3",
    startTime: "2024-04-08T09:00:00Z",
    endTime: "2024-04-08T11:00:00Z",
    location: "Trường bắn B",
    instructor: "Đại úy Minh",
    title: "Bắn bia đêm",
  },
];

const seedEnrollments: Enrollment[] = [
  { id: "enroll-1", sessionId: "session-1", userId: "1", status: "COMPLETED", score: 85, passed: true },
  { id: "enroll-2", sessionId: "session-1", userId: "2", status: "COMPLETED", score: 78, passed: true },
  { id: "enroll-3", sessionId: "session-2", userId: "2", status: "COMPLETED", score: 70, passed: true },
  { id: "enroll-4", sessionId: "session-3", userId: "2", status: "SCHEDULED" },
  { id: "enroll-5", sessionId: "session-4", userId: "2", status: "ABSENT", remark: "Nhiệm vụ đột xuất" },
];

interface TrainingState {
  units: Unit[];
  courses: Course[];
  sessions: Session[];
  enrollments: Enrollment[];
  loading: boolean;
  fetchData: () => Promise<void>;
  createCourse: (payload: Omit<Course, "id">) => void;
  updateCourse: (id: string, payload: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  createSession: (payload: Omit<Session, "id">) => void;
  updateSession: (id: string, payload: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  setEnrollment: (payload: Omit<Enrollment, "id">) => void;
  getSessionEnrollments: (sessionId: string) => Enrollment[];
  getPersonalTimeline: (userId: string) => { session: Session; enrollment: Enrollment }[];
  getCourseSummaryForUser: (
    userId: string,
  ) => { course: Course; required: boolean; requiredSessions: number; completedSessions: number; passed: boolean }[];
  getReport: (filter: ReportFilter) => ReportRow[];
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  units: seedUnits,
  courses: seedCourses,
  sessions: seedSessions,
  enrollments: seedEnrollments,
  loading: false,

  async fetchData() {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 400));
    set({ loading: false });
  },

  createCourse(payload) {
    const id = crypto.randomUUID();
    set((state) => ({ courses: [...state.courses, { ...payload, id }] }));
  },

  updateCourse(id, payload) {
    set((state) => ({
      courses: state.courses.map((c) => (c.id === id ? { ...c, ...payload } : c)),
    }));
  },

  deleteCourse(id) {
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== id),
      sessions: state.sessions.filter((s) => s.courseId !== id),
      enrollments: state.enrollments.filter((e) => e.sessionId !== id),
    }));
  },

  createSession(payload) {
    const id = crypto.randomUUID();
    set((state) => ({ sessions: [...state.sessions, { ...payload, id }] }));
  },

  updateSession(id, payload) {
    set((state) => ({
      sessions: state.sessions.map((s) => (s.id === id ? { ...s, ...payload } : s)),
    }));
  },

  deleteSession(id) {
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
      enrollments: state.enrollments.filter((e) => e.sessionId !== id),
    }));
  },

  setEnrollment(payload) {
    set((state) => {
      const existing = state.enrollments.find(
        (e) => e.sessionId === payload.sessionId && e.userId === payload.userId,
      );
      if (existing) {
        return {
          enrollments: state.enrollments.map((e) =>
            e.sessionId === payload.sessionId && e.userId === payload.userId ? { ...e, ...payload } : e,
          ),
        };
      }
      return { enrollments: [...state.enrollments, { ...payload, id: crypto.randomUUID() }] };
    });
  },

  getSessionEnrollments(sessionId) {
    return get().enrollments.filter((e) => e.sessionId === sessionId);
  },

  getPersonalTimeline(userId) {
    const { sessions, enrollments } = get();
    const mapped = enrollments
      .filter((e) => e.userId === userId)
      .map((e) => ({
        enrollment: e,
        session: sessions.find((s) => s.id === e.sessionId)!,
      }))
      .filter((item) => item.session)
      .sort((a, b) => new Date(b.session.startTime).getTime() - new Date(a.session.startTime).getTime());
    return mapped;
  },

  getCourseSummaryForUser(userId) {
    const { courses, sessions, enrollments } = get();
    return courses.map((course) => {
      const courseSessions = sessions.filter((s) => s.courseId === course.id);
      const userEnrollments = enrollments.filter(
        (e) => e.userId === userId && courseSessions.some((s) => s.id === e.sessionId),
      );
      const completedSessions = userEnrollments.filter((e) => e.status === "COMPLETED").length;
      const passed = userEnrollments.some((e) => e.passed === false) ? false : completedSessions > 0;
      return {
        course,
        required: course.required,
        requiredSessions: courseSessions.length,
        completedSessions,
        passed,
      };
    });
  },

  getReport(filter) {
    const { sessions, enrollments, units } = get();
    const from = new Date(filter.from).getTime();
    const to = new Date(filter.to).getTime();
    const filteredSessions = sessions.filter((s) => {
      const time = new Date(s.startTime).getTime();
      const inRange = time >= from && time <= to;
      const byUnit = filter.unitId ? s.unitId === filter.unitId : true;
      return inRange && byUnit;
    });

    const byUnit: Record<string, { totalSessions: number; completed: number; pending: number }> = {};
    filteredSessions.forEach((s) => {
      const enrolled = enrollments.filter((e) => e.sessionId === s.id);
      const completed = enrolled.filter((e) => e.status === "COMPLETED").length;
      const pending = enrolled.filter((e) => e.status !== "COMPLETED").length;
      const total = enrolled.length || 1;
      if (!byUnit[s.unitId]) {
        byUnit[s.unitId] = { totalSessions: 0, completed: 0, pending: 0 };
      }
      byUnit[s.unitId].totalSessions += 1;
      byUnit[s.unitId].completed += completed / total;
      byUnit[s.unitId].pending += pending;
    });

    return Object.entries(byUnit).map(([unitId, stats]) => {
      const unit = units.find((u) => u.id === unitId);
      const completionRate = Math.round((stats.completed / Math.max(stats.totalSessions, 1)) * 100);
      return {
        unitId,
        unitName: unit?.name ?? unitId,
        totalSessions: stats.totalSessions,
        completionRate,
        pendingSoldiers: stats.pending,
      };
    });
  },
}));
