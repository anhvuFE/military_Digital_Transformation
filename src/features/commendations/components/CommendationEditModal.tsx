import { useState } from "react";
import { Commendation } from "@/types/commendation";
import Button from "@/components/common/Button";

interface Props {
  commendation: Commendation;
  onSubmit: (data: Partial<Commendation>) => void;
  onCancel: () => void;
}

function CommendationEditModal({ commendation, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: commendation.title,
    description: commendation.description || "",
    type: commendation.type,
    level: commendation.level,
    date: commendation.date,
    recipientName: commendation.recipientName || "",
    unit: commendation.unit || "",
    criteria: commendation.criteria || "",
    approvedBy: commendation.approvedBy || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tiêu đề khen thưởng <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
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
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Loại khen thưởng <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Commendation["type"] })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          >
            <option value="MEDAL">Huy chương</option>
            <option value="CERTIFICATE">Chứng nhận</option>
            <option value="ACHIEVEMENT">Thành tích</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cấp độ <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value as Commendation["level"] })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          >
            <option value="INDIVIDUAL">Cá nhân</option>
            <option value="UNIT">Đơn vị</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ngày trao thưởng <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Người nhận
          </label>
          <input
            type="text"
            value={formData.recipientName}
            onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Tên người nhận..."
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
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Tên đơn vị..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Người phê duyệt
          </label>
          <input
            type="text"
            value={formData.approvedBy}
            onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
            placeholder="Tên người phê duyệt..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tiêu chí đạt được
        </label>
        <textarea
          value={formData.criteria}
          onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
          rows={2}
          placeholder="Nhập các tiêu chí đã đạt được..."
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
          Cập nhật
        </Button>
      </div>
    </form>
  );
}

export default CommendationEditModal;