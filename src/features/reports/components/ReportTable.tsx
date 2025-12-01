import type { ReportRow } from "@/types/report";
import { Building2, Calendar, TrendingUp, AlertTriangle, CheckCircle, XCircle, Award, Target, Users } from "lucide-react";

interface Props {
  rows: ReportRow[];
}

function ReportTable({ rows }: Props) {
  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return "from-green-500 to-emerald-500";
    if (rate >= 50) return "from-orange-500 to-amber-500";
    return "from-red-500 to-red-600";
  };

  const getCompletionBadge = (rate: number) => {
    if (rate >= 80) return { icon: CheckCircle, color: "bg-green-100 text-green-700", label: "Xuất sắc" };
    if (rate >= 50) return { icon: Target, color: "bg-orange-100 text-orange-700", label: "Đạt yêu cầu" };
    return { icon: XCircle, color: "bg-red-100 text-red-700", label: "Cần cải thiện" };
  };

  return (
    <div className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-forest to-olive">
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-sand">
                  <Building2 className="h-4 w-4" />
                  Đơn vị
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-sand">
                  <Calendar className="h-4 w-4" />
                  Số buổi
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-sand">
                  <TrendingUp className="h-4 w-4" />
                  % Hoàn thành
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-sand">
                  <Users className="h-4 w-4" />
                  Số quân nhân chưa đủ
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => {
              const badge = getCompletionBadge(row.completionRate);
              const BadgeIcon = badge.icon;

              return (
                <tr
                  key={row.unitId}
                  className="group transition-all hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-forest to-olive text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-forest transition-colors">
                          {row.unitName}
                        </p>
                        <p className="text-xs text-gray-500">ID: {row.unitId}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5">
                      <Calendar className="h-3.5 w-3.5 text-blue-700" />
                      <span className="text-sm font-bold text-blue-700">{row.totalSessions}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.color}`}>
                          <BadgeIcon className="h-3.5 w-3.5" />
                          {badge.label}
                        </span>
                      </div>
                      <div className="w-full max-w-[120px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-700">{row.completionRate}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${getCompletionColor(row.completionRate)} transition-all`}
                            style={{ width: `${row.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {row.pendingSoldiers > 0 ? (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-700" />
                        <span className="text-sm font-bold text-red-700">{row.pendingSoldiers}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-green-700" />
                        <span className="text-sm font-bold text-green-700">0</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <AlertTriangle className="mb-3 h-12 w-12 text-gray-300" />
          <p className="text-lg font-medium">Không có dữ liệu báo cáo</p>
          <p className="text-sm text-gray-400">Chọn khoảng thời gian khác để xem báo cáo</p>
        </div>
      )}
    </div>
  );
}

export default ReportTable;
