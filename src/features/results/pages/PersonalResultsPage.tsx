import { useState, useMemo } from "react";
import Card from "@/components/common/Card";
import Select from "@/components/common/Select";
import { useAuthStore } from "@/store/authStore";
import { useTrainingStore } from "@/store/trainingStore";
import ResultsTimeline from "../components/ResultsTimeline";
import CourseSummaryTable from "../components/CourseSummaryTable";
import { Trophy, Award, TrendingUp, Target, Calendar, Clock, CheckCircle, XCircle, AlertTriangle, Medal, Star, Zap, Shield, ChevronRight, Download, FileText, Filter } from "lucide-react";

function PersonalResultsPage() {
  const user = useAuthStore((s) => s.user);
  const timeline = useTrainingStore((s) => (user ? s.getPersonalTimeline(user.id) : []));
  const summary = useTrainingStore((s) => (user ? s.getCourseSummaryForUser(user.id) : []));
  const [filterPeriod, setFilterPeriod] = useState("all");

  const periodOptions = [
    { value: "all", label: "Tất cả thời gian" },
    { value: "thisMonth", label: "Tháng này" },
    { value: "last3Months", label: "3 tháng gần đây" },
    { value: "thisYear", label: "Năm nay" }
  ];

  // Statistics
  const stats = {
    totalCompleted: timeline.filter(t => t.enrollment.status === "COMPLETED").length,
    totalPassed: timeline.filter(t => t.enrollment.passed).length,
    avgScore: Math.round(
      timeline
        .filter(t => t.enrollment.score)
        .reduce((acc, t) => acc + (t.enrollment.score || 0), 0) /
      Math.max(timeline.filter(t => t.enrollment.score).length, 1)
    ) || 0,
    coursesCompleted: summary.filter(s => s.completedSessions >= s.requiredSessions).length,
    totalCourses: summary.length,
    highestScore: Math.max(...timeline.filter(t => t.enrollment.score).map(t => t.enrollment.score || 0), 0)
  };

  // Recent achievements
  const recentAchievements = timeline
    .filter(t => t.enrollment.status === "COMPLETED" && t.enrollment.score && t.enrollment.score >= 80)
    .slice(0, 3)
    .map(t => ({
      title: t.session.title || t.session.courseId,
      score: t.enrollment.score,
      date: t.session.startTime
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-5 sm:p-7 md:p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-sand" />
                <p className="m-0 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                  Thành tích cá nhân
                </p>
              </div>
              <div className="space-y-1">
                <h1 className="m-0 text-2xl sm:text-3xl font-bold text-sand">Kết Quả & Thành Tích</h1>
                <p className="m-0 text-sm font-medium text-sand/90">Theo dõi chi tiết kết quả huấn luyện và các thành tích đạt được</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button className="w-full sm:w-auto rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-sand hover:bg-white/20 transition-colors">
                <FileText className="inline-block mr-2 h-4 w-4" />
                Xuất báo cáo
              </button>
              <button className="w-full sm:w-auto rounded-lg bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-orange/90 transition-colors">
                <Download className="inline-block mr-2 h-4 w-4" />
                Tải chứng chỉ
              </button>
            </div>
          </div>

          {/* Quick Stats in Header */}
          <div className="mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white/10 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-sand/70">Hoàn thành</p>
                  <p className="text-xl font-bold text-sand">{stats.totalCompleted}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-sand/70">Đạt chuẩn</p>
                  <p className="text-xl font-bold text-sand">{stats.totalPassed}</p>
                </div>
                <Award className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-sand/70">Điểm TB</p>
                  <p className="text-xl font-bold text-sand">{stats.avgScore}</p>
                </div>
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-sand/70">Khóa học</p>
                  <p className="text-xl font-bold text-sand">{stats.coursesCompleted}/{stats.totalCourses}</p>
                </div>
                <Target className="h-5 w-5 text-orange" />
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl border border-yellow-200/50 bg-gradient-to-br from-white to-yellow-50/30 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-yellow-200/20 blur-2xl" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-yellow-100 p-2">
                  <Medal className="h-6 w-6 text-yellow-600" />
                </div>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-sm font-medium text-gray-600">Điểm cao nhất</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.highestScore}</p>
              <p className="mt-1 text-xs text-gray-500">Thành tích xuất sắc</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-green-200/50 bg-gradient-to-br from-white to-green-50/30 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-200/20 blur-2xl" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-green-100 p-2">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <Zap className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm font-medium text-gray-600">Tỷ lệ đạt</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalCompleted > 0 ? Math.round((stats.totalPassed / stats.totalCompleted) * 100) : 0}%
              </p>
              <p className="mt-1 text-xs text-gray-500">Hiệu suất học tập</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-200/20 blur-2xl" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <Award className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-gray-600">Chứng chỉ</p>
              <p className="text-3xl font-bold text-blue-600">{stats.coursesCompleted}</p>
              <p className="mt-1 text-xs text-gray-500">Khóa đã hoàn thành</p>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        {recentAchievements.length > 0 && (
          <Card
            className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
            title={
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-sand mt-0.5" />
                <span className="font-bold text-sand">Thành Tích Xuất Sắc Gần Đây</span>
              </div>
            }
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {recentAchievements.map((achievement, idx) => (
                <div key={idx} className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <div className={`rounded-full p-1.5 ${
                      idx === 0 ? 'bg-yellow-500/20' :
                      idx === 1 ? 'bg-gray-300/20' :
                      'bg-orange-500/20'
                    }`}>
                      <Trophy className={`h-4 w-4 ${
                        idx === 0 ? 'text-yellow-400' :
                        idx === 1 ? 'text-gray-300' :
                        'text-orange-400'
                      }`} />
                    </div>
                    <span className="text-2xl font-bold text-sand">{achievement.score}</span>
                  </div>
                  <h4 className="mb-1 font-semibold text-sand line-clamp-1">{achievement.title}</h4>
                  <p className="text-xs text-sand/70">
                    {new Date(achievement.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          {/* Timeline */}
          <Card
            className="border-2 border-border shadow-lg"
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-forest mt-0.5" />
                  <span className="font-bold text-forest">Timeline Kết Quả</span>
                </div>
                <Select
                  options={periodOptions}
                  value={filterPeriod}
                  onChange={(value) => setFilterPeriod(value || "all")}
                  placeholder="Lọc theo thời gian"
                />
              </div>
            }
          >
            <ResultsTimeline items={timeline} />
          </Card>

          {/* Course Summary */}
          <Card
            className="border-2 border-border shadow-lg"
            title={
              <div className="flex items-start gap-2">
                <Target className="h-5 w-5 text-forest mt-0.5" />
                <span className="font-bold text-forest">Tổng Hợp Khóa Học</span>
              </div>
            }
          >
            <CourseSummaryTable rows={summary} />
          </Card>
        </div>

        {/* Progress Chart */}
        <Card
          className="border-2 border-border shadow-lg"
          title={
            <div className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-forest mt-0.5" />
              <span className="font-bold text-forest">Tiến Độ Theo Tháng</span>
            </div>
          }
        >
          <div className="grid gap-4 sm:grid-cols-6">
            {[
              { month: "T7", completed: 4, total: 5, avg: 75 },
              { month: "T8", completed: 5, total: 6, avg: 82 },
              { month: "T9", completed: 6, total: 7, avg: 78 },
              { month: "T10", completed: 8, total: 10, avg: 85 },
              { month: "T11", completed: 6, total: 8, avg: 88 },
              { month: "T12", completed: 4, total: 6, avg: 92 }
            ].map((data) => (
              <div key={data.month} className="text-center">
                <p className="mb-2 text-sm font-semibold text-gray-600">{data.month}</p>
                <div className="relative mb-2 h-32 w-full rounded-lg bg-gray-100">
                  <div
                    className="absolute bottom-0 w-full rounded-lg bg-gradient-to-t from-forest to-olive transition-all"
                    style={{ height: `${(data.completed / data.total) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white drop-shadow">{data.completed}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">TB: {data.avg}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PersonalResultsPage;
