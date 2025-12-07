import { Commendation } from "@/types/commendation";
import Button from "@/components/common/Button";
import { Trophy, Medal, Star, User, Calendar, FileText, Award, Shield, Target, Users } from "lucide-react";

interface Props {
  commendation: Commendation;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
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

const levelConfig = {
  INDIVIDUAL: {
    label: "Cá nhân",
    icon: User,
    color: "text-green-600"
  },
  UNIT: {
    label: "Đơn vị",
    icon: Users,
    color: "text-blue-600"
  }
};

function CommendationViewModal({
  commendation,
  onEdit,
  onDelete,
  onClose
}: Props) {
  const typeInfo = typeConfig[commendation.type];
  const levelInfo = levelConfig[commendation.level];
  const TypeIcon = typeInfo.icon;
  const LevelIcon = levelInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl bg-gradient-to-br ${typeInfo.gradient} p-3 text-white shadow-lg`}>
            <TypeIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{commendation.title}</h3>
            <p className="text-sm text-gray-500 mt-1">ID: {commendation.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full ${typeInfo.bg} px-3 py-1 text-xs font-semibold ${typeInfo.color}`}>
            <TypeIcon className="h-3 w-3" />
            {typeInfo.label}
          </span>
        </div>
      </div>

      {/* Description */}
      {commendation.description && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{commendation.description}</p>
        </div>
      )}

      {/* Commendation Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <LevelIcon className={`h-5 w-5 ${levelInfo.color} mt-0.5`} />
            <div>
              <p className="text-sm font-semibold text-gray-700">Cấp độ</p>
              <p className="text-base font-medium text-gray-900">{levelInfo.label}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Ngày trao</p>
              <p className="text-base font-medium text-gray-900">
                {new Date(commendation.date).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Người nhận</p>
              <p className="text-base font-medium text-gray-900">
                {commendation.recipientName || "Chưa xác định"}
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
                {commendation.unit || "Toàn quân"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Criteria if any */}
      {commendation.criteria && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Tiêu chí đạt được</p>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                {commendation.criteria}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="rounded-lg bg-gradient-to-r from-forest/10 to-olive/10 p-4">
        <h4 className="text-sm font-semibold text-forest mb-3">Thông tin chi tiết</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <TypeIcon className="h-8 w-8 mx-auto mb-2 text-forest" />
            <p className="text-xs text-gray-600">{typeInfo.label}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {commendation.level === "INDIVIDUAL" ? "1" : "N"}
            </p>
            <p className="text-xs text-gray-600">Số lượng</p>
          </div>
          <div>
            <Trophy className="h-8 w-8 mx-auto mb-2 text-orange" />
            <p className="text-xs text-gray-600">Vinh danh</p>
          </div>
        </div>
      </div>

      {/* Approval Info */}
      {commendation.approvedBy && (
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <span className="text-sm font-medium text-gray-700">Phê duyệt bởi:</span>
          <span className="text-sm font-semibold text-green-700">{commendation.approvedBy}</span>
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
          Xóa khen thưởng
        </Button>
      </div>
    </div>
  );
}

export default CommendationViewModal;