import { useNavigate } from "react-router-dom";
import StatsCards from "../components/StatsCards";
import UpcomingSessionsWidget from "../components/UpcomingSessionsWidget";
import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import Button from "@/components/common/Button";
import { useTrainingStore } from "@/store/trainingStore";
import { Shield, Users, Target, Award, TrendingUp, AlertTriangle, Activity, Clock, Calendar, ChevronRight, Zap, Database, Globe } from "lucide-react";

function AdminDashboardPage() {
  const sessions = useTrainingStore((s) => s.sessions);
  const enrollments = useTrainingStore((s) => s.enrollments);
  const units = useTrainingStore((s) => s.units);
  const report = useTrainingStore((s) =>
    s.getReport({ from: "2024-01-01", to: "2024-12-31", unitId: undefined }),
  );

  const totalSessions = sessions.length;
  const completionRate = Math.round(
    (enrollments.filter((e) => e.status === "COMPLETED").length / Math.max(enrollments.length, 1)) * 100,
  );
  const topUnits = [...report].sort((a, b) => b.completionRate - a.completionRate).slice(0, 3);
  const weakUnits = [...report].sort((a, b) => a.completionRate - b.completionRate).slice(0, 2);
  const upcoming = sessions.slice(0, 3);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-6 p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                <Shield className="h-8 w-8 text-sand" />
              </div>
              <div>
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                  <span className="h-1 w-8 rounded-full bg-orange" />
                  Trung tâm Chỉ huy
                </p>
                <h1 className="mb-2 text-3xl font-bold text-sand">Bảng Điều Khiển Chiến Lược</h1>
                <p className="text-sm font-medium text-sand/90">Hệ thống giám sát huấn luyện và chuyển đổi số quân đội</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand"
                onClick={() => navigate("/reports")}
              >
                <Activity className="mr-2 h-4 w-4" />
                Phân tích dữ liệu
              </Button>
              <Button
                variant="secondary"
                className="bg-orange text-white hover:bg-orange/90 border-orange"
                onClick={() => navigate("/sessions")}
              >
                <Zap className="mr-2 h-4 w-4" />
                Triển khai nhanh
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-xl border border-forest/10 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-forest/10 p-2">
                  <Target className="h-6 w-6 text-forest" />
                </div>
                <span className="text-xs font-semibold text-green-600">+12%</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Buổi huấn luyện</p>
              <p className="text-2xl font-bold text-forest">{totalSessions}</p>
              <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-forest to-olive" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-olive/10 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-olive/5 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-olive/10 p-2">
                  <TrendingUp className="h-6 w-6 text-olive" />
                </div>
                <span className="text-xs font-semibold text-orange">Tăng trưởng</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Tỷ lệ hoàn thành</p>
              <p className="text-2xl font-bold text-olive">{completionRate}%</p>
              <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-gradient-to-r from-olive to-moss" style={{width: `${completionRate}%`}} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-orange/10 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-orange/10 p-2">
                  <Award className="h-6 w-6 text-orange" />
                </div>
                <span className="text-xs font-semibold text-green-600">Xuất sắc</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Đơn vị dẫn đầu</p>
              <p className="text-lg font-bold text-orange">{topUnits[0]?.unitName ?? "Đang cập nhật"}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-gray-500">Hiệu suất:</span>
                <span className="text-sm font-semibold text-green-600">{topUnits[0]?.completionRate ?? 0}%</span>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-moss/10 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-moss/5 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-moss/10 p-2">
                  <Users className="h-6 w-6 text-moss" />
                </div>
                <span className="text-xs font-semibold text-blue-600">Hoạt động</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Tổng quân nhân</p>
              <p className="text-2xl font-bold text-moss">{enrollments.length}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-gray-500">Tham gia:</span>
                <span className="text-sm font-semibold text-forest">{enrollments.filter(e => e.status !== "ABSENT").length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <div className="rounded-xl border border-border bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-forest to-olive p-2">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-forest">Lịch Huấn Luyện Sắp Tới</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-olive hover:text-forest" onClick={() => navigate("/sessions")}>
                Xem tất cả
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <UpcomingSessionsWidget sessions={upcoming} />
          </div>

          <Card
            className="bg-gradient-to-br from-white to-gray-50 border-2 border-forest/10 shadow-lg"
            title={
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-forest" />
                <span className="font-bold text-forest">Tình Hình Đơn Vị</span>
              </div>
            }
            extra={
              <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                <Clock className="h-3 w-3" />
                Tuần này
              </span>
            }
          >
            <div className="space-y-4">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Đơn vị xuất sắc</p>
                </div>
                <div className="space-y-2">
                  {topUnits.map((u, idx) => (
                    <div
                      key={u.unitId}
                      className="group relative overflow-hidden rounded-lg border border-green-200/50 bg-gradient-to-r from-green-50/50 to-transparent p-3 transition-all hover:shadow-md hover:border-green-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white ${
                            idx === 0 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                            idx === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                            'bg-gradient-to-br from-orange-400 to-orange-500'
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-forest">{units.find((x) => x.id === u.unitId)?.name ?? u.unitId}</div>
                            <p className="mb-0 text-xs text-gray-600">{u.totalSessions} buổi huấn luyện</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-green-600">{u.completionRate}%</span>
                          <div className="mt-1 h-1.5 w-16 rounded-full bg-gray-200">
                            <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{width: `${u.completionRate}%`}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Cần hỗ trợ khẩn cấp</p>
                </div>
                <div className="space-y-2">
                  {weakUnits.map((u) => (
                    <div
                      key={u.unitId}
                      className="group relative overflow-hidden rounded-lg border border-orange-200/50 bg-gradient-to-r from-orange-50/50 to-transparent p-3 transition-all hover:shadow-md hover:border-orange-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-forest">{units.find((x) => x.id === u.unitId)?.name ?? u.unitId}</div>
                          <p className="mb-0 flex items-center gap-1 text-xs text-orange-700">
                            <AlertTriangle className="h-3 w-3" />
                            {u.pendingSoldiers} quân nhân chưa đạt
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-orange-600">{u.completionRate}%</span>
                          <div className="mt-1 h-1.5 w-16 rounded-full bg-gray-200">
                            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-400" style={{width: `${u.completionRate}%`}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card
            className="border-2 border-border shadow-lg"
            title={
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-forest" />
                <span className="font-bold text-forest">Kết Quả Huấn Luyện Gần Đây</span>
              </div>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {enrollments.slice(0, 4).map((enroll) => {
                const session = sessions.find((s) => s.id === enroll.sessionId);
                const unit = units.find((u) => u.id === session?.unitId);
                return (
                  <div
                    key={enroll.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-white to-gray-50 p-4 transition-all hover:shadow-md hover:scale-[1.01]"
                  >
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-forest/5 to-transparent rounded-bl-full" />
                    <div className="relative space-y-2">
                      <div>
                        <h4 className="font-semibold text-forest line-clamp-1">{session?.title ?? session?.courseId}</h4>
                        <p className="mb-0 flex items-center gap-1 text-sm text-gray-600">
                          <Shield className="h-3 w-3" />
                          {unit?.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-500">Trạng thái:</span>
                        {enroll.status === "COMPLETED" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                            <Award className="h-3 w-3" />
                            {enroll.score ?? 0} điểm
                          </span>
                        ) : enroll.status === "ABSENT" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                            <AlertTriangle className="h-3 w-3" />
                            Vắng mặt
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                            <Clock className="h-3 w-3" />
                            Đã lên lịch
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
            title={
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-sand" />
                <span className="font-bold text-sand">Trung Tâm Chỉ Huy Nhanh</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sand">
                  <Globe className="h-4 w-4" />
                  Chuyển Đổi Số
                </h4>
                <div className="space-y-2">
                  <button
                    className="group flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-left text-sm font-medium text-sand transition-all hover:bg-white/20"
                    onClick={() => navigate("/sessions")}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange" />
                      Lập kế hoạch tuần mới
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    className="group flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-left text-sm font-medium text-sand transition-all hover:bg-white/20"
                    onClick={() => navigate("/reports")}
                  >
                    <span className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-orange" />
                      Xuất báo cáo tổng hợp
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    className="group flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-left text-sm font-medium text-sand transition-all hover:bg-white/20"
                    onClick={() => navigate("/reports")}
                  >
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange" />
                      Phân tích điểm yếu
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              <div className="rounded-lg bg-sand/10 p-3 backdrop-blur-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sand/80">Thông tin mật</p>
                <p className="text-xs text-sand/90">
                  Hệ thống AI đang phân tích {enrollments.length} hồ sơ huấn luyện để tối ưu hóa chiến lược đào tạo.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-sand">Đang hoạt động 24/7</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
