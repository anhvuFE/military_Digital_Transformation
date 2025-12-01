import { FormEvent, useState } from "react";
import type { Course } from "@/types/course";
import Button from "@/components/common/Button";

interface Props {
  initial?: Course;
  onSubmit: (payload: Omit<Course, "id">) => void;
}

function CourseFormModal({ initial, onSubmit }: Props) {
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
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label>Tên khóa</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      </div>
      <div>
        <label>Mô tả</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div>
        <label>Loại</label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Course["type"] })}>
          <option value="FIRE">Bắn</option>
          <option value="PHYSICAL">Thể lực</option>
          <option value="THEORY">Lý thuyết</option>
        </select>
      </div>
      <div>
        <label>Bắt buộc</label>
        <select value={form.required ? "true" : "false"} onChange={(e) => setForm({ ...form, required: e.target.value === "true" })}>
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>
      </div>
      <Button type="submit">{initial ? "Cập nhật" : "Tạo mới"}</Button>
    </form>
  );
}

export default CourseFormModal;
