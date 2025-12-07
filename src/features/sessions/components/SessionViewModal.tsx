import { Session } from "@/types/session";
import { Course } from "@/types/course";
import { Unit } from "@/types/unit";
import Button from "@/components/common/Button";
import { Calendar, Clock, MapPin, Shield, User, BookOpen, Users, Target, Award, AlertTriangle } from "lucide-react";

interface Props {
  session: Session;
  course?: Course;
  unit?: Unit;
  enrollmentCount?: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

function SessionViewModal({ session, course, unit, enrollmentCount = 0, onEdit, onDelete, onClose }: Props) {
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime);
  const isPast = endDate.getTime() < Date.now();
  const isOngoing = startDate.getTime() <= Date.now() && endDate.getTime() >= Date.now();

  return (
    <div className="space-y-6">
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          {session.title || course?.name || "Buổi huấn luyện"}
        </h3>
        <div className="flex gap-2">
          {isOngoing && (
            <span className="inline-flex items-center gap-1 animate-pulse rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
              Đang diễn ra
            </span>
          )}
          {!isOngoing && !isPast && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Clock className="h-3 w-3" />
              Sắp tới
            </span>
          )}
          {isPast && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              <Award className="h-3 w-3" />
              Đã hoàn thành
            </span>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4">
        {/* Course Info */}
        {course && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-forest mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Khóa huấn luyện</p>
                <p className="text-base font-medium text-gray-900">{course.name}</p>
                {course.description && (
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Time & Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-forest mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Ngày</p>
                <p className="text-base font-medium text-gray-900">
                  {startDate.toLocaleDateString("vi-VN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-forest mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Thời gian</p>
                <p className="text-base font-medium text-gray-900">
                  {startDate.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                  {" - "}
                  {endDate.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Instructor */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-orange mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Địa điểm</p>
                <p className="text-base font-medium text-gray-900">{session.location}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Giảng viên</p>
                <p className="text-base font-medium text-gray-900">{session.instructor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Unit & Enrollment */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-forest mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Đơn vị</p>
                <p className="text-base font-medium text-gray-900">
                  {unit?.name || session.unitId}
                </p>
              </div>
            </div>
          </div>

          {enrollmentCount > 0 && (
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Tham gia</p>
                  <p className="text-base font-medium text-gray-900">
                    {enrollmentCount} quân nhân
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Requirements if exists */}
        {session.requirements && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Yêu cầu</p>
                <p className="text-base text-gray-900 whitespace-pre-line">
                  {session.requirements}
                </p>
              </div>
            </div>
          </div>
        )}
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
          Xóa
        </Button>
      </div>
    </div>
  );
}

export default SessionViewModal;