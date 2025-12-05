import Card from "@/components/common/Card";
import { Trophy, Medal, Star, Award, Calendar, BookOpen, Sparkles, Target, CheckCircle } from "lucide-react";

const badges = [
  { title: "Bắn súng xuất sắc", detail: "Top 3 toàn đơn vị", date: "12/04/2024", type: "Kỹ chiến đấu" },
  { title: "Hoàn thành huấn luyện thể lực", detail: "100% bài tập tuần", date: "06/04/2024", type: "Thể lực" },
  { title: "Hỗ trợ đồng đội", detail: "3 ca huấn luyện hỗ trợ", date: "28/03/2024", type: "Đồng đội" },
];

const milestones = [
  { label: "Huấn luyện đã hoàn thành", value: 18, icon: CheckCircle, color: "text-green-600" },
  { label: "Huy hiệu đạt được", value: 5, icon: Medal, color: "text-orange-600" },
  { label: "Chứng chỉ", value: 3, icon: Award, color: "text-blue-600" },
];

function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-5 sm:p-7 md:p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-sand" />
                <p className="m-0 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">Thành tích cá nhân</p>
              </div>
              <div className="space-y-1">
                <h1 className="m-0 text-2xl sm:text-3xl font-bold text-sand">Trung Tâm Thành Tích</h1>
                <p className="m-0 text-sm font-medium text-sand/90">Tổng hợp huy hiệu, chứng chỉ và mốc đạt được</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button className="w-full sm:w-auto rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-sand hover:bg-white/20 transition-colors">
                <BookOpen className="inline-block mr-2 h-4 w-4" />
                Xem hồ sơ
              </button>
              <button className="w-full sm:w-auto rounded-lg bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange/90 transition-colors">
                <Sparkles className="inline-block mr-2 h-4 w-4" />
                Thêm minh chứng
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:gap-4 sm:grid-cols-3">
            {milestones.map((item) => (
              <div key={item.label} className="rounded-lg bg-white/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-sand/70">{item.label}</p>
                    <p className="text-xl font-bold text-sand">{item.value}</p>
                  </div>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card
            className="border border-gray-200 shadow-sm"
            title={
              <div className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-orange-600" />
                <span className="font-bold text-forest">Huy Hiệu & Thành Tích</span>
              </div>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {badges.map((badge, idx) => (
                <div key={badge.title} className="rounded-lg border border-orange-100 bg-orange-50/60 p-3">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <span className="rounded-full bg-orange text-white px-2 py-1 text-xs font-bold">{idx + 1}</span>
                      <div>
                        <p className="m-0 font-semibold text-forest">{badge.title}</p>
                        <p className="m-0 text-xs text-gray-600">{badge.detail}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-orange-700 border border-orange-100">
                      <Calendar className="h-3 w-3" />
                      {badge.date}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/5 px-2 py-1 text-[11px] font-semibold text-forest">
                    <Target className="h-3 w-3" />
                    {badge.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card
            className="border border-gray-200 shadow-sm"
            title={
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-forest" />
                <span className="font-bold text-forest">Lộ Trình Chứng Chỉ</span>
              </div>
            }
          >
            <div className="space-y-3">
              {[
                { name: "Chiến sĩ giỏi", progress: 80, status: "Đang hoàn thiện" },
                { name: "Huấn luyện viên nội bộ", progress: 45, status: "Đang học" },
                { name: "Chỉ huy tiểu đội", progress: 20, status: "Khởi động" }
              ].map((cert) => (
                <div key={cert.name} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="m-0 font-semibold text-forest">{cert.name}</p>
                      <p className="m-0 text-xs text-gray-600">{cert.status}</p>
                    </div>
                    <span className="text-sm font-semibold text-forest">{cert.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-olive"
                      style={{ width: `${cert.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AchievementsPage;
