import { useState } from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useAuthStore } from "@/store/authStore";
import { useTrainingStore } from "@/store/trainingStore";
import { User, Shield, Award, Calendar, Phone, Mail, MapPin, Edit2, Save, X, Camera, Briefcase, Star, TrendingUp, Clock, CheckCircle, AlertTriangle, Medal } from "lucide-react";

function UserProfilePage() {
  const user = useAuthStore((s) => s.user);
  const timeline = useTrainingStore((s) => (user ? s.getPersonalTimeline(user.id) : []));
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    phone: "0912345678",
    email: user?.serviceNumber + "@military.gov.vn",
    address: "Đơn vị A, Sư đoàn 1"
  });

  const stats = {
    totalSessions: timeline.length,
    completed: timeline.filter((t) => t.enrollment.status === "COMPLETED").length,
    avgScore: Math.round(timeline.filter(t => t.enrollment.score).reduce((acc, t) => acc + (t.enrollment.score || 0), 0) / Math.max(timeline.filter(t => t.enrollment.score).length, 1)) || 0,
    rank: "Trung sĩ",
    yearsOfService: 3,
    achievements: 5
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-4 sm:p-6 md:p-8 text-sand shadow-xl sm:shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="h-12 w-12 sm:h-16 sm:w-16 text-sand" />
                </div>
                <button className="absolute bottom-0 right-0 rounded-full bg-orange p-1.5 sm:p-2 text-white shadow-lg hover:bg-orange/90 transition-colors">
                  <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-sand mb-2">{user?.fullName || "Quân nhân"}</h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-sand backdrop-blur-sm">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate max-w-[100px] sm:max-w-none">SQ: {user?.serviceNumber}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-white">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                    {stats.rank}
                  </span>
                </div>
                <p className="text-sand/80 text-xs sm:text-sm">
                  {stats.yearsOfService} năm phục vụ • Đơn vị: {user?.unit || "Đang cập nhật"}
                </p>
              </div>

              {/* Edit Button */}
              <div className="mt-4 sm:mt-0">
                {!isEditing ? (
                  <Button
                    variant="secondary"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Chỉnh sửa
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="bg-green-500 text-white hover:bg-green-600 border-green-500"
                      onClick={handleSave}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Lưu
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-red-500 text-white hover:bg-red-600 border-red-500"
                      onClick={() => setIsEditing(false)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Hủy
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-green-200/50 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.completed}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Buổi hoàn thành</p>
            <p className="text-xs text-gray-500 mt-1">Trong tổng số {stats.totalSessions} buổi</p>
          </div>

          <div className="rounded-xl border border-blue-200/50 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.avgScore}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
            <p className="text-xs text-gray-500 mt-1">Hiệu suất học tập</p>
          </div>

          <div className="rounded-xl border border-orange-200/50 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-orange-100 p-2">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{stats.achievements}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Thành tích</p>
            <p className="text-xs text-gray-500 mt-1">Chứng nhận & khen thưởng</p>
          </div>

          <div className="rounded-xl border border-purple-200/50 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{stats.yearsOfService}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Năm phục vụ</p>
            <p className="text-xs text-gray-500 mt-1">Thời gian công tác</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
          {/* Contact Information */}
          <Card
            className="border-2 border-border shadow-lg"
            title={
              <div className="flex items-start gap-2">
                <Briefcase className="h-5 w-5 text-forest mt-0.5" />
                <span className="font-bold text-forest">Thông Tin Liên Hệ</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Phone className="h-5 w-5 text-gray-600 mt-0.5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Số điện thoại</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-1 text-sm"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{editedProfile.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-1 text-sm"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{editedProfile.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Địa chỉ đơn vị</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.address}
                      onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-1 text-sm"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{editedProfile.address}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card
            className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
            title={
              <div className="flex items-start gap-2">
                <Medal className="h-5 w-5 text-sand mt-0.5" />
                <span className="font-bold text-sand">Thành Tích Gần Đây</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-sand">Bằng khen xuất sắc</span>
                  <span className="text-xs text-sand/70">12/2024</span>
                </div>
                <p className="text-xs text-sand/80">Hoàn thành xuất sắc khóa huấn luyện chiến thuật</p>
              </div>

              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-sand">Chiến sĩ thi đua</span>
                  <span className="text-xs text-sand/70">10/2024</span>
                </div>
                <p className="text-xs text-sand/80">Đạt thành tích cao trong huấn luyện quý 3</p>
              </div>

              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-sand">Chứng nhận</span>
                  <span className="text-xs text-sand/70">08/2024</span>
                </div>
                <p className="text-xs text-sand/80">Hoàn thành khóa huấn luyện kỹ năng số</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Training Progress */}
        <Card
          className="border-2 border-border shadow-lg"
          title={
            <div className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-forest mt-0.5" />
              <span className="font-bold text-forest">Tiến Độ Huấn Luyện Theo Tháng</span>
            </div>
          }
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { month: "Tháng 10", completed: 8, total: 10, score: 85 },
              { month: "Tháng 11", completed: 6, total: 8, score: 78 },
              { month: "Tháng 12", completed: 4, total: 6, score: 92 }
            ].map((month) => (
              <div key={month.month} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="font-semibold text-forest mb-3">{month.month}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hoàn thành</span>
                    <span className="font-semibold">{month.completed}/{month.total} buổi</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                      style={{width: `${(month.completed / month.total) * 100}%`}}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Điểm TB</span>
                    <span className="font-bold text-green-600">{month.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserProfilePage;