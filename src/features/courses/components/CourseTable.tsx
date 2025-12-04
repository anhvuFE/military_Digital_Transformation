import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";
import type { Course } from "@/types/course";
import { Target, Heart, Brain, Calendar, Shield, Edit2, Trash2, ChevronRight, Award, AlertTriangle } from "lucide-react";

interface Props {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  sessionCountByCourse?: Record<string, number>;
}

const typeLabel: Record<Course["type"], string> = {
  FIRE: "Hỏa lực",
  PHYSICAL: "Thể lực",
  THEORY: "Lý thuyết",
};

const typeIcon: Record<Course["type"], any> = {
  FIRE: Target,
  PHYSICAL: Heart,
  THEORY: Brain,
};

const typeColor: Record<Course["type"], string> = {
  FIRE: "from-red-500 to-orange-500",
  PHYSICAL: "from-green-500 to-emerald-500",
  THEORY: "from-blue-500 to-indigo-500",
};

function CourseTable({ courses, onEdit, onDelete, sessionCountByCourse = {} }: Props) {
  if (!courses.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <AlertTriangle className="mb-3 h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium">Không có khóa phù hợp bộ lọc</p>
        <p className="text-sm text-gray-400">Thử điều chỉnh tiêu chí tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {courses.map((course) => {
        const Icon = typeIcon[course.type];
        const gradientColor = typeColor[course.type];
        const sessionCount = sessionCountByCourse[course.id] ?? 0;

        return (
          <div
            key={course.id}
            className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all hover:border-forest/30 hover:shadow-xl hover:-translate-y-1"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradientColor}`} />

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-5">
              <div className="flex items-start gap-4 flex-1">
                <div className={`rounded-xl bg-gradient-to-br ${gradientColor} p-3 text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-forest transition-colors">
                      {course.name}
                    </h3>

                    {course.required ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                        <Shield className="h-3 w-3" />
                        Bắt buộc
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        <Award className="h-3 w-3" />
                        Tùy chọn
                      </span>
                    )}

                    {sessionCount > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        <Calendar className="h-3 w-3" />
                        {sessionCount} buổi
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 font-medium text-gray-700">
                      <Icon className="h-3.5 w-3.5" />
                      {typeLabel[course.type]}
                    </span>
                    <span className="text-gray-500 font-mono">
                      #{course.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:gap-3">
                <button
                  onClick={() => onEdit(course)}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-forest/20 bg-white px-4 py-2 text-sm font-semibold text-forest transition-all hover:border-forest hover:bg-forest hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>SỬA</span>
                </button>
                <button
                  onClick={() => onDelete(course.id)}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>XÓA</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CourseTable;
