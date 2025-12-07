import { Course } from "@/types/course";
import Button from "@/components/common/Button";
import { BookOpen, Target, Heart, GraduationCap, Shield, Award, Calendar, Users, AlertCircle } from "lucide-react";

interface Props {
  course: Course;
  sessionCount?: number;
  enrollmentCount?: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const typeConfig = {
  FIRE: {
    label: "Hỏa lực",
    icon: Target,
    color: "text-red-600",
    bg: "bg-red-100",
    gradient: "from-red-500 to-orange-500"
  },
  PHYSICAL: {
    label: "Thể lực",
    icon: Heart,
    color: "text-green-600",
    bg: "bg-green-100",
    gradient: "from-green-500 to-emerald-500"
  },
  THEORY: {
    label: "Lý thuyết",
    icon: GraduationCap,
    color: "text-blue-600",
    bg: "bg-blue-100",
    gradient: "from-blue-500 to-indigo-500"
  }
};

function CourseViewModal({
  course,
  sessionCount = 0,
  enrollmentCount = 0,
  onEdit,
  onDelete,
  onClose
}: Props) {
  const config = typeConfig[course.type];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl bg-gradient-to-br ${config.gradient} p-3 text-white shadow-lg`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
            <p className="text-sm text-gray-500 mt-1">ID: {course.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {course.required ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              <Shield className="h-3 w-3" />
              Bắt buộc
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Award className="h-3 w-3" />
              Tùy chọn
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {course.description && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{course.description}</p>
        </div>
      )}

      {/* Course Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Icon className={`h-5 w-5 ${config.color} mt-0.5`} />
            <div>
              <p className="text-sm font-semibold text-gray-700">Loại khóa</p>
              <p className="text-base font-medium text-gray-900">{config.label}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Số buổi học</p>
              <p className="text-base font-medium text-gray-900">{sessionCount} buổi</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Tổng học viên</p>
              <p className="text-base font-medium text-gray-900">{enrollmentCount} người</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-forest mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Trạng thái</p>
              <p className="text-base font-medium text-gray-900">
                {course.required ? "Bắt buộc" : "Tùy chọn"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements if any */}
      {course.requirements && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Yêu cầu khóa học</p>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                {course.requirements}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="rounded-lg bg-gradient-to-r from-forest/10 to-olive/10 p-4">
        <h4 className="text-sm font-semibold text-forest mb-3">Thống kê khóa học</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-forest">{sessionCount}</p>
            <p className="text-xs text-gray-600">Buổi học</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{enrollmentCount}</p>
            <p className="text-xs text-gray-600">Học viên</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {sessionCount > 0 ? Math.round(enrollmentCount / sessionCount) : 0}
            </p>
            <p className="text-xs text-gray-600">TB/Buổi</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={onClose}
        >
          Đóng
        </Button>
        <Button
          variant="secondary"
          className="flex-1 border-orange text-orange hover:bg-orange hover:text-white"
          onClick={onEdit}
        >
          Chỉnh sửa
        </Button>
        <Button
          variant="danger"
          className="flex-1"
          onClick={onDelete}
        >
          Xóa khóa học
        </Button>
      </div>
    </div>
  );
}

export default CourseViewModal;