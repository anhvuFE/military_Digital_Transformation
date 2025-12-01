import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import Button from "@/components/common/Button";
import { Award, Trophy, Medal, Star, Users, User, Calendar, MapPin, Shield, Zap, ChevronRight, Plus, Download, TrendingUp, Target, Flag, Heart, Brain, Sparkles, Crown, AlertCircle, Clock, CheckCircle } from "lucide-react";

const unitPlans = [
  { unit: "Đại đội 1", reason: "Hoàn thành 100% buổi huấn luyện tuần", date: "2024-04-10", level: "Đơn vị" },
  { unit: "Đại đội 2", reason: "Tiến bộ thể lực, giảm vắng mặt", date: "2024-04-15", level: "Đơn vị" },
];

const individualPlans = [
  { name: "Nguyễn Văn A", unit: "Đại đội 1", reason: "Điểm bắn súng cao nhất khóa", date: "2024-04-12" },
  { name: "Trần Văn B", unit: "Đại đội 2", reason: "Tham gia đầy đủ, hỗ trợ đồng đội", date: "2024-04-18" },
];

const upcoming = [
  { title: "Lễ tuyên dương tuần 2", location: "Hội trường A", time: "08:00 15/04/2024" },
  { title: "Trao giấy khen thể lực", location: "Sân vận động", time: "16:00 20/04/2024" },
];

function CommendationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50/20 to-gray-50">
      <div className="space-y-6 p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-yellow-400/30 to-orange/30 p-3 backdrop-blur-sm">
                  <Trophy className="h-8 w-8 text-sand" />
                </div>
                <div>
                  <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                    <span className="h-1 w-8 rounded-full bg-yellow-400" />
                    Trung tâm Vinh danh
                  </p>
                  <h1 className="mb-2 text-3xl font-bold text-sand">Khen Thưởng & Tuyên Dương</h1>
                  <p className="text-sm font-medium text-sand/90">Ghi nhận thành tích xuất sắc trong huấn luyện chiến đấu</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo đề xuất
                </Button>
                <Button
                  className="bg-gradient-to-r from-yellow-500 to-orange text-white hover:from-yellow-600 hover:to-orange/90 border-0"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Xuất quyết định
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-yellow-400/20 to-transparent p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Tổng đề xuất</p>
                    <p className="text-2xl font-bold text-sand">{unitPlans.length + individualPlans.length}</p>
                  </div>
                  <div className="rounded-lg bg-yellow-400/30 p-2">
                    <Award className="h-5 w-5 text-sand" />
                  </div>
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-white/20">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-yellow-400 to-orange" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Đơn vị</p>
                    <p className="text-2xl font-bold text-sand">{unitPlans.length}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <Users className="h-5 w-5 text-sand" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-sand/70">Khen thưởng tập thể</p>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Cá nhân</p>
                    <p className="text-2xl font-bold text-sand">{individualPlans.length}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <User className="h-5 w-5 text-sand" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-sand/70">Thành tích xuất sắc</p>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Sự kiện</p>
                    <p className="text-2xl font-bold text-sand">{upcoming.length}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <Calendar className="h-5 w-5 text-orange" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-sand/70">Sắp diễn ra</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-2 border-yellow-200/50 bg-gradient-to-br from-white to-yellow-50/30 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-forest" />
                <h3 className="font-bold text-forest">Đơn Vị Xuất Sắc</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <TrendingUp className="h-3 w-3" />
                {unitPlans.length} đề xuất
              </span>
            </div>
            <div className="space-y-3">
              {unitPlans.map((item, idx) => (
                <div
                  key={item.unit}
                  className="group relative overflow-hidden rounded-lg border border-green-200/50 bg-gradient-to-r from-green-50/50 to-transparent p-4 transition-all hover:shadow-md hover:border-green-300"
                >
                  <div className="absolute top-2 right-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold shadow-md">
                      <Crown className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="pr-12">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-forest" />
                      <span className="font-bold text-forest">{item.unit}</span>
                    </div>
                    <p className="mb-2 text-sm text-gray-700">{item.reason}</p>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        Dự kiến: {item.date}
                      </p>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        Cấp đơn vị
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-2 border-orange-200/50 bg-gradient-to-br from-white to-orange-50/30 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-orange-600" />
                <h3 className="font-bold text-forest">Cá Nhân Tiêu Biểu</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                <Star className="h-3 w-3" />
                {individualPlans.length} đề xuất
              </span>
            </div>
            <div className="space-y-3">
              {individualPlans.map((item) => (
                <div
                  key={item.name}
                  className="group relative overflow-hidden rounded-lg border border-orange-200/50 bg-gradient-to-r from-orange-50/50 to-transparent p-4 transition-all hover:shadow-md hover:border-orange-300"
                >
                  <div className="absolute top-2 right-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold shadow-md">
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="pr-12">
                    <div className="mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-orange-600" />
                      <span className="font-bold text-forest">{item.name}</span>
                    </div>
                    <p className="mb-2 text-sm text-gray-700">{item.reason}</p>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-1 text-xs text-gray-600">
                        <Shield className="h-3 w-3" />
                        {item.unit} • {item.date}
                      </p>
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                        Cá nhân
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <Card className="border-2 border-border shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-forest" />
                <h3 className="font-bold text-forest">Lịch Tuyên Dương & Trao Thưởng</h3>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-olive hover:text-forest transition-colors">
                Xem toàn bộ
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {upcoming.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-4 transition-all hover:shadow-md hover:border-forest/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100 p-3">
                        <Trophy className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-forest">{item.title}</h4>
                        <div className="mt-2 space-y-1">
                          <p className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Clock className="h-3.5 w-3.5" />
                            {item.time}
                          </p>
                          <p className="flex items-center gap-1.5 text-sm text-gray-600">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      <Sparkles className="h-3 w-3" />
                      Sắp tới
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card
              className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
              title={
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-sand" />
                  <span className="font-bold text-sand">Tiêu Chí Đánh Giá</span>
                </div>
              }
            >
              <div className="space-y-3">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-2 text-sm font-semibold text-sand">Tiêu chuẩn đơn vị</h4>
                  <ul className="m-0 space-y-1.5 text-xs text-sand/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 text-green-400" />
                      <span>Hoàn thành 100% kế hoạch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 text-green-400" />
                      <span>Tỷ lệ vắng mặt &lt; 5%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3 w-3 text-green-400" />
                      <span>Kỷ luật tốt</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-2 text-sm font-semibold text-sand">Tiêu chuẩn cá nhân</h4>
                  <ul className="m-0 space-y-1.5 text-xs text-sand/90">
                    <li className="flex items-start gap-2">
                      <Star className="mt-0.5 h-3 w-3 text-yellow-400" />
                      <span>Thành tích bắn xuất sắc</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="mt-0.5 h-3 w-3 text-yellow-400" />
                      <span>Thể lực vượt chuẩn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="mt-0.5 h-3 w-3 text-yellow-400" />
                      <span>Hỗ trợ đồng đội</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-yellow-200/50 bg-gradient-to-br from-white to-yellow-50/30 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                <h3 className="font-bold text-forest">Hình thức khen thưởng</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-red-50 to-orange-50 p-3 transition-all hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Hỏa lực</p>
                      <p className="text-xs text-gray-600">Giấy khen</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-3 transition-all hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Thể lực</p>
                      <p className="text-xs text-gray-600">Huy hiệu</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-3 transition-all hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Lý thuyết</p>
                      <p className="text-xs text-gray-600">Phần thưởng</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 p-3 transition-all hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Đơn vị</p>
                      <p className="text-xs text-gray-600">Cờ thi đua</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-6 rounded-xl border-2 border-yellow-300/30 bg-gradient-to-r from-yellow-50 via-orange-50/30 to-yellow-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 p-2">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-bold text-forest">Thông báo quan trọng</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-white/80 p-3">
                  <div className="mb-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <p className="text-xs font-semibold uppercase text-gray-600">Hạn chót</p>
                  </div>
                  <p className="text-sm text-gray-700">Nộp đề xuất trước 15/04</p>
                </div>
                <div className="rounded-lg bg-white/80 p-3">
                  <div className="mb-1 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-xs font-semibold uppercase text-gray-600">Tiến độ</p>
                  </div>
                  <p className="text-sm text-gray-700">60% đã hoàn tất thủ tục</p>
                </div>
                <div className="rounded-lg bg-white/80 p-3">
                  <div className="mb-1 flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <p className="text-xs font-semibold uppercase text-gray-600">Quỹ thưởng</p>
                  </div>
                  <p className="text-sm text-gray-700">Còn 85% ngân sách</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommendationPage;
