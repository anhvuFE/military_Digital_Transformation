import { useState } from "react";
import { UserManagement } from "@/types/user-management";
import Button from "@/components/common/Button";

interface Props {
  onSubmit: (data: Omit<UserManagement, "id">) => void;
  onCancel: () => void;
}

function UserFormModal({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    rank: "",
    serviceNumber: "",
    role: "SOLDIER" as UserManagement["role"],
    unitId: "",
    unitName: "",
    email: "",
    phone: "",
    joinDate: new Date().toISOString().split("T")[0],
    status: "ACTIVE" as UserManagement["status"],
    position: "",
    specialization: "",
    trainingRecords: {
      completedCourses: 0,
      excellentCount: 0,
      averageScore: 0
    },
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      lastActive: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Ví dụ: Nguyễn Văn A"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mã quân nhân <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.serviceNumber}
            onChange={(e) => setFormData({ ...formData, serviceNumber: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Ví dụ: SQ001234"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cấp bậc <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.rank}
            onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Ví dụ: Thượng úy"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Vai trò <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserManagement["role"] })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          >
            <option value="SOLDIER">Chiến sĩ</option>
            <option value="OFFICER">Sĩ quan</option>
            <option value="INSTRUCTOR">Giảng viên</option>
            <option value="ADMIN">Quản trị</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Đơn vị <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.unitName}
            onChange={(e) => {
              const unitName = e.target.value;
              const unitId = unitName === "Đại đội 1" ? "unit-1" :
                           unitName === "Đại đội 2" ? "unit-2" :
                           unitName === "Đại đội 3" ? "unit-3" : "";
              setFormData({ ...formData, unitName, unitId });
            }}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          >
            <option value="">Chọn đơn vị</option>
            <option value="Đại đội 1">Đại đội 1</option>
            <option value="Đại đội 2">Đại đội 2</option>
            <option value="Đại đội 3">Đại đội 3</option>
            <option value="Ban chỉ huy">Ban chỉ huy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Trạng thái <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as UserManagement["status"] })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          >
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="INACTIVE">Không hoạt động</option>
            <option value="ON_LEAVE">Nghỉ phép</option>
            <option value="TRANSFERRED">Đã chuyển đi</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="email@army.vn"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="0901234567"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chức vụ
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Ví dụ: Đại đội trưởng"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chuyên môn
          </label>
          <input
            type="text"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Ví dụ: Bộ binh, Thông tin, Y tế"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ngày nhập ngũ <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.joinDate}
          onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
          required
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Hồ sơ huấn luyện ban đầu</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Khóa đã học</label>
            <input
              type="number"
              min="0"
              value={formData.trainingRecords.completedCourses}
              onChange={(e) => setFormData({
                ...formData,
                trainingRecords: {
                  ...formData.trainingRecords,
                  completedCourses: parseInt(e.target.value) || 0
                }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Xuất sắc</label>
            <input
              type="number"
              min="0"
              value={formData.trainingRecords.excellentCount}
              onChange={(e) => setFormData({
                ...formData,
                trainingRecords: {
                  ...formData.trainingRecords,
                  excellentCount: parseInt(e.target.value) || 0
                }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Điểm TB</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.trainingRecords.averageScore}
              onChange={(e) => setFormData({
                ...formData,
                trainingRecords: {
                  ...formData.trainingRecords,
                  averageScore: parseInt(e.target.value) || 0
                }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ghi chú
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
          rows={2}
          placeholder="Ghi chú thêm về nhân sự..."
        />
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-forest hover:bg-forest/90"
        >
          Thêm nhân sự
        </Button>
      </div>
    </form>
  );
}

export default UserFormModal;