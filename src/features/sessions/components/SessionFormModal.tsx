import { FormEvent, useState } from "react";
import type { Session } from "@/types/session";
import type { Course } from "@/types/course";
import type { Unit } from "@/types/unit";
import Button from "@/components/common/Button";

interface Props {
  initial?: Session;
  courses: Course[];
  units: Unit[];
  onSubmit: (payload: Omit<Session, "id">) => void;
}

function SessionFormModal({ initial, courses, units, onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Session, "id">>({
    courseId: initial?.courseId ?? courses[0]?.id ?? "",
    unitId: initial?.unitId ?? units[0]?.id ?? "",
    startTime: initial?.startTime ?? "",
    endTime: initial?.endTime ?? "",
    location: initial?.location ?? "",
    instructor: initial?.instructor ?? "",
    title: initial?.title ?? "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label>Khóa huấn luyện</label>
        <select value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Đơn vị</label>
        <select value={form.unitId} onChange={(e) => setForm({ ...form, unitId: e.target.value })}>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tiêu đề buổi</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <label>Bắt đầu</label>
          <input
            type="datetime-local"
            value={form.startTime.slice(0, 16)}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
        </div>
        <div>
          <label>Kết thúc</label>
          <input
            type="datetime-local"
            value={form.endTime.slice(0, 16)}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label>Địa điểm</label>
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      </div>
      <div>
        <label>Giảng viên</label>
        <input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} />
      </div>
      <Button type="submit">{initial ? "Cập nhật" : "Tạo buổi"}</Button>
    </form>
  );
}

export default SessionFormModal;
