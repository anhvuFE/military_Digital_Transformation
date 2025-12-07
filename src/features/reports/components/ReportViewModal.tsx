import { ReportEntity } from "@/types/report-entity";
import Button from "@/components/common/Button";
import { FileText, Calendar, User, Shield, TrendingUp, CheckCircle, Clock, XCircle, BarChart3, Users, Target, Award } from "lucide-react";

interface Props {
  report: ReportEntity;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const typeConfig = {
  TRAINING: {
    label: "Huấn luyện",
    icon: Target,
    color: "text-green-600",
    bg: "bg-green-100",
    gradient: "from-green-500 to-emerald-500"
  },
  PERFORMANCE: {
    label: "Hiệu suất",
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-100",
    gradient: "from-blue-500 to-indigo-500"
  },
  ATTENDANCE: {
    label: "Chuyên cần",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-100",
    gradient: "from-purple-500 to-pink-500"
  },
  EQUIPMENT: {
    label: "Trang thiết bị",
    icon: Shield,
    color: "text-orange-600",
    bg: "bg-orange-100",
    gradient: "from-orange-500 to-red-500"
  }
};

const statusConfig = {
  DRAFT: {
    label: "Bản nháp",
    icon: Clock,
    color: "text-gray-600",
    bg: "bg-gray-100"
  },
  SUBMITTED: {
    label: "Đã gửi",
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
  PUBLISHED: {
    label: "Đã công bố",
    icon: Award,
    color: "text-blue-600",
    bg: "bg-blue-100"
  }
};

function ReportViewModal({
  report,
  onEdit,
  onDelete,
  onClose
}: Props) {
  const typeInfo = typeConfig[report.type];
  const statusInfo = statusConfig[report.status];
  const TypeIcon = typeInfo.icon;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl bg-gradient-to-br ${typeInfo.gradient} p-3 text-white shadow-lg`}>
            <TypeIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{report.title}</h3>
            <p className="text-sm text-gray-500 mt-1">ID: {report.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full ${statusInfo.bg} px-3 py-1 text-xs font-semibold ${statusInfo.color}`}>
            <StatusIcon className="h-3 w-3" />
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Description */}
      {report.description && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{report.description}</p>
        </div>
      )}

      {/* Report Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <TypeIcon className={`h-5 w-5 ${typeInfo.color} mt-0.5`} />
            <div>
              <p className="text-sm font-semibold text-gray-700">Loại báo cáo</p>
              <p className="text-base font-medium text-gray-900">{typeInfo.label}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Kỳ báo cáo</p>
              <p className="text-base font-medium text-gray-900">
                {new Date(report.period.from).toLocaleDateString("vi-VN")} - {new Date(report.period.to).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-forest mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Đơn vị</p>
              <p className="text-base font-medium text-gray-900">
                {report.unitName || "Toàn quân"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Người tạo</p>
              <p className="text-base font-medium text-gray-900">{report.createdBy}</p>
              <p className="text-xs text-gray-500">
                {new Date(report.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {report.data && (
        <div className="rounded-lg bg-gradient-to-r from-forest/10 to-olive/10 p-4">
          <h4 className="text-sm font-semibold text-forest mb-3">Thống kê chi tiết</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            {report.data.totalSessions !== undefined && (
              <div>
                <p className="text-2xl font-bold text-forest">{report.data.totalSessions}</p>
                <p className="text-xs text-gray-600">Buổi huấn luyện</p>
              </div>
            )}
            {report.data.completionRate !== undefined && (
              <div>
                <p className="text-2xl font-bold text-blue-600">{report.data.completionRate}%</p>
                <p className="text-xs text-gray-600">Tỷ lệ hoàn thành</p>
              </div>
            )}
            {report.data.pendingSoldiers !== undefined && (
              <div>
                <p className="text-2xl font-bold text-orange">{report.data.pendingSoldiers}</p>
                <p className="text-xs text-gray-600">Chưa hoàn thành</p>
              </div>
            )}
          </div>

          {(report.data.excellentCount !== undefined ||
            report.data.passCount !== undefined ||
            report.data.failCount !== undefined) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                {report.data.excellentCount !== undefined && (
                  <div>
                    <p className="text-xl font-bold text-green-600">{report.data.excellentCount}</p>
                    <p className="text-xs text-gray-600">Xuất sắc</p>
                  </div>
                )}
                {report.data.passCount !== undefined && (
                  <div>
                    <p className="text-xl font-bold text-blue-600">{report.data.passCount}</p>
                    <p className="text-xs text-gray-600">Đạt</p>
                  </div>
                )}
                {report.data.failCount !== undefined && (
                  <div>
                    <p className="text-xl font-bold text-red-600">{report.data.failCount}</p>
                    <p className="text-xs text-gray-600">Chưa đạt</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {report.notes && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Ghi chú</p>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                {report.notes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Approval Info */}
      {report.approvedBy && (
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div>
            <span className="text-sm font-medium text-gray-700">Phê duyệt bởi: </span>
            <span className="text-sm font-semibold text-green-700">{report.approvedBy}</span>
          </div>
          {report.approvedAt && (
            <span className="text-xs text-gray-500">
              {new Date(report.approvedAt).toLocaleDateString("vi-VN")}
            </span>
          )}
        </div>
      )}

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
          Xóa báo cáo
        </Button>
      </div>
    </div>
  );
}

export default ReportViewModal;