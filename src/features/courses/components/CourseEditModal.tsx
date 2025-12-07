import { useState } from "react";
import { Course } from "@/types/course";
import Button from "@/components/common/Button";

interface Props {
  course: Course;
  onSubmit: (data: Partial<Course>) => void;
  onCancel: () => void;
}

function CourseEditModal({ course, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: course.name,
    description: course.description || "",
    type: course.type,
    required: course.required,
    requirements: course.requirements || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tên khóa học <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Loại khóa học <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as Course["type"] })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
          required
        >
          <option value="FIRE">Hỏa lực</option>
          <option value="PHYSICAL">Thể lực</option>
          <option value="THEORY">Lý thuyết</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Yêu cầu khóa học
        </label>
        <textarea
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-forest focus:outline-none"
          rows={2}
          placeholder="Nhập các yêu cầu cần thiết..."
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="required"
          checked={formData.required}
          onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-forest focus:ring-forest"
        />
        <label htmlFor="required" className="text-sm font-medium text-gray-700">
          Khóa học bắt buộc
        </label>
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

export default CourseEditModal;