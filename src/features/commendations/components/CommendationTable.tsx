import { Commendation } from "@/types/commendation";
import { Trophy, Medal, Star, User, Users, Calendar, Shield, Eye, Edit2, Trash2, Award, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Props {
  commendations: Commendation[];
  onView?: (commendation: Commendation) => void;
  onEdit: (commendation: Commendation) => void;
  onDelete: (commendation: Commendation) => void;
}

const typeConfig = {
  MEDAL: {
    label: "Huy chương",
    icon: Medal,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    gradient: "from-yellow-500 to-amber-500"
  },
  CERTIFICATE: {
    label: "Chứng nhận",
    icon: Award,
    color: "text-blue-600",
    bg: "bg-blue-100",
    gradient: "from-blue-500 to-indigo-500"
  },
  ACHIEVEMENT: {
    label: "Thành tích",
    icon: Star,
    color: "text-purple-600",
    bg: "bg-purple-100",
    gradient: "from-purple-500 to-pink-500"
  }
};

const statusConfig = {
  PENDING: {
    label: "Chờ duyệt",
    icon: Clock,
    color: "text-orange-600",
    bg: "bg-orange-100"
  },
  APPROVED: {
    label: "Đã duyệt",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100"
  },
  AWARDED: {
    label: "Đã trao",
    icon: Trophy,
    color: "text-blue-600",
    bg: "bg-blue-100"
  }
};

function CommendationTable({ commendations, onView, onEdit, onDelete }: Props) {
  if (!commendations.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <AlertCircle className="mb-3 h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium">Chưa có khen thưởng nào</p>
        <p className="text-sm text-gray-400">Hãy tạo đề xuất khen thưởng mới</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:grid gap-4">
        {commendations.map((commendation) => {
          const typeInfo = typeConfig[commendation.type];
          const TypeIcon = typeInfo.icon;
          const statusInfo = commendation.status ? statusConfig[commendation.status] : null;
          const StatusIcon = statusInfo?.icon;

          return (
            <div
              key={commendation.id}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all hover:border-forest/30 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-5">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`rounded-xl bg-gradient-to-br ${typeInfo.gradient} p-3 text-white shadow-lg`}>
                    <TypeIcon className="h-6 w-6" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-forest transition-colors">
                        {commendation.title}
                      </h3>

                      <span className={`inline-flex items-center gap-1 rounded-full ${typeInfo.bg} px-2.5 py-1 text-xs font-semibold ${typeInfo.color}`}>
                        <TypeIcon className="h-3 w-3" />
                        {typeInfo.label}
                      </span>

                      {commendation.level === "INDIVIDUAL" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                          <User className="h-3 w-3" />
                          Cá nhân
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          <Users className="h-3 w-3" />
                          Đơn vị
                        </span>
                      )}

                      {statusInfo && (
                        <span className={`inline-flex items-center gap-1 rounded-full ${statusInfo.bg} px-2.5 py-1 text-xs font-semibold ${statusInfo.color}`}>
                          {StatusIcon && <StatusIcon className="h-3 w-3" />}
                          {statusInfo.label}
                        </span>
                      )}
                    </div>

                    {commendation.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {commendation.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      {commendation.recipientName && (
                        <span className="inline-flex items-center gap-1.5 text-gray-600">
                          <User className="h-3.5 w-3.5" />
                          {commendation.recipientName}
                        </span>
                      )}
                      {commendation.unit && (
                        <span className="inline-flex items-center gap-1.5 text-gray-600">
                          <Shield className="h-3.5 w-3.5" />
                          {commendation.unit}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-gray-600">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(commendation.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:gap-3">
                  {onView && (
                    <button
                      onClick={() => onView(commendation)}
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                      <span>XEM</span>
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(commendation)}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-forest/20 bg-white px-4 py-2 text-sm font-semibold text-forest transition-all hover:border-forest hover:bg-forest hover:text-white"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>SỬA</span>
                  </button>
                  <button
                    onClick={() => onDelete(commendation)}
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

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {commendations.map((commendation) => {
          const typeInfo = typeConfig[commendation.type];
          const TypeIcon = typeInfo.icon;
          const statusInfo = commendation.status ? statusConfig[commendation.status] : null;

          return (
            <div key={commendation.id} className="card p-4 shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg bg-gradient-to-br ${typeInfo.gradient} p-2.5 text-white shadow-sm flex-shrink-0`}>
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">
                      {commendation.title}
                    </h3>
                    {commendation.description && (
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {commendation.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Loại
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full ${typeInfo.bg} px-2 py-1 text-xs font-semibold ${typeInfo.color}`}>
                      <TypeIcon className="h-3 w-3" />
                      {typeInfo.label}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Cấp độ
                    </span>
                    {commendation.level === "INDIVIDUAL" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        <User className="h-3 w-3" />
                        Cá nhân
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                        <Users className="h-3 w-3" />
                        Đơn vị
                      </span>
                    )}
                  </div>

                  {statusInfo && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full ${statusInfo.bg} px-2 py-1 text-xs font-semibold ${statusInfo.color}`}>
                        {statusInfo.icon && <statusInfo.icon className="h-3 w-3" />}
                        {statusInfo.label}
                      </span>
                    </div>
                  )}

                  {(commendation.recipientName || commendation.unit) && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Người nhận
                      </span>
                      <span className="text-xs text-gray-700 font-medium">
                        {commendation.recipientName || commendation.unit}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Ngày
                    </span>
                    <span className="text-xs text-gray-700 font-medium">
                      {new Date(commendation.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  {onView && (
                    <button
                      onClick={() => onView(commendation)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-blue-200 bg-white px-2 py-2 text-xs font-semibold text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>XEM</span>
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(commendation)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-forest/20 bg-white px-2 py-2 text-xs font-semibold text-forest transition-all hover:border-forest hover:bg-forest hover:text-white"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>SỬA</span>
                  </button>
                  <button
                    onClick={() => onDelete(commendation)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-red-200 bg-white px-2 py-2 text-xs font-semibold text-red-600 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>XÓA</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CommendationTable;