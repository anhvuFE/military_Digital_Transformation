import type { Course } from "@/types/course";
import { CheckCircle2, AlertTriangle, Target, Award } from "lucide-react";

interface Row {
  course: Course;
  required: boolean;
  requiredSessions: number;
  completedSessions: number;
  passed: boolean;
}

interface Props {
  rows: Row[];
}

function CourseSummaryTable({ rows }: Props) {
  if (!rows.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <AlertTriangle className="mb-3 h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium">Không có dữ liệu khóa học</p>
        <p className="text-sm text-gray-400">Chưa có khóa học nào được ghi nhận</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Khóa</th>
              <th>Yêu cầu</th>
              <th>Đã hoàn thành</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const status = row.completedSessions >= row.requiredSessions;
              return (
                <tr key={row.course.id}>
                  <td>
                    <strong>{row.course.name}</strong>
                    <p style={{ margin: 0, color: "var(--color-muted)" }}>{row.course.description}</p>
                  </td>
                  <td>{row.requiredSessions}</td>
                  <td>{row.completedSessions}</td>
                  <td>
                    <span className={`pill ${status ? "status-success" : "status-warning"}`}>
                      {status ? "Đạt" : "Chưa đạt"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {rows.map((row) => {
          const status = row.completedSessions >= row.requiredSessions;
          const progressPercentage = row.requiredSessions > 0 ? (row.completedSessions / row.requiredSessions) * 100 : 0;

          return (
            <div key={row.course.id} className="card p-4 shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                {/* Course Name and Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">
                      {row.course.name}
                    </h3>
                    {row.course.description && (
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {row.course.description}
                      </p>
                    )}
                  </div>
                  <span className={`pill ${status ? "status-success" : "status-warning"} text-xs`}>
                    {status ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Đạt
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Chưa đạt
                      </span>
                    )}
                  </span>
                </div>

                {/* Progress Information */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Tiến độ
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {row.completedSessions}/{row.requiredSessions} buổi
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        status ? 'bg-green-500' : 'bg-orange-400'
                      }`}
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    />
                  </div>

                  <div className="text-xs text-gray-500 text-right">
                    {progressPercentage.toFixed(0)}% hoàn thành
                  </div>
                </div>

                {/* Course Type Badge */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <div className="rounded-lg bg-forest/10 p-1.5">
                    <Target className="h-3 w-3 text-forest" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    Khóa {row.required ? 'bắt buộc' : 'tùy chọn'}
                  </span>
                  {row.required && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                      <Award className="h-3 w-3" />
                      Bắt buộc
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CourseSummaryTable;
