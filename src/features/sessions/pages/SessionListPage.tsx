import { useEffect, useMemo, useState } from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useUiStore } from "@/store/uiStore";
import { useTrainingStore } from "@/store/trainingStore";
import SessionFilterBar, { SessionFilters } from "../components/SessionFilterBar";
import SessionTable from "../components/SessionTable";
import SessionFormModal from "../components/SessionFormModal";
import SessionResultModal from "../components/SessionResultModal";
import Pagination from "@/components/common/Pagination";
import type { Session } from "@/types/session";
import { Calendar, Clock, Users, Target, MapPin, Plus, Search, Filter, Activity, TrendingUp, AlertCircle, Award, Shield, Zap, ChevronRight, Radio, CheckCircle, XCircle } from "lucide-react";

function SessionListPage() {
  const units = useTrainingStore((s) => s.units);
  const courses = useTrainingStore((s) => s.courses);
  const sessions = useTrainingStore((s) => s.sessions);
  const setEnrollment = useTrainingStore((s) => s.setEnrollment);
  const createSession = useTrainingStore((s) => s.createSession);
  const updateSession = useTrainingStore((s) => s.updateSession);
  const enrollments = useTrainingStore((s) => s.enrollments);
  const { openModal, closeModal } = useUiStore();

  const [filters, setFilters] = useState<SessionFilters>({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const byUnit = filters.unitId ? session.unitId === filters.unitId : true;
      const byWeek = filters.week
        ? session.startTime.startsWith(filters.week.replace("W", "-"))
        : true;
      const bySearch =
        session.title?.toLowerCase().includes(search.toLowerCase()) ||
        courses.find((c) => c.id === session.courseId)?.name.toLowerCase().includes(search.toLowerCase()) ||
        session.instructor.toLowerCase().includes(search.toLowerCase()) ||
        session.location.toLowerCase().includes(search.toLowerCase());
      return byUnit && byWeek && bySearch;
    });
  }, [sessions, filters, search, courses]);

  useEffect(() => {
    setPage(1);
  }, [filters, search]);

  const openCreateModal = () =>
    openModal(
      "Tạo buổi huấn luyện",
      <SessionFormModal
        courses={courses}
        units={units}
        onSubmit={(payload) => {
          createSession(payload);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    );

  const openEditModal = (session: Session) =>
    openModal(
      "Cập nhật buổi",
      <SessionFormModal
        initial={session}
        courses={courses}
        units={units}
        onSubmit={(payload) => {
          updateSession(session.id, payload);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    );

  const openResultModal = (session: Session) => {
    const sessionEnrollments = enrollments.filter((e) => e.sessionId === session.id);
    openModal(
      "Nhập kết quả",
      <SessionResultModal
        enrollments={sessionEnrollments}
        onSave={(rows) => {
          rows.forEach((row) => setEnrollment({ ...row, sessionId: session.id, userId: row.userId }));
          closeModal();
        }}
        onCancel={closeModal}
      />,
    );
  };

  const enrollmentsBySession = useMemo(() => {
    return enrollments.reduce<Record<string, number>>((map, e) => {
      map[e.sessionId] = (map[e.sessionId] ?? 0) + 1;
      return map;
    }, {});
  }, [enrollments]);

  const upcomingCount = filteredSessions.filter((s) => new Date(s.startTime).getTime() > Date.now()).length;
  const totalUnitsCovered = new Set(filteredSessions.map((s) => s.unitId)).size;
  const pagedSessions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSessions.slice(start, start + pageSize);
  }, [filteredSessions, page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-6 p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <Calendar className="h-8 w-8 text-sand" />
                </div>
                <div>
                  <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                    <span className="h-1 w-8 rounded-full bg-orange" />
                    Trung tâm Lập Kế Hoạch
                  </p>
                  <h1 className="mb-2 text-3xl font-bold text-sand">Lịch Huấn Luyện Chiến Thuật</h1>
                  <p className="text-sm font-medium text-sand/90">Quản lý và triển khai buổi huấn luyện toàn quân khu</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand"
                  onClick={() => window.location.reload()}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Làm mới
                </Button>
                <Button
                  className="bg-orange text-white hover:bg-orange/90 border-orange"
                  onClick={openCreateModal}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo buổi mới
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Tổng buổi</p>
                    <p className="text-2xl font-bold text-sand">{filteredSessions.length}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <Calendar className="h-5 w-5 text-sand" />
                  </div>
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-white/20">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-orange to-yellow-400" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Sắp diễn ra</p>
                    <p className="text-2xl font-bold text-sand">{upcomingCount}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <Clock className="h-5 w-5 text-orange" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <Radio className="h-3 w-3 text-green-400 animate-pulse" />
                  <span className="text-xs text-sand/80">Đang hoạt động</span>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Đơn vị</p>
                    <p className="text-2xl font-bold text-sand">{totalUnitsCovered}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <Users className="h-5 w-5 text-sand" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-sand/70">Tham gia huấn luyện</p>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Hoàn thành</p>
                    <p className="text-2xl font-bold text-sand">
                      {Math.round((enrollments.filter(e => e.status === "COMPLETED").length / Math.max(enrollments.length, 1)) * 100)}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-sand/70">Tỷ lệ thành công</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-2 border-forest/10 bg-white shadow-lg">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-forest">
                <Search className="h-4 w-4" />
                Tìm kiếm buổi huấn luyện
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm font-medium placeholder-gray-400 transition-all focus:border-forest focus:bg-white focus:outline-none"
                  placeholder="Tiêu đề, khóa, giảng viên, địa điểm..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                <AlertCircle className="h-3 w-3" />
                <span>Gợi ý: Tìm theo giảng viên, địa điểm hoặc tên khóa</span>
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-forest">
                <Filter className="h-4 w-4" />
                Bộ lọc theo đơn vị & tuần
              </label>
              <SessionFilterBar units={units} filters={filters} onChange={setFilters} variant="plain" />
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
          <Card className="border-2 border-border shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-forest" />
                <h2 className="text-lg font-bold text-forest">Danh Sách Buổi Huấn Luyện</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  <CheckCircle className="h-3 w-3" />
                  {enrollments.filter(e => e.status === "COMPLETED").length} hoàn thành
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  <Clock className="h-3 w-3" />
                  {enrollments.filter(e => e.status === "SCHEDULED").length} chờ
                </span>
              </div>
            </div>

            <SessionTable
              sessions={pagedSessions}
              courses={courses}
              units={units}
              enrollmentsBySession={enrollmentsBySession}
              onEdit={openEditModal}
              onResult={openResultModal}
            />
            <div className="mt-4 border-t border-gray-200 pt-4">
              <Pagination total={filteredSessions.length} page={page} pageSize={pageSize} onChange={setPage} />
            </div>
          </Card>

          <div className="space-y-6">
            <Card
              className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
              title={
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-sand" />
                  <span className="font-bold text-sand">Trung Tâm Tác Chiến</span>
                </div>
              }
            >
              <div className="space-y-3">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sand">
                    <Shield className="h-4 w-4" />
                    Tình hình hiện tại
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sand/80">Buổi hôm nay</span>
                      <span className="text-sm font-bold text-sand">
                        {filteredSessions.filter(s => s.startTime.startsWith(new Date().toISOString().split('T')[0])).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sand/80">Tuần này</span>
                      <span className="text-sm font-bold text-sand">
                        {filteredSessions.filter(s => {
                          const sessionDate = new Date(s.startTime);
                          const now = new Date();
                          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                          const weekEnd = new Date(weekStart);
                          weekEnd.setDate(weekStart.getDate() + 7);
                          return sessionDate >= weekStart && sessionDate < weekEnd;
                        }).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sand/80">Chưa nhập điểm</span>
                      <span className="text-sm font-bold text-orange">
                        {enrollments.filter(e => e.status === "COMPLETED" && !e.score).length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sand">
                    <MapPin className="h-4 w-4" />
                    Địa điểm huấn luyện
                  </h4>
                  <div className="space-y-1.5">
                    {[...new Set(pagedSessions.map(s => s.location))].slice(0, 3).map(location => (
                      <div key={location} className="flex items-center gap-2 text-xs text-sand/90">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange" />
                        <span>{location}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="group flex w-full items-center justify-between rounded-lg bg-orange p-3 text-white transition-all hover:bg-orange/90 hover:shadow-md">
                  <span className="text-sm font-medium">Xuất báo cáo tuần</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Card>

            <Card className="border-2 border-orange-200/50 bg-gradient-to-br from-white to-orange-50/30 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                <h3 className="font-bold text-forest">Hiệu suất huấn luyện</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Tỷ lệ tham gia</span>
                    <span className="font-bold text-forest">
                      {Math.round((enrollments.filter(e => e.status !== "ABSENT").length / Math.max(enrollments.length, 1)) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                      style={{width: `${(enrollments.filter(e => e.status !== "ABSENT").length / Math.max(enrollments.length, 1)) * 100}%`}}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Tỷ lệ đạt</span>
                    <span className="font-bold text-forest">
                      {Math.round((enrollments.filter(e => e.passed).length / Math.max(enrollments.filter(e => e.status === "COMPLETED").length, 1)) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-yellow-500"
                      style={{width: `${(enrollments.filter(e => e.passed).length / Math.max(enrollments.filter(e => e.status === "COMPLETED").length, 1)) * 100}%`}}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-green-50 p-2 text-center">
                    <p className="text-xs text-green-600">Xuất sắc</p>
                    <p className="text-lg font-bold text-green-700">
                      {enrollments.filter(e => e.score && e.score >= 90).length}
                    </p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-2 text-center">
                    <p className="text-xs text-red-600">Vắng mặt</p>
                    <p className="text-lg font-bold text-red-700">
                      {enrollments.filter(e => e.status === "ABSENT").length}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionListPage;
