import { UserManagement } from "@/types/user-management";
import Button from "@/components/common/Button";
import { User, Shield, Calendar, Phone, Mail, Award, Target, Activity, Star, AlertCircle, CheckCircle, Clock, UserX } from "lucide-react";

interface Props {
  user: UserManagement;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const roleConfig = {
  SOLDIER: {
    label: "Chiến sĩ",
    color: "text-green-600",
    bg: "bg-green-100"
  },
  OFFICER: {
    label: "Sĩ quan",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  INSTRUCTOR: {
    label: "Giảng viên",
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
  ADMIN: {
    label: "Quản trị",
    color: "text-orange-600",
    bg: "bg-orange-100"
  }
};

const statusConfig = {
  ACTIVE: {
    label: "Đang hoạt động",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100"
  },
  INACTIVE: {
    label: "Không hoạt động",
    icon: UserX,
    color: "text-gray-600",
    bg: "bg-gray-100"
  },
  ON_LEAVE: {
    label: "Nghỉ phép",
    icon: Clock,
    color: "text-orange-600",
    bg: "bg-orange-100"
  },
  TRANSFERRED: {
    label: "Đã chuyển đi",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-100"
  }
};

function UserViewModal({
  user,
  onEdit,
  onDelete,
  onClose
}: Props) {
  const roleInfo = roleConfig[user.role];
  const statusInfo = statusConfig[user.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-gradient-to-br from-forest to-olive p-3 text-white shadow-lg">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.fullName}</h3>
            <p className="text-sm text-gray-500 mt-1">Mã quân nhân: {user.serviceNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full ${statusInfo.bg} px-3 py-1 text-xs font-semibold ${statusInfo.color}`}>
            <StatusIcon className="h-3 w-3" />
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-forest mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Cấp bậc</p>
              <p className="text-base font-medium text-gray-900">{user.rank}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Vai trò</p>
              <p className="text-base font-medium text-gray-900">
                <span className={`inline-flex items-center gap-1 rounded-full ${roleInfo.bg} px-2.5 py-0.5 text-xs font-semibold ${roleInfo.color}`}>
                  {roleInfo.label}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Đơn vị</p>
              <p className="text-base font-medium text-gray-900">
                {user.unitName || "Chưa phân công"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Ngày nhập ngũ</p>
              <p className="text-base font-medium text-gray-900">
                {new Date(user.joinDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      {(user.email || user.phone) && (
        <div className="grid grid-cols-2 gap-4">
          {user.email && (
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Email</p>
                  <p className="text-base font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {user.phone && (
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Điện thoại</p>
                  <p className="text-base font-medium text-gray-900">{user.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4">
        {user.position && (
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Chức vụ</p>
                <p className="text-base font-medium text-gray-900">{user.position}</p>
              </div>
            </div>
          </div>
        )}

        {user.specialization && (
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Chuyên môn</p>
                <p className="text-base font-medium text-gray-900">{user.specialization}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Training Records */}
      {user.trainingRecords && (
        <div className="rounded-lg bg-gradient-to-r from-forest/10 to-olive/10 p-4">
          <h4 className="text-sm font-semibold text-forest mb-3">Hồ sơ huấn luyện</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-forest">{user.trainingRecords.completedCourses}</p>
              <p className="text-xs text-gray-600">Khóa đã học</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{user.trainingRecords.excellentCount}</p>
              <p className="text-xs text-gray-600">Xuất sắc</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange">{user.trainingRecords.averageScore}%</p>
              <p className="text-xs text-gray-600">Điểm TB</p>
            </div>
          </div>
        </div>
      )}

      {/* Activity Info */}
      {user.lastActive && (
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Hoạt động gần nhất:</span>
          </div>
          <span className="text-sm font-semibold text-blue-700">
            {new Date(user.lastActive).toLocaleDateString("vi-VN")}
          </span>
        </div>
      )}

      {/* Notes */}
      {user.notes && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Ghi chú</p>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                {user.notes}
              </p>
            </div>
          </div>
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
          Xóa người dùng
        </Button>
      </div>
    </div>
  );
}

export default UserViewModal;