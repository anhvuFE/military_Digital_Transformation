import { useState } from "react";
import { ReportEntity } from "@/types/report-entity";
import Button from "@/components/common/Button";

interface Props {
  onSubmit: (data: Omit<ReportEntity, "id">) => void;
  onCancel: () => void;
}

function ReportFormModal({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "TRAINING" as ReportEntity["type"],
    period: {
      from: new Date().toISOString().split("T")[0],
      to: new Date().toISOString().split("T")[0]
    },
    unitName: "",
    createdBy: "",
    status: "DRAFT" as ReportEntity["status"],
    data: {
      totalSessions: 0,
      completionRate: 0,
      pendingSoldiers: 0,
      excellentCount: 0,
      passCount: 0,
      failCount: 0
    },
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tiêu đề báo cáo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
          placeholder="Ví dụ: Báo cáo huấn luyện Quý 2/2024"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Mô tả
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
          rows={3}
          placeholder="Mô tả chi tiết về báo cáo..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Loại báo cáo <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as ReportEntity["type"] })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          >
            <option value="TRAINING">Huấn luyện</option>
            <option value="PERFORMANCE">Hiệu suất</option>
            <option value="ATTENDANCE">Chuyên cần</option>
            <option value="EQUIPMENT">Trang thiết bị</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Trạng thái <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ReportEntity["status"] })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          >
            <option value="DRAFT">Bản nháp</option>
            <option value="SUBMITTED">Gửi duyệt</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Từ ngày <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.period.from}
            onChange={(e) => setFormData({
              ...formData,
              period: { ...formData.period, from: e.target.value }
            })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Đến ngày <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.period.to}
            onChange={(e) => setFormData({
              ...formData,
              period: { ...formData.period, to: e.target.value }
            })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Đơn vị
          </label>
          <input
            type="text"
            value={formData.unitName}
            onChange={(e) => setFormData({ ...formData, unitName: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Tên đơn vị (để trống nếu là toàn quân)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Người tạo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.createdBy}
            onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Họ và tên người tạo báo cáo"
            required
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Thống kê</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tổng buổi</label>
            <input
              type="number"
              value={formData.data.totalSessions}
              onChange={(e) => setFormData({
                ...formData,
                data: { ...formData.data, totalSessions: parseInt(e.target.value) || 0 }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Hoàn thành %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.data.completionRate}
              onChange={(e) => setFormData({
                ...formData,
                data: { ...formData.data, completionRate: parseInt(e.target.value) || 0 }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Chưa hoàn thành</label>
            <input
              type="number"
              value={formData.data.pendingSoldiers}
              onChange={(e) => setFormData({
                ...formData,
                data: { ...formData.data, pendingSoldiers: parseInt(e.target.value) || 0 }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Xuất sắc</label>
            <input
              type="number"
              value={formData.data.excellentCount}
              onChange={(e) => setFormData({
                ...formData,
                data: { ...formData.data, excellentCount: parseInt(e.target.value) || 0 }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Đạt</label>
            <input
              type="number"
              value={formData.data.passCount}
              onChange={(e) => setFormData({
                ...formData,
                data: { ...formData.data, passCount: parseInt(e.target.value) || 0 }
              })}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Chưa đạt</label>
            <input
              type="number"
              value={formData.data.failCount}
              onChange={(e) => setFormData({
                ...formData,
                data: { ...formData.data, failCount: parseInt(e.target.value) || 0 }
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
          placeholder="Ghi chú thêm về báo cáo..."
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
          Tạo báo cáo
        </Button>
      </div>
    </form>
  );
}

export default ReportFormModal;