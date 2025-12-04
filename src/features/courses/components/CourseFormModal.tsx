import { FormEvent, useState } from "react";
import type { Course } from "@/types/course";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";

interface Props {
  initial?: Course;
  onSubmit: (payload: Omit<Course, "id">) => void;
  onCancel?: () => void;
}

function CourseFormModal({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Course, "id">>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    required: initial?.required ?? true,
    type: initial?.type ?? "THEORY",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4">
        <div>
          <label>Tên khóa</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <div>
          <label>Loại</label>
          <Select
            value={form.type}
            onChange={(value) => setForm({ ...form, type: value as Course["type"] ?? "THEORY" })}
            options={[
              { value: "FIRE", label: "Bắn" },
              { value: "PHYSICAL", label: "Thể lực" },
              { value: "THEORY", label: "Lý thuyết" },
            ]}
            placeholder="Chọn loại khóa"
          />
        </div>
        <div>
          <label>Bắt buộc</label>
          <Select
            value={form.required ? "true" : "false"}
            onChange={(value) => setForm({ ...form, required: value === "true" })}
            options={[
              { value: "true", label: "Có" },
              { value: "false", label: "Không" },
            ]}
            placeholder="Chọn yêu cầu"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-border">
        <Button
          type="button"
          variant="secondary"
          className="flex-1 text-center justify-center"
          onClick={onCancel}
        >
          Huỷ
        </Button>
        <Button
          type="submit"
          className="flex-1 text-center justify-center"
        >
          {initial ? "Cập nhật" : "Lưu"}
        </Button>
      </div>
    </form>
  );
}

export default CourseFormModal;
