import StatsCards from "../components/StatsCards";
import UpcomingSessionsWidget from "../components/UpcomingSessionsWidget";
import RecentResultsWidget from "../components/RecentResultsWidget";
import Card from "@/components/common/Card";
import { useAuthStore } from "@/store/authStore";
import { useTrainingStore } from "@/store/trainingStore";
import { User, CheckCircle2, Target, Calendar, Award, TrendingUp, BookOpen, Clock, AlertTriangle, Shield, Activity, ChevronRight, Medal, Briefcase } from "lucide-react";

function SoldierDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const timeline = useTrainingStore((s) => (user ? s.getPersonalTimeline(user.id) : []));
  const summary = useTrainingStore((s) => (user ? s.getCourseSummaryForUser(user.id) : []));

  const completed = timeline.filter((t) => t.enrollment.status === "COMPLETED").length;
  const pendingRequired = summary.filter((s) => s.required && s.completedSessions < s.requiredSessions).length;
  const upcoming = timeline.filter((t) => t.enrollment.status === "SCHEDULED").map((t) => t.session);
  const recentResults = timeline
    .filter((t) => t.enrollment.status === "COMPLETED")
    .slice(0, 4)
    .map((t) => ({
      id: t.enrollment.id,
      title: t.session.title || t.session.courseId,
      date: t.session.startTime,
      score: t.enrollment.score,
      passed: t.enrollment.passed,
    }));

  const missingCourses = summary.filter((s) => s.required && s.completedSessions < s.requiredSessions).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-6 p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                <User className="h-8 w-8 text-sand" />
              </div>
              <div>
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                  <span className="h-1 w-8 rounded-full bg-orange" />
                  Hồ sơ cá nhân
                </p>
                <h1 className="mb-2 text-3xl font-bold text-sand">Trung Tâm Huấn Luyện Số</h1>
                <p className="text-sm font-medium text-sand/90">Theo dõi tiến độ và hiệu suất huấn luyện cá nhân</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sand backdrop-blur-sm">
                <Shield className="h-4 w-4" />
                {user?.name || "Quân nhân"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white">
                <Activity className="h-4 w-4" />
                Đang hoạt động
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-xl border border-green-200/30 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-green-100 p-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-xs font-semibold text-green-600">Đạt chuẩn</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Buổi hoàn thành</p>
              <p className="text-2xl font-bold text-forest">{completed}</p>
              <p className="mt-1 text-xs text-gray-500">Tiến độ cá nhân</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-orange-200/30 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-xs font-semibold text-orange-600">Cần bổ sung</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Khóa còn thiếu</p>
              <p className="text-2xl font-bold text-orange-600">{pendingRequired}</p>
              <p className="mt-1 text-xs text-gray-500">Cần hoàn tất</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-forest/10 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-forest/10 p-2">
                  <BookOpen className="h-6 w-6 text-forest" />
                </div>
                <span className="text-xs font-semibold text-forest">Tổng cộng</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Khóa bắt buộc</p>
              <p className="text-2xl font-bold text-forest">{summary.filter((s) => s.required).length}</p>
              <p className="mt-1 text-xs text-gray-500">Toàn bộ chương trình</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-blue-200/30 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-blue-600">Tiến bộ</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(timeline.filter(t => t.enrollment.score).reduce((acc, t) => acc + (t.enrollment.score || 0), 0) / Math.max(timeline.filter(t => t.enrollment.score).length, 1)) || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">Hiệu suất học tập</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-forest to-olive p-2">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-forest">Lịch Huấn Luyện Sắp Tới</h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                <Clock className="h-3 w-3" />
                {upcoming.length} buổi
              </span>
            </div>
            <UpcomingSessionsWidget sessions={upcoming} />
          </div>

          <Card
            className="bg-gradient-to-br from-white to-orange-50/30 border-2 border-orange-200/50 shadow-lg"
            title={
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span className="font-bold text-forest">Khóa Cần Hoàn Thành</span>
              </div>
            }
            extra={
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                <Target className="h-3 w-3" />
                Ưu tiên cao
              </span>
            }
          >
            {missingCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Medal className="mb-3 h-12 w-12 text-green-500" />
                <p className="text-center text-sm font-semibold text-green-600">Đã hoàn thành tất cả khóa yêu cầu!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {missingCourses.map((item, idx) => (
                  <div
                    key={item.course.id}
                    className="group relative overflow-hidden rounded-lg border border-orange-200/50 bg-gradient-to-r from-white to-orange-50/20 p-4 transition-all hover:shadow-md hover:border-orange-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-forest">{item.course.name}</h4>
                          <p className="mb-0 flex items-center gap-1 text-xs text-orange-700">
                            <AlertTriangle className="h-3 w-3" />
                            Còn thiếu {item.requiredSessions - item.completedSessions} buổi
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold uppercase text-red-700">
                          Bắt buộc
                        </span>
                        <div className="mt-1 h-1.5 w-16 rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-400"
                            style={{width: `${(item.completedSessions / item.requiredSessions) * 100}%`}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-xl border border-border bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-forest">Kết Quả Gần Đây</h2>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-olive hover:text-forest transition-colors">
                Xem tất cả
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <RecentResultsWidget items={recentResults} />
          </div>

          <Card
            className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
            title={
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-sand" />
                <span className="font-bold text-sand">Hướng Dẫn Nhanh</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <h4 className="mb-2 text-sm font-semibold text-sand">Quy định huấn luyện</h4>
                <ul className="m-0 space-y-2 text-xs text-sand/90">
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-3 w-3 text-orange" />
                    <span>Đến sớm 10 phút để chuẩn bị trang thiết bị</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="mt-0.5 h-3 w-3 text-orange" />
                    <span>Mang đầy đủ trang phục và bảo hộ cá nhân</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-3 w-3 text-orange" />
                    <span>Vắng có lý do cần báo cáo và bù buổi trong tuần</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-sand/10 p-3 backdrop-blur-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sand/80">Mục tiêu tuần này</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-sand">Hoàn thành</span>
                  <span className="text-lg font-bold text-orange">{Math.min(3, upcoming.length)}/{upcoming.length}</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange to-yellow-400"
                    style={{width: `${Math.min(100, (3 / Math.max(upcoming.length, 1)) * 100)}%`}}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card
          className="border-2 border-border shadow-lg"
          title={
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-forest" />
              <span className="font-bold text-forest">Bảng Tổng Kết Khóa Huấn Luyện</span>
            </div>
          }
          extra={
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              <Shield className="h-3 w-3" />
              Chỉ xem
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Khóa huấn luyện</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Yêu cầu</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Hoàn thành</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Tiến độ</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {summary.map((item) => {
                  const status = item.completedSessions >= item.requiredSessions;
                  const progress = (item.completedSessions / item.requiredSessions) * 100;
                  return (
                    <tr key={item.course.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-forest">{item.course.name}</div>
                          <p className="mb-0 text-xs text-gray-500">{item.course.description}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-semibold text-gray-700">{item.requiredSessions}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-semibold text-gray-700">{item.completedSessions}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-full">
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="text-gray-600">Tiến độ</span>
                            <span className="font-semibold text-gray-700">{Math.round(progress)}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-200">
                            <div
                              className={`h-full rounded-full transition-all ${
                                status
                                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                                  : progress > 50
                                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                                  : 'bg-gradient-to-r from-orange-400 to-red-500'
                              }`}
                              style={{width: `${Math.min(progress, 100)}%`}}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {status ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Đạt chuẩn
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                            <Clock className="h-3 w-3" />
                            Đang học
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SoldierDashboardPage;
