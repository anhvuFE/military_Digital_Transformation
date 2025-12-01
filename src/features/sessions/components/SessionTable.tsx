import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";
import type { Session } from "@/types/session";
import type { Course } from "@/types/course";
import type { Unit } from "@/types/unit";
import { Clock, MapPin, User, Users, Calendar, CheckCircle2, AlertCircle, Edit2, FileText, Target, ChevronRight, Timer, Award } from "lucide-react";

interface Props {
  sessions: Session[];
  courses: Course[];
  units: Unit[];
  onEdit: (session: Session) => void;
  onResult: (session: Session) => void;
  enrollmentsBySession?: Record<string, number>;
}

function SessionTable({ sessions, courses, units, enrollmentsBySession = {}, onEdit, onResult }: Props) {
  if (!sessions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <AlertCircle className="mb-3 h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium">Không có buổi thỏa bộ lọc</p>
        <p className="text-sm text-gray-400">Thử điều chỉnh tiêu chí tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {sessions.map((session) => {
        const course = courses.find((c) => c.id === session.courseId);
        const unit = units.find((u) => u.id === session.unitId);
        const start = new Date(session.startTime);
        const end = new Date(session.endTime);
        const upcoming = start.getTime() > Date.now();
        const enrollmentCount = enrollmentsBySession[session.id] ?? 0;

        const isPast = end.getTime() < Date.now();
        const isOngoing = start.getTime() <= Date.now() && end.getTime() >= Date.now();

        return (
          <div
            key={session.id}
            className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all hover:border-forest/30 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-forest via-olive to-moss" />

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-forest transition-colors">
                    {session.title || course?.name || "Buổi huấn luyện"}
                  </h3>

                  {isOngoing && (
                    <span className="inline-flex items-center gap-1 animate-pulse rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                      Đang diễn ra
                    </span>
                  )}
                  {upcoming && !isOngoing && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                      <Timer className="h-3 w-3" />
                      Sắp diễn ra
                    </span>
                  )}
                  {isPast && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                      <CheckCircle2 className="h-3 w-3" />
                      Đã diễn ra
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 text-xs font-semibold text-forest">
                    <Target className="h-3 w-3" />
                    {unit?.name || "Đơn vị"}
                  </span>

                  {enrollmentCount > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      <Users className="h-3 w-3" />
                      {enrollmentCount} quân nhân
                    </span>
                  )}
                </div>

                {course?.name && (
                  <p className="mb-3 text-sm text-gray-600 font-medium">
                    Khóa học: {course.name}
                  </p>
                )}

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-lg bg-forest/10 p-2">
                      <Clock className="h-4 w-4 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Thời gian</p>
                      <p className="text-sm font-medium text-gray-800">
                        {start.toLocaleString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        đến {end.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="rounded-lg bg-orange/10 p-2">
                      <MapPin className="h-4 w-4 text-orange" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Địa điểm</p>
                      <p className="text-sm font-medium text-gray-800">{session.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Giảng viên</p>
                      <p className="text-sm font-medium text-gray-800">{session.instructor}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <button
                  onClick={() => onEdit(session)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-forest hover:bg-forest hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>SỬA</span>
                </button>
                <button
                  onClick={() => onResult(session)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-forest bg-forest px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-forest/90"
                >
                  <FileText className="h-4 w-4" />
                  <span>NHẬP KẾT QUẢ</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SessionTable;
